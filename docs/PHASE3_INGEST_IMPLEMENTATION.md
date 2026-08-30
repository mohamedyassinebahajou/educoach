# Phase 3A — Implementing `ingest.py`

**File you will write:** `src/rag/ingest.py`  
**Input:** 11 Markdown lessons in `data/raw/`  
**Output:** a persistent Chroma database in `vector_db/`  
**Pipeline:** load → add metadata → chunk → embed → store

This guide gives you the code in small sections and explains every instruction. Type each section yourself into `ingest.py`, run it, and understand it before moving on.

---

## 1. What `ingest.py` does

`ingest.py` is an **offline indexing script**. You run it:

- the first time you create the knowledge base;
- after changing lesson documents;
- after changing chunk size or the embedding model.

It does **not** answer student questions and does **not** use Ollama.

```text
11 Markdown lessons
        │
        ▼
LangChain Documents + metadata
        │
        ▼
small overlapping chunks
        │
        ▼
embedding vectors
        │
        ▼
persistent Chroma collection
```

---

## 2. Before writing code

### 2.1 Activate the environment

From the project root:

```bash
cd /home/ycode/Projet-FR-IA
source .venv/bin/activate
```

### 2.2 Install the required packages

```bash
pip install langchain-community langchain-core langchain-text-splitters \
  chromadb sentence-transformers python-dotenv
```

These packages are already listed in `requirements.txt`; this command makes sure they are installed in your current virtual environment.

### 2.3 Verify the lesson files

```bash
ls data/raw/day*.md
```

You should see exactly 11 files. `data/raw/README.md` must **not** be ingested as a lesson.

---

## 3. Design the script before coding

Use five functions:

```python
parse_lesson_metadata(path: Path) -> dict[str, str | int]
load_lesson_documents(lessons_path: Path) -> list[Document]
split_documents(documents: list[Document], ...) -> list[Document]
build_vector_store(chunks: list[Document], ...)
main() -> None
```

Why separate functions?

- each function has one responsibility;
- each part can be tested independently;
- retrieval code can later reuse the same configuration;
- errors are easier to locate.

---

## 4. Section A — Module docstring and imports

Start `src/rag/ingest.py` with:

```python
"""Build the persistent Chroma knowledge base for EduCoach lessons."""

from __future__ import annotations

import argparse
import os
import re
import shutil
from pathlib import Path

from dotenv import load_dotenv
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter
```

### Explanation, instruction by instruction

| Instruction | Why it exists |
|-------------|---------------|
| Module docstring | States the file’s responsibility |
| `from __future__ import annotations` | Makes modern type hints safer and avoids evaluating them too early |
| `argparse` | Adds a command-line option such as `--rebuild` |
| `os` | Reads environment variables |
| `re` | Parses day and topic from filenames |
| `shutil` | Removes an old vector DB only when explicitly rebuilding |
| `Path` | Handles filesystem paths cleanly |
| `load_dotenv` | Loads values from `.env` |
| `HuggingFaceEmbeddings` | Runs `all-MiniLM-L6-v2` locally on CPU |
| `Chroma` | Stores embeddings and text chunks |
| `Document` | LangChain container for text + metadata |
| `RecursiveCharacterTextSplitter` | Creates overlapping chunks |

### About deprecation warnings

With the project’s current dependency ranges, the `langchain_community` imports work. Newer LangChain versions may recommend separate `langchain-huggingface` and `langchain-chroma` packages. Do not mix both styles halfway through this phase.

---

## 5. Section B — Project paths and constants

Add:

```python
PROJECT_ROOT = Path(__file__).resolve().parents[2]
load_dotenv(PROJECT_ROOT / ".env")

COLLECTION_NAME = "educoach_lessons"
LESSON_FILENAME_PATTERN = re.compile(
    r"^day(?P<day>\d{2})_(?P<topic>[a-z0-9_]+)\.md$"
)
```

### Explanation

#### `Path(__file__).resolve()`

`__file__` is the location of `ingest.py`.

For this file:

```text
/home/ycode/Projet-FR-IA/src/rag/ingest.py
```

Its parents are:

```text
parents[0] → src/rag
parents[1] → src
parents[2] → project root
```

This makes paths work even if you run the script from a different directory.

#### `load_dotenv(...)`

Loads `.env`, allowing:

```python
os.getenv("RAG_CHUNK_SIZE")
```

#### `COLLECTION_NAME`

Chroma stores records inside named collections. Retrieval must later use the exact same collection name.

#### Regex pattern

The pattern accepts filenames such as:

```text
day03_loops.md
day08_oop_inheritance.md
```

Named groups capture:

```text
day   → "03"
topic → "loops"
```

---

## 6. Section C — Resolve environment paths

Environment paths such as `data/raw` are relative. Add this helper:

```python
def resolve_project_path(raw_path: str) -> Path:
    """Resolve an environment path relative to the project root."""
    path = Path(raw_path)
    if path.is_absolute():
        return path
    return PROJECT_ROOT / path
```

### Explanation

- If `.env` contains an absolute path, use it directly.
- If it contains `data/raw`, attach it to `PROJECT_ROOT`.
- This avoids depending on the shell’s current working directory.

Example:

```text
"data/raw"
→ /home/ycode/Projet-FR-IA/data/raw
```

---

## 7. Section D — Parse metadata from filenames

Add:

```python
def parse_lesson_metadata(path: Path) -> dict[str, str | int]:
    """Extract day, topic, and source metadata from a lesson filename."""
    match = LESSON_FILENAME_PATTERN.match(path.name)
    if match is None:
        raise ValueError(
            f"Invalid lesson filename: {path.name}. "
            "Expected format: dayNN_topic.md"
        )

    return {
        "day": int(match.group("day")),
        "topic": match.group("topic"),
        "source": str(path.relative_to(PROJECT_ROOT)),
        "filename": path.name,
    }
```

### Explanation

1. `path.name` returns only `day03_loops.md`.
2. `.match(...)` validates the naming convention.
3. If invalid, fail clearly instead of silently creating bad metadata.
4. `int("03")` becomes `3`.
5. `source` stores a portable relative path, not a machine-specific absolute path.

Expected result:

```python
{
    "day": 3,
    "topic": "loops",
    "source": "data/raw/day03_loops.md",
    "filename": "day03_loops.md",
}
```

Why metadata matters:

- filter retrieval by day;
- display citations;
- debug wrong search results;
- let the Concept Tutor say “According to Day 3…”.

---

## 8. Section E — Load the 11 lessons

Add:

```python
def load_lesson_documents(lessons_path: Path) -> list[Document]:
    """Load lesson Markdown files as LangChain documents."""
    lesson_files = sorted(lessons_path.glob("day*.md"))

    if not lesson_files:
        raise FileNotFoundError(
            f"No lesson files matching day*.md found in {lessons_path}"
        )

    documents: list[Document] = []

    for lesson_path in lesson_files:
        content = lesson_path.read_text(encoding="utf-8").strip()
        if not content:
            raise ValueError(f"Lesson file is empty: {lesson_path}")

        documents.append(
            Document(
                page_content=content,
                metadata=parse_lesson_metadata(lesson_path),
            )
        )

    return documents
```

### Explanation, line by line

#### `glob("day*.md")`

Loads only lessons. It intentionally excludes `README.md`.

#### `sorted(...)`

Makes order deterministic: day01, day02, … day11.

#### Empty-list check

Stops early with an understandable error if the path is wrong.

#### `read_text(encoding="utf-8")`

Loads Markdown text safely, including accented characters.

#### `.strip()`

Removes leading/trailing whitespace and makes empty-file validation reliable.

#### `Document(...)`

Each original lesson becomes:

```text
page_content → full Markdown lesson
metadata     → day, topic, source, filename
```

### Temporary test

Before writing chunking, you can temporarily call:

```python
docs = load_lesson_documents(PROJECT_ROOT / "data/raw")
print(len(docs))
print(docs[2].metadata)
print(docs[2].page_content[:200])
```

Expected:

- `11`
- day 3 / loops metadata
- beginning of the loops lesson

Delete this temporary test after validation.

---

## 9. Section F — Split lessons into chunks

Add:

```python
def split_documents(
    documents: list[Document],
    chunk_size: int,
    chunk_overlap: int,
) -> list[Document]:
    """Split lesson documents into overlapping retrieval chunks."""
    if chunk_size <= 0:
        raise ValueError("chunk_size must be greater than zero")
    if chunk_overlap < 0 or chunk_overlap >= chunk_size:
        raise ValueError(
            "chunk_overlap must be non-negative and smaller than chunk_size"
        )

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap,
        separators=["\n## ", "\n### ", "\n\n", "\n", " ", ""],
    )

    chunks = splitter.split_documents(documents)

    for index, chunk in enumerate(chunks):
        chunk.metadata["chunk_id"] = index

    return chunks
```

### Explanation

#### Validation

Invalid examples:

```text
chunk_size = 0
chunk_overlap = 600 while chunk_size = 500
```

These should fail immediately.

#### Why `RecursiveCharacterTextSplitter`

It tries separators in order:

1. Markdown level-2 headings;
2. level-3 headings;
3. paragraphs;
4. lines;
5. words;
6. characters as last resort.

This preserves educational sections better than blindly cutting every 500 characters.

#### `chunk_size=500`

Approximately 500 characters per chunk, not exactly 500 tokens.

#### `chunk_overlap=50`

Repeats around 50 characters between neighboring chunks, protecting context around boundaries.

#### Metadata inheritance

`split_documents()` copies parent metadata into each chunk, so every chunk still knows its day/topic/source.

#### `chunk_id`

Gives each chunk a traceable numeric identifier.

### Inspect chunks before embedding

Print:

```python
print(f"Created {len(chunks)} chunks")
print(chunks[0].metadata)
print(chunks[0].page_content)
```

Check:

- text is readable;
- chunks are not one-word fragments;
- metadata survived;
- lesson sections are not badly mixed.

---

## 10. Section G — Create the embedding model

Add:

```python
def create_embeddings(model_name: str) -> HuggingFaceEmbeddings:
    """Create the local CPU embedding model."""
    return HuggingFaceEmbeddings(
        model_name=model_name,
        model_kwargs={"device": "cpu"},
        encode_kwargs={"normalize_embeddings": True},
    )
```

### Explanation

#### Embedding model

`all-MiniLM-L6-v2` maps each chunk to a vector of **384 numbers**. Text with similar meaning tends to have nearby vectors.

#### `device="cpu"`

Explicitly follows your no-GPU constraint.

#### `normalize_embeddings=True`

Normalizes vectors to length 1, making cosine-based similarity more stable and interpretable.

#### First-run behavior

Sentence Transformers downloads model files on first use. Later runs use the local cache.

---

## 11. Section H — Safely handle an existing database

Add:

```python
def prepare_persist_directory(
    persist_directory: Path,
    rebuild: bool,
) -> None:
    """Create an empty persistence directory or rebuild it explicitly."""
    existing_entries = (
        [
            entry
            for entry in persist_directory.iterdir()
            if entry.name != ".gitkeep"
        ]
        if persist_directory.exists()
        else []
    )

    if existing_entries and not rebuild:
        raise FileExistsError(
            f"Vector DB already exists at {persist_directory}. "
            "Run again with --rebuild to replace it."
        )

    if existing_entries and rebuild:
        shutil.rmtree(persist_directory)

    persist_directory.mkdir(parents=True, exist_ok=True)
```

### Why this safeguard exists

Running ingestion twice into the same collection can duplicate chunks. This function:

- protects an existing index by default;
- only deletes it when you explicitly pass `--rebuild`;
- ignores the placeholder `.gitkeep`.

`shutil.rmtree()` is destructive, which is why it must only run behind an explicit flag.

---

## 12. Section I — Build and persist Chroma

Add:

```python
def build_vector_store(
    chunks: list[Document],
    persist_directory: Path,
    embedding_model: str,
) -> Chroma:
    """Embed chunks and store them in a persistent Chroma collection."""
    if not chunks:
        raise ValueError("Cannot build a vector store from zero chunks")

    embeddings = create_embeddings(embedding_model)

    return Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory=str(persist_directory),
        collection_name=COLLECTION_NAME,
        collection_metadata={"hnsw:space": "cosine"},
    )
```

### What happens inside `from_documents`

For every chunk:

1. send text to the embedding model;
2. receive a 384-dimensional vector;
3. store vector + original text + metadata;
4. update Chroma’s similarity-search index;
5. persist files under `vector_db/`.

### Why cosine distance

Cosine similarity compares vector direction, which is common for semantic text embeddings.

### Do you need `vector_store.persist()`?

With current Chroma persistence behavior, supplying `persist_directory` persists automatically. Old tutorials may call `.persist()` explicitly.

---

## 13. Section J — Read typed configuration

Add:

```python
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

### Why not simply write `int(os.getenv(...))`?

This helper creates a clear message for bad `.env` values such as:

```text
RAG_CHUNK_SIZE=five-hundred
```

For overlap, zero is valid, so read it separately in `main()` and let `split_documents()` perform the final relationship check.

---

## 14. Section K — Implement `main()`

Add:

```python
def main() -> None:
    """Run the complete lesson-ingestion pipeline."""
    parser = argparse.ArgumentParser(
        description="Build the EduCoach lesson vector database."
    )
    parser.add_argument(
        "--rebuild",
        action="store_true",
        help="Delete and rebuild an existing vector database.",
    )
    args = parser.parse_args()

    lessons_path = resolve_project_path(
        os.getenv("LESSONS_PATH", "data/raw")
    )
    persist_directory = resolve_project_path(
        os.getenv("VECTOR_DB_PATH", "vector_db")
    )
    embedding_model = os.getenv(
        "EMBEDDING_MODEL",
        "sentence-transformers/all-MiniLM-L6-v2",
    )
    chunk_size = get_positive_int("RAG_CHUNK_SIZE", 500)
    chunk_overlap = int(os.getenv("RAG_CHUNK_OVERLAP", "50"))

    print(f"Loading lessons from: {lessons_path}")
    documents = load_lesson_documents(lessons_path)
    print(f"Loaded {len(documents)} lesson documents")

    chunks = split_documents(
        documents,
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap,
    )
    print(
        f"Created {len(chunks)} chunks "
        f"(size={chunk_size}, overlap={chunk_overlap})"
    )

    prepare_persist_directory(persist_directory, rebuild=args.rebuild)

    print(f"Embedding with: {embedding_model}")
    vector_store = build_vector_store(
        chunks,
        persist_directory=persist_directory,
        embedding_model=embedding_model,
    )

    stored_count = vector_store._collection.count()
    print(f"Stored {stored_count} chunks")
    print(f"Vector DB saved to: {persist_directory}")
```

### Explanation of the execution flow

1. Parse CLI arguments.
2. Resolve `.env` configuration.
3. Load 11 source lessons.
4. Split them into chunks.
5. protect/rebuild the persistence directory.
6. embed and store chunks.
7. print a final integrity count.

### About `_collection.count()`

`_collection` is an internal wrapper attribute, used here only for a simple validation count. The application’s retrieval code should rely on public search methods instead.

---

## 15. Section L — Add the entry point

At the bottom:

```python
if __name__ == "__main__":
    main()
```

### Why this is needed

It runs `main()` when you execute:

```bash
python -m src.rag.ingest
```

But it does not automatically run ingestion if another file imports a helper from this module.

---

## 16. Run the script

From project root:

```bash
source .venv/bin/activate
python -m src.rag.ingest
```

Expected shape of output:

```text
Loading lessons from: .../data/raw
Loaded 11 lesson documents
Created N chunks (size=500, overlap=50)
Embedding with: sentence-transformers/all-MiniLM-L6-v2
Stored N chunks
Vector DB saved to: .../vector_db
```

`N` depends on the exact text and splitter behavior. It does not need to match an example number exactly.

If the DB already exists:

```bash
python -m src.rag.ingest --rebuild
```

Use `--rebuild` only when you intentionally want to replace the current index.

---

## 17. Validate the result

### 17.1 Files exist

```bash
ls -la vector_db
```

It should contain Chroma files, not only `.gitkeep`.

### 17.2 Counts make sense

Confirm:

```text
loaded documents = 11
stored chunks = created chunks
stored chunks > 11
```

### 17.3 Metadata spot-check

Before storage, print one chunk:

```python
print(chunks[0].metadata)
print(chunks[0].page_content[:300])
```

Expected metadata keys:

```text
day, topic, source, filename, chunk_id
```

Remove debug prints once verified.

---

## 18. Common errors

### `ModuleNotFoundError`

Cause: wrong interpreter or missing dependency.

```bash
which python
python -m pip install -r requirements.txt
```

`which python` should point inside `.venv`.

### `No lesson files matching day*.md`

Check:

```bash
ls data/raw/day*.md
```

Also print `lessons_path` to verify configuration.

### Invalid filename

The expected format is:

```text
dayNN_topic.md
```

For example: `day03_loops.md`.

### Existing vector DB

Use:

```bash
python -m src.rag.ingest --rebuild
```

only if replacing it is intended.

### Download/model error

The first embedding run needs internet access to download the Sentence Transformer. Retry after confirming connectivity. Later runs use the cache.

### Chroma telemetry warnings

Some Chroma versions print non-fatal telemetry messages. Judge success by whether the script finishes, counts match, and DB files exist.

---

## 19. Understanding questions

Before moving to `retrieval.py`, answer these:

1. Why does the script load only `day*.md`?
2. Why attach metadata before chunking?
3. Why must overlap be smaller than chunk size?
4. Why must ingestion and retrieval use the same embedding model?
5. Why do we save the full original text with each vector?
6. Why is rebuilding explicit instead of automatic?
7. Why does this script not call Ollama?

---

## 20. Definition of Done

- [ ] `src/rag/ingest.py` contains the functions above
- [ ] Type hints and docstrings are present
- [ ] Exactly 11 lesson documents load
- [ ] Chunks preserve day/topic/source metadata
- [ ] Embeddings run on CPU
- [ ] Chroma persists to `vector_db/`
- [ ] Created chunk count equals stored count
- [ ] A second run is protected from accidental duplicates
- [ ] `--rebuild` intentionally recreates the index

Once these pass, bring me:

1. your `ingest.py`;
2. its console output;
3. the created/stored chunk count;
4. any warning or error.

Then we review it before implementing `retrieval.py`.
