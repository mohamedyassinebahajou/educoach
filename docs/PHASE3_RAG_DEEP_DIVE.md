# Phase 3 Deep Dive — RAG (EduCoach)

**Companions:** [`RAG_CRASH_COURSE.md`](RAG_CRASH_COURSE.md) · [`PHASE3_INGEST_RETRIEVAL_UNDERSTANDING.md`](PHASE3_INGEST_RETRIEVAL_UNDERSTANDING.md) · guides for ingest/retrieval  
**Code:** `src/rag/ingest.py`, `src/rag/retrieval.py`  
**Data:** `data/raw/day*.md` → `vector_db/` (~131 chunks after enrichment)

---

## 1. Why Phase 3 exists

The **Concept Tutor** must teach from **your SAS lessons**, not from generic LLM memory.

Without RAG:
```text
Student: "What is a for loop?"
LLM: invents / vague / may not match Day 3 wording
```

With RAG:
```text
Student: "What is a for loop?"
→ retrieve Day 3 chunks (code + output)
→ LLM answers using that text → "According to Day 3…"
```

**Formula to memorize:**

```text
RAG = Retrieve relevant docs + Augment the prompt + Generate the answer
```

---

## 2. Offline vs online (two clocks)

```text
OFFLINE (ingest — when lessons change)
Lessons .md → load → chunk → embed → store Chroma

ONLINE (every question — retrieval; generation in Phase 4)
Question → embed → Top-K similar chunks → context string
         → (Phase 4) LLM with system prompt + context
```

| Script | When | Needs LLM? |
|--------|------|------------|
| `ingest.py` | Build/rebuild index | No |
| `retrieval.py` | Fetch chunks | No |
| `concept_tutor.py` | Answer | Yes (Gemini/Ollama) |

---

## 3. Core concepts

### Documents
Your 11 Markdown lessons (`day01_variables` … `day11_final_project`), enriched with **worked examples + step-by-step + Output**.

### Chunking
Split long text into overlapping pieces.

| Setting | Yours | Why |
|---------|-------|-----|
| `chunk_size` | **500** | Enough for an example block |
| `chunk_overlap` | **50** | Don’t cut a sentence/example in half with zero continuity |

Splitter: `RecursiveCharacterTextSplitter` (tries `\n\n`, `\n`, spaces…).

### Embeddings
Turn text → **vector** (list of numbers) so “similar meaning ≈ nearby vectors”.

Yours: `sentence-transformers/all-MiniLM-L6-v2` on **CPU**, normalized.

Same model for ingest **and** query — required.

### Vector database (Chroma)
Stores vectors + text + metadata (`day`, `topic`, `source`).  
Persistence folder: `vector_db/`, collection `educoach_lessons`.

### Similarity search + Top-K
Embed the question → find **K=3** nearest lesson chunks.

### Metadata
Each chunk knows `day=3`, `topic=loops` → Tutor can cite Day X; `format_context` shows sources.

### Grounding
Prompt rule: answer **only** from retrieved context (Phase 4). RAG retrieves; the prompt enforces grounding.

---

## 4. Pipeline picture (redraw this)

```text
┌──────────────┐
│ 11 lessons   │
└──────┬───────┘
       │ ingest
       ▼
┌──────────────┐     ┌─────────────┐
│ chunks (~131)│────▶│ embeddings  │
└──────────────┘     └──────┬──────┘
                            ▼
                     ┌─────────────┐
                     │   Chroma    │
                     └──────▲──────┘
                            │ Top-K=3
┌──────────────┐     ┌──────┴──────┐
│  question    │────▶│ embed query │
└──────────────┘     └─────────────┘
                            │
                            ▼
                     context for Tutor
```

---

## 5. Ingest vs retrieve (code roles)

### Ingest (`ingest.py`) — offline
1. Load `day*.md` (skip README)  
2. Attach metadata (day, topic, source)  
3. Split 500/50  
4. Embed + write Chroma (`--rebuild` deletes old index)

### Retrieve (`retrieval.py`) — online
1. `retrieve_context(question)` → list of `Document`  
2. `format_context(docs)` → prompt-ready string with Day/topic  

Phase 4 Tutor calls these, then Gemini.

---

## 6. Worked example (your project)

**Query:** “Show a for loop example with output from Day 3”

**Retrieved:** chunks from `day03_loops.md` including:

```python
words = ["cat", "window", "defenestrate"]
for w in words:
    print(w, len(w))
```

Step-by-step + Output:
```text
cat 3
window 6
defenestrate 12
```

**Before enrichment:** Tutor said context lacked full samples.  
**After:** ~68 → **~131** chunks; answers include code + output.

**Lesson:** RAG quality ≤ document quality.

---

## 7. Failure modes (know for jury)

| Problem | Symptom | Fix you used / would use |
|---------|---------|---------------------------|
| Thin docs | “I’m not sure” | Enrich lessons |
| Wrong Top-K chunk | Off-topic answer | Better chunks, higher K, clearer query |
| Embedding mismatch | Bad search | Same model ingest/query |
| Chroma version break | Load crash | `ingest --rebuild` |
| Too much context | Confused small LLM | Keep K=3 |

Hallucinations shrink with RAG + grounding prompts; they don’t vanish.

---

## 8. RAG vs fine-tuning (trap question)

| | RAG | Fine-tune LLM on lessons |
|--|-----|---------------------------|
| Update course | Edit MD + re-ingest | Retrain model |
| Cost / hardware | Light (your PoC) | Heavy |
| Citations | Natural (Day X metadata) | Harder |
| Your choice | **RAG** | Not used |

---

## 9. Settings cheat card

| Knob | Value |
|------|--------|
| Docs | 11 Markdown days |
| Chunk | 500 / 50 |
| Embeddings | all-MiniLM-L6-v2 (CPU) |
| Store | Chroma `educoach_lessons` |
| Top-K | 3 |
| Chunks (enriched) | ~131 |

---

## 10. Videos

| Topic | Link |
|-------|------|
| RAG from scratch | https://www.youtube.com/watch?v=sVcwVQRHIc8 |
| Embeddings intuition | Search: `embeddings explained visually` |
| LangChain + Chroma | Search: `LangChain Chroma tutorial` |

---

## 11. 60-second pitch

“Phase 3 builds a RAG knowledge base: 11 enriched lesson Markdown files are chunked (500/50), embedded with MiniLM, and stored in Chroma (~131 chunks). At question time we retrieve Top-3 similar chunks so the Concept Tutor answers from our SAS material with Day citations and worked code/output—not from generic LLM memory alone.”

---

## 12. Self-check

1. RAG formula in one sentence?  
2. Ingest vs retrieve — which needs the LLM?  
3. Why same embedding model both sides?  
4. Why enrich lessons with Output blocks?  
5. What does Top-K=3 mean?

---

## 13. Jury quick hits

**Q: Is retrieval already “AI”?**  
A: Embeddings are neural; search is similarity. Generation is the LLM step in Phase 4.

**Q: Why not give the whole Day 3 file every time?**  
A: Noise + context limits; chunking + Top-K focuses the prompt.

**Q: Chroma telemetry warnings?**  
A: Harmless noise; not a logic failure.
