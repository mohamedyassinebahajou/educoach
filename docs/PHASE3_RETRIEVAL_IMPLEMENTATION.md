# Phase 3B — Implementing `retrieval.py`

**File you will write:** `src/rag/retrieval.py`  
**Input:** existing Chroma DB in `vector_db/` (already built by `ingest.py`)  
**Output:** Top-K lesson chunks for a student question  
**Pipeline:** question → embed → similarity search → return chunks (+ optional formatted context)

This guide mirrors the ingest guide: type each section yourself, understand it, then move on.

---

## 1. What `retrieval.py` does

`retrieval.py` is the **online query** side of RAG.

It does **not**:
- rebuild the vector database;
- call Ollama / generate a final tutor answer (that comes in Phase 4).

It **does**:
- load the persisted Chroma index;
- embed the user question with the **same** model used at ingest;
- find the most similar chunks;
- return text + metadata for the Concept Tutor later.

```text
Student question
      │
      ▼
Embed question (same model as ingest)
      │
      ▼
Search Chroma (Top-K, default 3)
      │
      ▼
Return relevant lesson chunks
      │
      ▼
(later) Concept Tutor + Ollama uses those chunks
```

---

## 2. Hard rules (do not break these)

1. **Same embedding model** as ingest (`sentence-transformers/all-MiniLM-L6-v2`).
2. **Same collection name** as ingest (`educoach_lessons`).
3. **Same persist directory** (`vector_db`).
4. **Do not call** `Chroma.from_documents(...)` here — that is ingest only.
5. Keep work inside `main()` / functions — **no import-time side effects**.

---

## 3. Before coding

```bash
cd /home/ycode/Projet-FR-IA
source .venv/bin/activate
```

Confirm the DB exists:

```bash
ls vector_db/chroma.sqlite3
```

If missing, run ingest first:

```bash
python -m src.rag.ingest --rebuild
```

---

## 4. Design the script

Suggested functions:

```python
resolve_project_path(raw_path: str) -> Path
get_positive_int(name: str, default: int) -> int
create_embeddings(model_name: str) -> HuggingFaceEmbeddings
load_vector_store(persist_directory: Path, embedding_model: str) -> Chroma
retrieve_context(question: str, top_k: int | None = None) -> list[Document]
format_context(docs: list[Document]) -> str
main() -> None
```

Optional thin wrapper:

```python
get_retriever(...)  # if you prefer retriever.invoke(query)
```

Either style is fine:
- `vectorstore.similarity_search(query, k=3)`
- or `vectorstore.as_retriever(...).invoke(query)`

---

## 5. Section A — Docstring and imports

Create `src/rag/retrieval.py`:

```python
"""Query the EduCoach lesson vector database (RAG retrieval)."""

from __future__ import annotations

import argparse
import os
from pathlib import Path

from dotenv import load_dotenv
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_core.documents import Document
```

### Explanation

| Import | Why |
|--------|-----|
| `argparse` | CLI `--query` and optional `--top-k` |
| `os` / `load_dotenv` | Read `.env` config |
| `Path` | Resolve `vector_db` path |
| `HuggingFaceEmbeddings` | Same embedder as ingest |
| `Chroma` | Load persisted index |
| `Document` | Type hints for returned chunks |

You do **not** need `RecursiveCharacterTextSplitter` here — chunking already happened in ingest.

Deprecation warnings for `langchain_community` are the same as in ingest: ignore for now, or optionally migrate later to `langchain_huggingface` / `langchain_chroma`.

---

## 6. Section B — Constants (must match ingest)

```python
PROJECT_ROOT = Path(__file__).resolve().parents[2]
load_dotenv(PROJECT_ROOT / ".env")

COLLECTION_NAME = "educoach_lessons"
```

### Why this must match ingest

If ingest stored into `educoach_lessons` but retrieval opens another name, you get an empty or wrong collection.

Check your ingest file: `COLLECTION_NAME` must be identical.

---

## 7. Section C — Path and int helpers

You can copy the same helpers you already trust from ingest:

```python
def resolve_project_path(raw_path: str) -> Path:
    """Resolve an environment path relative to the project root."""
    path = Path(raw_path)
    if path.is_absolute():
        return path
    return PROJECT_ROOT / path


def get_positive_int(name: str, default: int) -> int:
    """Read a positive integer from the environment."""
    raw_value = os.getenv(name, str(default))
    try:
        value = int(raw_value)
    except ValueError as exc:
        raise ValueError(f"{name} must be an integer, got {raw_value!r}") from exc

    if value <= 0:
        raise ValueError(f"{name} must be greater than zero")
    return value
```

### Explanation

- `VECTOR_DB_PATH=vector_db` becomes `/home/ycode/Projet-FR-IA/vector_db`
- `RAG_TOP_K=3` becomes integer `3`

Duplicating small helpers is OK for Phase 3. Later you can move shared helpers into `src/rag/config.py` if you want cleaner code.

---

## 8. Section D — Create embeddings (same as ingest)

```python
def create_embeddings(model_name: str) -> HuggingFaceEmbeddings:
    """Create the local CPU embedding model used at query time."""
    return HuggingFaceEmbeddings(
        model_name=model_name,
        model_kwargs={"device": "cpu"},
        encode_kwargs={"normalize_embeddings": True},
    )
```

### Critical concept

The question must be embedded in the **same vector space** as the chunks.

If ingest used MiniLM and retrieval used another model, similarity search becomes meaningless.

Keep:
- same `model_name`
- same `device="cpu"`
- same `normalize_embeddings=True`

---

## 9. Section E — Load the existing vector store

```python
def load_vector_store(
    persist_directory: Path,
    embedding_model: str,
) -> Chroma:
    """Load a previously ingested Chroma collection."""
    if not persist_directory.exists():
        raise FileNotFoundError(
            f"Vector DB not found at {persist_directory}. "
            "Run: python -m src.rag.ingest"
        )

    embeddings = create_embeddings(embedding_model)

    return Chroma(
        persist_directory=str(persist_directory),
        embedding_function=embeddings,
        collection_name=COLLECTION_NAME,
    )
```

### Explanation

| Part | Meaning |
|------|---------|
| `persist_directory.exists()` | Fail early if ingest was never run |
| `Chroma(...)` constructor | **Open** existing DB (not rebuild) |
| `embedding_function=...` | Needed so query text can be embedded |
| `collection_name=...` | Must match ingest |

### What not to do

```python
# WRONG in retrieval.py
Chroma.from_documents(...)
```

That recreates / overwrites content. Retrieval only **reads**.

---

## 10. Section F — Retrieve Top-K chunks

```python
def retrieve_context(
    question: str,
    *,
    persist_directory: Path | None = None,
    embedding_model: str | None = None,
    top_k: int | None = None,
) -> list[Document]:
    """Return the Top-K most similar lesson chunks for a question."""
    cleaned = question.strip()
    if not cleaned:
        raise ValueError("question must not be empty")

    persist_directory = persist_directory or resolve_project_path(
        os.getenv("VECTOR_DB_PATH", "vector_db")
    )
    embedding_model = embedding_model or os.getenv(
        "EMBEDDING_MODEL",
        "sentence-transformers/all-MiniLM-L6-v2",
    )
    top_k = top_k or get_positive_int("RAG_TOP_K", 3)

    vector_store = load_vector_store(persist_directory, embedding_model)
    return vector_store.similarity_search(cleaned, k=top_k)
```

### Explanation

1. Reject empty questions.
2. Resolve config defaults from `.env`.
3. Load Chroma.
4. `similarity_search(question, k=3)`:
   - embeds the question;
   - finds nearest chunk vectors;
   - returns LangChain `Document`s.

Each returned document has:
- `page_content` → chunk text
- `metadata` → `day`, `topic`, `source`, `filename`, `chunk_id`

### Optional alternative

```python
retriever = vector_store.as_retriever(search_kwargs={"k": top_k})
docs = retriever.invoke(cleaned)
```

Same idea; `similarity_search` is more explicit for learning.

---

## 11. Section G — Format context for the future tutor

Agents will need one string to put into the prompt. Add:

```python
def format_context(docs: list[Document]) -> str:
    """Build a prompt-ready context block from retrieved chunks."""
    if not docs:
        return "No relevant lesson context was found."

    blocks: list[str] = []
    for i, doc in enumerate(docs, start=1):
        day = doc.metadata.get("day", "?")
        topic = doc.metadata.get("topic", "unknown")
        source = doc.metadata.get("source", "unknown")
        blocks.append(
            f"[Chunk {i}] Day {day} — {topic} (source: {source})\n"
            f"{doc.page_content.strip()}"
        )

    return "\n\n".join(blocks)
```

### Why format now

Phase 4 Concept Tutor prompt will look like:

```text
Use ONLY this context...
{formatted_context}
Question: ...
```

Having `format_context()` ready means the agent only calls retrieval + format.

---

## 12. Section H — Pretty print for CLI testing

```python
def print_results(docs: list[Document]) -> None:
    """Print retrieved chunks in a readable CLI format."""
    if not docs:
        print("No chunks retrieved.")
        return

    for i, doc in enumerate(docs, start=1):
        meta = doc.metadata
        print("=" * 60)
        print(
            f"#{i} | day={meta.get('day')} | "
            f"topic={meta.get('topic')} | "
            f"source={meta.get('source')}"
        )
        print("-" * 60)
        print(doc.page_content.strip())
        print()
```

This is for humans testing retrieval quality. The agent will use `format_context`, not this printer.

---

## 13. Section I — `main()` CLI

```python
def main() -> None:
    """CLI entrypoint for testing retrieval quality."""
    parser = argparse.ArgumentParser(
        description="Retrieve Top-K EduCoach lesson chunks for a question."
    )
    parser.add_argument(
        "--query",
        "-q",
        required=True,
        help="Student question to search for.",
    )
    parser.add_argument(
        "--top-k",
        type=int,
        default=None,
        help="Override RAG_TOP_K (default from .env or 3).",
    )
    parser.add_argument(
        "--show-formatted",
        action="store_true",
        help="Also print the prompt-ready formatted context block.",
    )
    args = parser.parse_args()

    docs = retrieve_context(args.query, top_k=args.top_k)
    print(f"Query: {args.query}")
    print(f"Retrieved: {len(docs)} chunk(s)\n")
    print_results(docs)

    if args.show_formatted:
        print("=" * 60)
        print("FORMATTED CONTEXT")
        print("=" * 60)
        print(format_context(docs))
```

### Explanation

- `--query` is required (no silent empty search).
- `--top-k` lets you experiment (`1`, `3`, `5`).
- `--show-formatted` previews what the tutor will receive later.

---

## 14. Section J — Entry point

```python
if __name__ == "__main__":
    main()
```

No module-level `docs = ...` or `print(...)` outside functions.

---

## 15. Run it

From project root:

```bash
source .venv/bin/activate
python -m src.rag.retrieval --query "What is a for loop?"
```

Also try:

```bash
python -m src.rag.retrieval -q "What is a variable?" --top-k 3
python -m src.rag.retrieval -q "How do if and else work?"
python -m src.rag.retrieval -q "What is inheritance?" --show-formatted
python -m src.rag.retrieval -q "How do I open a file in Python?"
```

---

## 16. How to judge quality

| Query | Good result looks like |
|-------|------------------------|
| “What is a for loop?” | `topic=loops`, day 3, text about `for` / `while` / `range` |
| “What is a variable?” | `topic=variables`, day 1 |
| “What is inheritance?” | `topic=oop_inheritance`, day 8 |
| “How do I open a file?” | `topic=files`, day 10 |

### Pass criteria
- At least **2 of Top-3** chunks are on-topic for clear questions.
- Metadata (`day`, `topic`, `source`) is present.
- Formatted context is readable.

### Soft fail (investigate, not panic)
- One off-topic chunk among 3 (common with small corpora).
- Ambiguous questions retrieve mixed topics.

### Hard fail
- Empty results while DB has 68 chunks.
- Always wrong topic for obvious queries.
- Missing metadata.

---

## 17. Common errors

### `Vector DB not found`
Run ingest first.

### Empty / wrong collection
`COLLECTION_NAME` mismatch between ingest and retrieval.

### Weird results after changing lessons
Re-ingest:

```bash
python -m src.rag.ingest --rebuild
```

### `ModuleNotFoundError`
Wrong interpreter — use `.venv`.

### DeprecationWarning for HuggingFaceEmbeddings
Same as ingest; non-blocking for Phase 3.

---

## 18. Understanding questions

Answer before Phase 4:

1. Why must retrieval use the same embedding model as ingest?
2. Why does retrieval open Chroma instead of calling `from_documents`?
3. What is Top-K?
4. What fields should each retrieved chunk expose to the tutor?
5. Why format context into one string?

---

## 19. Definition of Done

- [ ] `src/rag/retrieval.py` exists with the functions above
- [ ] No import-time side effects
- [ ] CLI `--query` works
- [ ] Top-K defaults to 3 from `.env`
- [ ] Metadata printed for each chunk
- [ ] `format_context()` ready for agents
- [ ] At least 4 test queries manually validated

---

## 20. What to send me for review

1. Your `retrieval.py`
2. Output of:

```bash
python -m src.rag.retrieval -q "What is a for loop?"
```

3. One good query + one weak/surprising query (if any)

Then we close Phase 3 and start Phase 4 (agents).
