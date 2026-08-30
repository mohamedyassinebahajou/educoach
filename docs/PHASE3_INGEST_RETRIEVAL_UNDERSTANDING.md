# Understand Ingest + Retrieval — Theory Mapped to Your Code

**Audience:** You already built `ingest.py`, `retrieval.py`, and tested RAG.  
**Goal:** Be able to explain every major block out loud (soutenance-ready).  
**Your files:**
- `src/rag/ingest.py`
- `src/rag/retrieval.py`

---

## How to study this document

For each section:
1. Read the **theory**
2. Open the matching function in your code
3. Answer the **self-check** without looking
4. Only then move on

Suggested pace: **2 evenings**
- Evening A: theory + ingest
- Evening B: retrieval + end-to-end mental walkthrough

---

## Part 0 — The big picture (theory)

### What problem RAG solves

An LLM alone answers from training memory.  
That can be:
- generic;
- outdated;
- invented (hallucination);
- not aligned with *your* SAS lessons.

RAG forces the model (later, in Phase 4) to answer from **retrieved course text**.

### Two timescales

| Phase | When | Your file | Question it answers |
|-------|------|-----------|---------------------|
| **Indexing / Ingest** | Offline, rarely | `ingest.py` | “How do we prepare searchable lesson knowledge?” |
| **Retrieval** | Online, every question | `retrieval.py` | “Which lesson pieces are relevant to this question?” |

```text
INGEST (once)
lessons → Documents → chunks → vectors → Chroma disk

RETRIEVE (many times)
question → vector → nearest chunks → context string
                 │
                 └── later Phase 4: LLM answers using that context
```

Important: **your current Phase 3 stops before generation**.  
You retrieve context; you do not yet call Ollama.

### Watch (refresh)
- [What is RAG?](https://www.youtube.com/watch?v=KNvkUH50xXM)
- [Is RAG still needed? (IBM)](https://www.youtube.com/watch?v=UabBYexBD4k)

---

## Part 1 — Shared foundations used by both files

### 1.1 `Document` (LangChain)

A `Document` is just:

```text
page_content : str      # the text
metadata     : dict     # day, topic, source, ...
```

Why not a plain string?
Because later you need citations (“Day 3 — loops”) and debugging.

### 1.2 Embeddings (theory)

An embedding model maps text → a list of floats (a vector).

Similar meaning → vectors close together.

Example intuition:

```text
"for loop"     ≈  "iterate with for"
"for loop"     ≠  "open a file"
```

Your model: `sentence-transformers/all-MiniLM-L6-v2`  
Typical output size: **384 numbers** per text.

In both files you have:

```python
HuggingFaceEmbeddings(
    model_name=model_name,
    model_kwargs={"device": "cpu"},
    encode_kwargs={"normalize_embeddings": True},
)
```

| Setting | Meaning |
|---------|---------|
| `device="cpu"` | No GPU (project constraint) |
| `normalize_embeddings=True` | Vectors length ≈ 1; cosine similarity behaves cleanly |

**Hard rule:** ingest and retrieval must use the **same** embedding model.  
Different models = different vector spaces = broken search.

### 1.3 Chroma (vector database)

Chroma stores for each chunk:
- embedding vector;
- original text;
- metadata;
- an id.

At query time it finds nearest neighbors (approx. nearest neighbor search).  
You chose cosine space:

```python
collection_metadata={"hnsw:space": "cosine"}
```

### 1.4 Collection name

Both files use:

```python
COLLECTION_NAME = "educoach_lessons"
```

If names differ, retrieval opens an empty/wrong shelf.

### 1.5 Project paths

```python
PROJECT_ROOT = Path(__file__).resolve().parents[2]
```

For `src/rag/*.py`:
- `parents[0]` = `src/rag`
- `parents[1]` = `src`
- `parents[2]` = project root

`resolve_project_path("data/raw")` → absolute path under the project, independent of shell cwd.

### Watch
- Embeddings intuition is covered inside Krish Naik RAG course:  
  [Complete RAG Crash Course](https://www.youtube.com/watch?v=o126p1QN_RI)

---

## Part 2 — `ingest.py` section by section

Open `src/rag/ingest.py` while reading.

### 2.1 Why ingest exists

Ingest is a **batch builder**.  
You run it when:
- first creating the DB;
- lessons change;
- chunk size / embedding model changes.

You do **not** run it for every student question.

---

### 2.2 Regex metadata — `parse_lesson_metadata`

```python
LESSON_FILENAME_PATTERN = re.compile(
    r"^day(?P<day>\d{2})_(?P<topic>[a-z0-9_]+)\.md$"
)
```

Theory: filenames carry structure.

`day03_loops.md` →

```python
{"day": 3, "topic": "loops", "source": "data/raw/day03_loops.md", "filename": "..."}
```

Why metadata at ingest time?
- inherited by every chunk after splitting;
- enables citations and filtering later;
- makes debugging retrieval easier.

Self-check:
1. What happens if a file is named `loops_day3.md`?
2. Why convert day with `int(...)`?

---

### 2.3 Load lessons — `load_lesson_documents`

Flow:

```text
glob("day*.md") → read each file → Document(text, metadata)
```

Key details in your code:
- `sorted(...)` → stable order day01…day11
- skips `README.md` (because pattern is `day*.md`)
- rejects empty files

Theory: this is the **corpus**. RAG quality starts here. Bad/empty lessons ⇒ bad answers later.

Self-check:
1. Why not ingest `README.md`?
2. What is `page_content` vs `metadata`?

---

### 2.4 Chunking — `split_documents`

Theory problem: whole lesson files are often too large / mixed for precise search.

Solution: split into overlapping pieces.

Your settings:
- `chunk_size=500` (characters, approx.)
- `chunk_overlap=50`

```python
RecursiveCharacterTextSplitter(
    chunk_size=chunk_size,
    chunk_overlap=chunk_overlap,
    separators=["\n##", "\n###", "\n\n", " ", ""],
)
```

#### What “recursive” means
Try separators from large structure → smaller:
1. Markdown `##` sections
2. `###` subsections
3. paragraphs
4. spaces
5. characters last

#### Why overlap?
Protects meaning cut at boundaries.

Example:

```text
Chunk A: .... end of sentence about range(
Chunk B: range) continues ....
```

Without overlap, a query about `range` might miss half the idea.

#### Metadata inheritance
`split_documents()` copies parent metadata into each chunk.  
Then you add:

```python
chunk.metadata["chunk_id"] = index
```

Your result: **11 docs → 68 chunks**.

Self-check:
1. What goes wrong if chunk_size is tiny (e.g. 20)?
2. What goes wrong if chunk_size is huge (e.g. whole file)?
3. Why must overlap be `< chunk_size`?

---

### 2.5 Persist directory safety — `prepare_persist_directory`

Theory: re-running ingest into the same collection can **duplicate** vectors.

Your safeguard:
- if DB exists and no `--rebuild` → error
- if `--rebuild` → delete and recreate

This is intentional data safety, not bureaucracy.

Self-check:
1. When should you use `--rebuild`?
2. Why ignore `.gitkeep` when checking “existing entries”?

---

### 2.6 Embed + store — `build_vector_store`

```python
Chroma.from_documents(
    documents=chunks,
    embedding=embeddings,
    persist_directory=str(persist_dir),
    collection_name=COLLECTION_NAME,
    collection_metadata={"hnsw:space": "cosine"},
)
```

Theory of what happens inside:
1. for each chunk text → embedding vector
2. store vector + text + metadata
3. build ANN index (HNSW)
4. write files under `vector_db/` (`chroma.sqlite3`, collection folder)

This is the expensive step (CPU + first model download).

Self-check:
1. Difference between `from_documents` and later `Chroma(...)` constructor?
2. What is stored besides the vector?

---

### 2.7 `main()` orchestration

Your `main()` order is the correct mental model:

```text
resolve config
→ load documents
→ split chunks
→ prepare folder
→ build vector store
→ print counts
```

Prints are for observability: if loaded=11 and stored=68, pipeline is coherent.

Self-check:
Walk through what runs when you execute:

```bash
python -m src.rag.ingest --rebuild
```

---

## Part 3 — `retrieval.py` section by section

Open `src/rag/retrieval.py` while reading.

### 3.1 Why retrieval is separate

Retrieval is the **online path**:
- must be fast enough for chat;
- must not rebuild the DB;
- must be callable by agents later (`retrieve_context`, `format_context`).

---

### 3.2 Load existing DB — `load_vector_store`

```python
return Chroma(
    persist_directory=str(persist_directory),
    embedding_function=embeddings,
    collection_name=COLLECTION_NAME,
)
```

Theory difference:

| Call | Role |
|------|------|
| `Chroma.from_documents(...)` in ingest | **Create/write** index |
| `Chroma(...)` in retrieval | **Open/read** index |

You still pass `embedding_function` because the **question** must be embedded at query time.

Self-check:
1. Why does retrieval need embeddings if vectors are already stored?
2. What error should you get if `vector_db/` is missing?

---

### 3.3 Search — `retrieve_context`

```python
return vector_store.similarity_search(cleared, k=top_k)
```

Theory steps inside similarity search:
1. embed question → query vector
2. compare to stored chunk vectors (cosine)
3. return Top-K nearest `Document`s

`top_k=3` means “give me the 3 closest lesson pieces.”

#### Why not keyword search only?
Semantic search finds meaning, not only exact words.  
“iterate over a list” can still find `for` loop content.

#### Why Top-K can include noise
Nearest ≠ perfect.  
Example from your tests: “What is a variable?” sometimes also retrieved an `oop_classes` chunk (because “class variables” text overlaps).

Self-check:
1. What does `k=1` optimize for? What does it risk?
2. What does `k=5` optimize for? What does it risk?
3. Why is k=3 a compromise?

---

### 3.4 Format for the future LLM — `format_context`

Retrieval returns objects.  
The tutor needs one prompt string.

Your formatter builds:

```text
[Chunk 1] day 3 - loops (source: ...)
<text>

[Chunk 2] ...
```

Theory: this is the **augmentation** part of RAG (the “A” before Generation).  
Phase 4 will do:

```text
System: answer ONLY using this context. Cite day/topic.
Context:
{format_context(docs)}
Question: ...
```

Self-check:
1. Why include day/topic/source in the formatted block?
2. What should happen if `docs` is empty?

---

### 3.5 CLI — `main()` / `print_results`

These are developer tools, not production API.

They help you validate quality quickly:

```bash
python -m src.rag.retrieval -q "What is a for loop?"
python -m src.rag.retrieval -q "What is a for loop?" --show-formatted
```

Agents will call functions directly, not parse CLI output.

---

## Part 4 — End-to-end walkthrough (memorize this)

### Scenario: student asks “What is a for loop?”

#### Already done offline (`ingest.py`)
1. Loaded `day03_loops.md` (and other days)
2. Split into chunks (~6 chunks from that lesson among 68 total)
3. Embedded each chunk
4. Stored in `educoach_lessons`

#### Online now (`retrieval.py`)
1. Embed question “What is a for loop?”
2. Find 3 nearest chunks
3. Those chunks are from day=3 topic=loops (your notebook proved this)
4. `format_context` builds tutor-ready text
5. (Phase 4) Ollama answers using only that text + citation rules

If the student asks “Who won the World Cup?”:
- retrieval still returns *something* (nearest neighbors always exist)
- but content is irrelevant
- tutor must refuse / say not in materials (guardrail + prompt)

That is a key RAG limitation: **retrieval always returns neighbors; relevance is not guaranteed.**

---

## Part 5 — Concept ↔ code cheat sheet

| Concept | Where in your code |
|---------|--------------------|
| Corpus loading | `load_lesson_documents` |
| Metadata | `parse_lesson_metadata` |
| Chunking | `split_documents` + `RecursiveCharacterTextSplitter` |
| Embedding model | `create_embeddings` |
| Index write | `build_vector_store` / `Chroma.from_documents` |
| Index read | `load_vector_store` / `Chroma(...)` |
| Similarity search | `retrieve_context` / `similarity_search` |
| Top-K | `RAG_TOP_K` / `--top-k` |
| Prompt context packing | `format_context` |
| Rebuild safety | `prepare_persist_directory` + `--rebuild` |

---

## Part 6 — Oral exam questions (practice)

Answer out loud:

1. What is RAG in one sentence?
2. Why split documents before embedding?
3. Why overlap chunks?
4. What is an embedding?
5. Why must ingest and retrieval share the same embedding model?
6. What does Chroma store for each chunk?
7. Difference between `from_documents` and opening Chroma for query?
8. What is Top-K?
9. Why can retrieval return off-topic chunks?
10. What will Phase 4 add that Phase 3 does not do yet?

If you can answer all 10 cleanly, you understand this block.

---

## Part 7 — Optional videos (targeted)

| Topic | Video |
|-------|-------|
| RAG overview | https://www.youtube.com/watch?v=KNvkUH50xXM |
| Full practical RAG | https://www.youtube.com/watch?v=o126p1QN_RI |
| Deeper LangChain RAG | https://www.youtube.com/watch?v=sVcwVQRHIc8 |
| Build intuition end-to-end | https://www.youtube.com/watch?v=BrsocJb-fAo |

Don’t binge all. Use them when a concept feels fuzzy.

---

## Part 8 — Mini exercises (no coding required)

1. Draw the ingest pipeline from memory.
2. Draw the retrieval pipeline from memory.
3. Explain why your notebook’s “variable” query retrieved one `oop_classes` chunk.
4. Explain why Kubernetes query still returned chunks.
5. Point to the exact function that Phase 4 Concept Tutor should call first.

---

## Related docs

- Theory intro: [`RAG_CRASH_COURSE.md`](RAG_CRASH_COURSE.md)
- Ingest how-to: [`PHASE3_INGEST_IMPLEMENTATION.md`](PHASE3_INGEST_IMPLEMENTATION.md)
- Retrieval how-to: [`PHASE3_RETRIEVAL_IMPLEMENTATION.md`](PHASE3_RETRIEVAL_IMPLEMENTATION.md)
- Notebook tests: [`PHASE3_RAG_TEST_NOTEBOOK.md`](PHASE3_RAG_TEST_NOTEBOOK.md)

---

## When you’re ready

Send answers to the **10 oral exam questions** (short bullets are fine).  
I’ll correct misunderstandings, then we move to Phase 4 with a clearer mental model of what the Concept Tutor will wrap around `retrieve_context` + `format_context`.
