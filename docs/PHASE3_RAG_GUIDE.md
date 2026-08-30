# Phase 3 — RAG Pipeline Guide (EduCoach AI)

**Project:** EduCoach AI  
**Goal:** Build the knowledge base so the future Concept Tutor can answer from **your** lesson docs (not LLM memory alone).  
**You write the code.** This guide tells you *what*, *why*, and *how to verify*.

---

## Table of contents

1. [What Phase 3 delivers](#1-what-phase-3-delivers)
2. [Prerequisites](#2-prerequisites)
3. [Files you will create](#3-files-you-will-create)
4. [Step-by-step implementation](#4-step-by-step-implementation)
5. [Method reference](#5-method-reference)
6. [Definition of Done](#6-definition-of-done)
7. [Common mistakes](#7-common-mistakes)
8. [What comes next](#8-what-comes-next)

---

## 1. What Phase 3 delivers

By the end you will have:

```text
data/raw/
  day01_variables.md
  day02_conditions.md
  ...
  day11_final_project.md

src/rag/
  ingest.py      # load → chunk → embed → save Chroma
  retrieval.py   # question → Top-K chunks

vector_db/       # persisted Chroma index
```

And you can run a test query like:

> “What is a for loop?”

…and get back chunks that clearly talk about **loops**.

### In / Out of scope

| In Phase 3 | Later (Phase 4+) |
|------------|------------------|
| Lesson documents | LangGraph agents |
| Ingestion script | Ollama full tutor answers |
| Retrieval function | FastAPI `/chat` |
| Manual retrieval test | Streamlit UI |

---

## 2. Prerequisites

### Knowledge
You should already understand (from `docs/RAG_CRASH_COURSE.md`):

- What RAG means
- Chunking, embeddings, vector DB, Top-K

### Environment

```bash
cd /home/ycode/Projet-FR-IA
source .venv/bin/activate
pip install langchain langchain-community langchain-text-splitters chromadb sentence-transformers pypdf python-dotenv
```

### Config (already in `.env.example`)

| Variable | Value |
|----------|-------|
| `LESSONS_PATH` | `data/raw` |
| `VECTOR_DB_PATH` | `vector_db` |
| `EMBEDDING_MODEL` | `sentence-transformers/all-MiniLM-L6-v2` |
| `RAG_CHUNK_SIZE` | `500` |
| `RAG_CHUNK_OVERLAP` | `50` |
| `RAG_TOP_K` | `3` |

Make sure `.env` exists (`cp .env.example .env` if needed).

---

## 3. Files you will create

| Path | Role |
|------|------|
| `data/raw/day01_variables.md` … `day11_final_project.md` | Course knowledge |
| `src/rag/ingest.py` | Build the vector DB |
| `src/rag/retrieval.py` | Query the vector DB |
| Optional: `notebooks/03_RAG_Test.ipynb` | Interactive retrieval experiments |

Topics (same as synthetic data):

1. variables  
2. conditions  
3. loops  
4. lists  
5. functions  
6. dictionaries  
7. oop_classes  
8. oop_inheritance  
9. error_handling  
10. files  
11. final_project  

---

## 4. Step-by-step implementation

---

### STEP 0 — Create folders

```bash
mkdir -p data/raw vector_db src/rag
touch src/rag/__init__.py
```

---

### STEP 1 — Write 11 lesson Markdown files

#### Why Markdown (not only PDF)?
Faster for a PoC. Same RAG pipeline works later with PDFs via `PyPDFLoader`.

#### Naming convention

```text
day01_variables.md
day02_conditions.md
day03_loops.md
day04_lists.md
day05_functions.md
day06_dictionaries.md
day07_oop_classes.md
day08_oop_inheritance.md
day09_error_handling.md
day10_files.md
day11_final_project.md
```

#### Required structure for each file

Each lesson should be **short but real teaching content** (roughly 300–800 words), not one sentence.

Use this template:

```markdown
# Day X — Topic Name

## Learning objectives
- ...
- ...

## Key concepts
Explain the idea in plain language.

## Examples
Show 1–3 small code examples (incomplete is fine; tutor must not dump full solutions later).

## Common mistakes
List 2–4 beginner errors.

## Mini exercises (no full solutions)
- Exercise 1: ...
- Exercise 2: ...

## Summary
3–5 bullet recap.
```

#### Content quality bar
For RAG to work in a demo, each file must contain **searchable unique phrases** for that topic.

Example for `day03_loops.md`: include words like `for`, `while`, `iterate`, `range`, `infinite loop`.

#### Definition of Done for Step 1
- [ ] 11 files exist under `data/raw/`
- [ ] Each has title, concepts, example, mistakes, summary
- [ ] Topics match the list above

---

### STEP 2 — Implement `src/rag/ingest.py`

**Detailed line-by-line implementation guide:**  
→ [`PHASE3_INGEST_IMPLEMENTATION.md`](PHASE3_INGEST_IMPLEMENTATION.md)

#### Responsibility
Offline pipeline:

```text
docs → load → split → embed → persist Chroma
```

#### Suggested functions (type hints + docstrings)

```python
def load_lesson_documents(lessons_path: Path) -> list: ...
def split_documents(documents: list, chunk_size: int, chunk_overlap: int) -> list: ...
def build_vector_store(chunks: list, persist_directory: Path, embedding_model: str): ...
def main() -> None: ...
```

#### Recommended libraries / classes

| Piece | Use |
|-------|-----|
| Load `.md` | `DirectoryLoader` + `TextLoader`, or manually `Path.read_text()` + `Document` |
| Load `.pdf` (optional) | `PyPDFLoader` |
| Split | `RecursiveCharacterTextSplitter` |
| Embeddings | `HuggingFaceEmbeddings` (sentence-transformers) |
| Vector DB | `Chroma` from `langchain_community.vectorstores` |

#### Important implementation details

1. **Read config from environment** (`python-dotenv`).
2. **Add metadata** on each document/chunk:
   - `source` (filename)
   - `day` (1–11)
   - `topic` (e.g. `loops`)
3. **Persist** to `VECTOR_DB_PATH` so you don’t rebuild every time.
4. Print progress:
   - number of files loaded
   - number of chunks created
   - where DB was saved

#### Metadata parsing tip
From filename `day03_loops.md`:

```text
day = 3
topic = loops
```

#### CLI usage (target)

```bash
python -m src.rag.ingest
# or
python src/rag/ingest.py
```

Expected console output (example):

```text
Loaded 11 documents
Created 87 chunks
Vector DB saved to /.../vector_db
```

#### First-run note
Downloading `all-MiniLM-L6-v2` can take a minute. That is normal.

---

### STEP 3 — Implement `src/rag/retrieval.py`

**Detailed line-by-line implementation guide:**  
→ [`PHASE3_RETRIEVAL_IMPLEMENTATION.md`](PHASE3_RETRIEVAL_IMPLEMENTATION.md)

#### Responsibility
Online query:

```text
question → embed → similarity search → Top-K chunks
```

#### Suggested functions

```python
def get_retriever(persist_directory: Path, embedding_model: str, top_k: int): ...
def retrieve_context(question: str, top_k: int | None = None) -> list: ...
def format_context(docs: list) -> str: ...
def main() -> None: ...  # simple CLI test
```

#### Behavior requirements

1. Load existing Chroma from `vector_db/` (do **not** rebuild in retrieval).
2. Use same embedding model as ingest.
3. Return Top-K documents (`RAG_TOP_K=3` by default).
4. Expose useful fields:
   - `page_content`
   - metadata (`day`, `topic`, `source`)
5. Provide a formatter that builds a context string for later agent prompts.

#### CLI test usage (target)

```bash
python -m src.rag.retrieval --query "What is a for loop?"
```

Expected: chunks mostly from `day03_loops.md`.

---

### STEP 4 — Manual quality tests

Run at least these queries and write results in a markdown cell or notes:

| Query | Expected topic / day |
|-------|----------------------|
| “What is a variable?” | day01 / variables |
| “How do if and else work?” | day02 / conditions |
| “What is a for loop?” | day03 / loops |
| “How do I open a file in Python?” | day10 / files |
| “What is inheritance?” | day08 / oop_inheritance |

For each query, check:

1. Are Top-3 chunks relevant?
2. Do metadata `day` / `topic` make sense?
3. Would a tutor be able to answer from this context alone?

#### Optional notebook
Create `notebooks/03_RAG_Test.ipynb` to:

- call `retrieve_context(...)`
- print chunk text + metadata
- try bad queries (“Who won the World Cup?”) and observe weak/irrelevant retrieval

**Full step-by-step notebook guide:**  
→ [`PHASE3_RAG_TEST_NOTEBOOK.md`](PHASE3_RAG_TEST_NOTEBOOK.md)

---

### STEP 5 — Document your Phase 3 conclusions

Write a short markdown note (in notebook or `docs/PHASE3_NOTES.md`) answering:

1. How many chunks were created?
2. Which queries retrieved well?
3. Which queries were weak?
4. Did chunk size 500 feel right?
5. Are you ready to connect this to the Concept Tutor agent?

---

## 5. Method reference

### Loading

| Tool | Purpose |
|------|---------|
| `Path.glob("*.md")` | List lesson files |
| `Document(page_content=..., metadata=...)` | LangChain document object |
| `DirectoryLoader` | Load many files at once |
| `PyPDFLoader` | Load PDFs (optional) |

### Splitting

| Tool | Purpose |
|------|---------|
| `RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)` | Split with overlap |
| `.split_documents(docs)` | Apply splitter |

### Embeddings + store

| Tool | Purpose |
|------|---------|
| `HuggingFaceEmbeddings(model_name=...)` | Local embeddings |
| `Chroma.from_documents(...)` | Build index |
| `persist_directory=...` | Save on disk |
| `Chroma(persist_directory=..., embedding_function=...)` | Reload index |

### Retrieval

| Tool | Purpose |
|------|---------|
| `vectorstore.as_retriever(search_kwargs={"k": 3})` | Retriever wrapper |
| `retriever.invoke(query)` | Get Top-K docs |
| `vectorstore.similarity_search(query, k=3)` | Direct search |

### Official docs

- LangChain text splitters: https://python.langchain.com/docs/concepts/text_splitters/  
- Chroma: https://docs.trychroma.com/  
- Sentence-Transformers: https://www.sbert.net/  

---

## 6. Definition of Done

- [ ] 11 lesson `.md` files in `data/raw/`
- [ ] `src/rag/ingest.py` runs successfully
- [ ] `vector_db/` folder created and non-empty
- [ ] `src/rag/retrieval.py` returns Top-K chunks with metadata
- [ ] Test query on “for loop” retrieves loop-related content
- [ ] At least 4 different queries manually validated
- [ ] You can explain the pipeline in one minute: load → chunk → embed → store → retrieve

---

## 7. Common mistakes

| Mistake | Why it hurts | Fix |
|---------|--------------|-----|
| Empty / tiny lesson files | Retrieval has nothing meaningful | Write real teaching paragraphs |
| Different embedding model in ingest vs retrieve | Broken similarity | Use same `EMBEDDING_MODEL` |
| Rebuilding DB every query | Slow + inconsistent | Ingest once; retrieve loads persisted DB |
| No metadata | Hard to cite “Day X” later | Store `day`, `topic`, `source` |
| Chunk size too large | Vague retrieval | Keep ~500 with overlap 50 |
| Testing only one query | False confidence | Validate multiple topics |
| Expecting perfect answers already | Phase 3 is retrieval only | Generation comes with agents |

---

## 8. What comes next

**Phase 4 — Agents (LangGraph)** will:

- call your `retrieve_context()`
- prompt Ollama with retrieved context
- enforce “hints only” for code help
- silently call the ML model for at-risk

So Phase 3 quality matters: weak docs/retrieval → weak tutor later.

---

## Suggested work order (today)

1. Create the 11 markdown lessons (can start with 3, then finish all 11)
2. Write + run `ingest.py`
3. Write + run `retrieval.py`
4. Test 4–5 queries
5. Ping me with:
   - number of chunks
   - one good retrieval example
   - one weak retrieval example (if any)

Then I review before Phase 4.
