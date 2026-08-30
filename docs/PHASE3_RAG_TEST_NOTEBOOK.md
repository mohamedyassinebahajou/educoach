# Phase 3C — RAG Test Notebook Guide

**File to create / fill:** `notebooks/03_RAG_Test.ipynb`  
**Depends on:** `src/rag/ingest.py` (already run) + `src/rag/retrieval.py`  
**Goal:** Interactively validate retrieval quality before building LangGraph agents (Phase 4).

> You write the notebook. This guide gives the cell plan, code patterns, and what “good” looks like.

---

## Table of contents

1. [Why this notebook](#1-why-this-notebook)
2. [Prerequisites](#2-prerequisites)
3. [Fix `format_context` first](#3-fix-format_context-first)
4. [Notebook cell plan](#4-notebook-cell-plan)
5. [Step-by-step cells](#5-step-by-step-cells)
6. [How to judge results](#6-how-to-judge-results)
7. [Insights template](#7-insights-template)
8. [Definition of Done](#8-definition-of-done)
9. [Common mistakes](#9-common-mistakes)

---

## 1. Why this notebook

`retrieval.py` CLI proves the pipeline works.  
This notebook helps you:

- inspect several queries side by side;
- see metadata (`day`, `topic`, `source`);
- preview `format_context()` (what the Concept Tutor will receive);
- write short quality notes for soutenance / Phase 4.

It does **not** re-ingest documents and does **not** call Ollama.

---

## 2. Prerequisites

```bash
cd /home/ycode/Projet-FR-IA
source .venv/bin/activate
```

Checks:

```bash
ls vector_db/chroma.sqlite3
ls src/rag/retrieval.py
```

If the DB is missing:

```bash
python -m src.rag.ingest --rebuild
```

### Cursor notebook setup

1. Create `notebooks/03_RAG_Test.ipynb`
2. Select kernel **Python (EduCoach)** / `.venv`
3. Run cells with **Shift+Enter**

First retrieval cell may take ~20–40s while embeddings load. Later cells are faster if the process stays warm (still often reloads the model per call with the current API design).

---

## 3. Fix `format_context` first

Before the formatted-context cell, fix these bugs in `src/rag/retrieval.py`:

| Wrong | Correct |
|-------|---------|
| `enumerate(docs, stat=1)` | `enumerate(docs, start=1)` |
| `doc.netadata.get(...)` | `doc.metadata.get(...)` |

Also recommended (optional):

| Wrong | Correct |
|-------|---------|
| `src.rah.ingest` | `src.rag.ingest` |
| `clearned` | `cleaned` |
| `empthy` | `empty` |
| `relevent` | `relevant` |

If you skip the first two fixes, the `format_context` cell will crash.

---

## 4. Notebook cell plan

| # | Type | Purpose |
|---|------|---------|
| 0 | Markdown | Title + goal |
| 1 | Code | Imports + `sys.path` |
| 2 | Code | `show()` helper |
| 3 | Markdown | Good queries |
| 4 | Code | Run on-topic queries |
| 5 | Markdown | Edge / weak queries |
| 6 | Code | Run weak queries |
| 7 | Markdown | Formatted context |
| 8 | Code | `format_context` preview |
| 9 | Optional Code | Top-K experiment (`k=1` vs `k=5`) |
| 10 | Markdown | Insights |

---

## 5. Step-by-step cells

---

### CELL 0 — Title (Markdown)

```markdown
# Phase 3C — RAG Retrieval Test

**Goal:** Validate that EduCoach retrieves the right lesson chunks for student questions.

**Stack:** Chroma + `all-MiniLM-L6-v2` + `src.rag.retrieval`
```

---

### CELL 1 — Imports

```python
from pathlib import Path
import sys

PROJECT_ROOT = Path("..").resolve()
sys.path.insert(0, str(PROJECT_ROOT))

from src.rag.retrieval import retrieve_context, format_context

print("Project root:", PROJECT_ROOT)
```

#### Explanation

| Line | Why |
|------|-----|
| `Path("..").resolve()` | Notebook lives in `notebooks/`, project root is one level up |
| `sys.path.insert(...)` | Lets you import `src.rag...` from the notebook |
| Import retrieval helpers | Reuse production code — do not reimplement search here |

#### If import fails

- Wrong kernel (not `.venv`)
- Typo in module path
- Missing `src/rag/__init__.py`

---

### CELL 2 — Display helper

```python
def show(query: str, top_k: int = 3) -> None:
    """Retrieve and print Top-K chunks for a query."""
    docs = retrieve_context(query, top_k=top_k)
    print(f"Query: {query}")
    print(f"Retrieved: {len(docs)} chunk(s)\n")

    for i, doc in enumerate(docs, start=1):
        meta = doc.metadata
        print("=" * 60)
        print(
            f"#{i} | day={meta.get('day')} | "
            f"topic={meta.get('topic')} | "
            f"source={meta.get('source')}"
        )
        print("-" * 60)
        text = doc.page_content.strip()
        print(text[:500] + ("..." if len(text) > 500 else ""))
        print()
```

#### Explanation

- Calls the same `retrieve_context` used later by agents
- Prints metadata first (easy quality check)
- Truncates long chunk text for readability

---

### CELL 3 — Section header (Markdown)

```markdown
## On-topic queries

These should retrieve the matching lesson day/topic.
```

---

### CELL 4 — Good queries

```python
show("What is a for loop?")
show("What is a variable?")
show("What is inheritance?")
show("How do I open a file in Python?")
show("How do if and else work?")
```

#### Expected topics

| Query | Expected `topic` | Expected `day` |
|-------|------------------|----------------|
| for loop | `loops` | 3 |
| variable | `variables` | 1 |
| inheritance | `oop_inheritance` | 8 |
| open a file | `files` | 10 |
| if and else | `conditions` | 2 |

**Pass rule:** at least **2 of Top-3** chunks on-topic for each clear query.

---

### CELL 5 — Edge cases header (Markdown)

```markdown
## Edge / weak queries

These may retrieve mixed or weakly related chunks. That is useful information, not a failure by itself.
```

---

### CELL 6 — Weak queries

```python
show("Who won the World Cup?")
show("Explain recursion in detail")
show("How do I deploy Kubernetes?")
```

#### What to look for

- Chunks may look random / unrelated
- Or vaguely related if some words overlap
- Later, the Concept Tutor + guardrails should say “not in today’s materials” when context is weak

Write down what happened — this becomes a Phase 4 prompt-design insight.

---

### CELL 7 — Formatted context header (Markdown)

```markdown
## Formatted context (preview for Concept Tutor)

This is the string the tutor agent will inject into the LLM prompt.
```

---

### CELL 8 — `format_context` preview

```python
docs = retrieve_context("What is a for loop?", top_k=3)
print(format_context(docs))
```

#### Expected shape

```text
[Chunk 1] day 3 - loops (source: data/raw/day03_loops.md)
...chunk text...

[Chunk 2] day 3 - loops (source: ...)
...
```

If this crashes, return to [Section 3](#3-fix-format_context-first).

---

### CELL 9 — Optional Top-K experiment

```python
query = "What is a variable?"

print("=== Top-K = 1 ===")
show(query, top_k=1)

print("=== Top-K = 5 ===")
show(query, top_k=5)
```

#### Questions to answer

- Does `k=1` lose useful context?
- Does `k=5` add noise?
- Is default `k=3` a good compromise for EduCoach?

---

### CELL 10 — Insights (Markdown)

Fill with your observations (template below).

---

## 6. How to judge results

### Excellent
- Clear queries → correct topic in most/all Top-3
- Metadata present (`day`, `topic`, `source`)
- `format_context` readable

### Acceptable
- One off-topic chunk among 3 (example: variable query returning one `oop_classes` chunk)

### Needs investigation
- Always wrong topic for obvious queries
- Empty results
- Missing metadata
- Crash in `format_context`

---

## 7. Insights template

Copy into the last Markdown cell:

```markdown
## Insights (Phase 3C)

1. **Best query:** ___ retrieved topic(s) ___ cleanly.
2. **Weakest on-topic query:** ___ because ___.
3. **Off-topic / edge query behavior:** ___.
4. **Top-K choice:** I prefer k=___ because ___.
5. **Metadata quality:** day/topic/source were [always / mostly / sometimes] present.
6. **Ready for Phase 4 Concept Tutor?** [Yes / Not yet] — ___.

### One-sentence summary
Retrieval is ___ for EduCoach because ___.
```

---

## 8. Definition of Done

- [ ] Notebook `03_RAG_Test.ipynb` exists
- [ ] Kernel is `.venv` / EduCoach
- [ ] Imports `retrieve_context` and `format_context` successfully
- [ ] At least 4 on-topic queries validated
- [ ] At least 1 edge/weak query tested
- [ ] `format_context` runs without error
- [ ] Insights markdown filled
- [ ] Notebook runs top-to-bottom (Restart & Run All)

---

## 9. Common mistakes

| Mistake | Fix |
|---------|-----|
| `ModuleNotFoundError: src` | Fix `sys.path` / select correct kernel |
| `Vector DB not found` | Run `python -m src.rag.ingest --rebuild` |
| `format_context` TypeError / AttributeError | Fix `start=` and `metadata` typos |
| Very slow every cell | Embedding model reloads; normal for now; optimize later with a shared loader if needed |
| Judging only one query | Test multiple topics + one edge case |

---

## Related docs

- Overall Phase 3: [`PHASE3_RAG_GUIDE.md`](PHASE3_RAG_GUIDE.md)
- Ingest guide: [`PHASE3_INGEST_IMPLEMENTATION.md`](PHASE3_INGEST_IMPLEMENTATION.md)
- Retrieval guide: [`PHASE3_RETRIEVAL_IMPLEMENTATION.md`](PHASE3_RETRIEVAL_IMPLEMENTATION.md)
- RAG theory: [`RAG_CRASH_COURSE.md`](RAG_CRASH_COURSE.md)

---

## After this notebook

Ping me with your **insights bullets**.  
Then we start **Phase 4 — LangGraph agents + guardrails + memory**.
