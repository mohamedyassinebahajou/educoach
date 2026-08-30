# RAG Crash Course — Before Phase 3 (EduCoach AI)

**Goal:** Understand RAG fully *before* coding Phase 3.  
**Audience:** You already finished Phase 1 (EDA) and Phase 2 (ML). No RAG experience assumed.

---

## What is RAG? (1-minute version)

**RAG = Retrieval-Augmented Generation**

Plain English:

> Don’t ask the LLM to answer from memory alone.  
> First **retrieve** relevant lesson text, then **generate** an answer using that text.

Without RAG:

```text
Student: "What is a for loop?"
LLM: answers from general training (may invent / be vague)
```

With RAG (EduCoach):

```text
Student: "What is a for loop?"
System: search Day 3 lesson chunks about loops
System: give those chunks + question to LLM
LLM: answer grounded in YOUR course material + cite Day 3
```

**Formula:**

```text
RAG = Search your documents + Ask the LLM to answer using that context
```

---

## Why EduCoach needs RAG

Your **Concept Tutor** agent must:

- answer theory questions from SAS lesson docs
- avoid hallucinating random Python explanations
- cite sources (“According to Day 3…”)

That is exactly RAG.

| Component | EduCoach choice |
|-----------|-----------------|
| Documents | 11 lesson files (one per topic/day) |
| Chunking | size 500, overlap 50 |
| Embeddings | `all-MiniLM-L6-v2` |
| Vector DB | Chroma |
| LLM | Ollama `llama3.2:3b` |
| Top-K | 3 chunks |

---

## The RAG pipeline (memorize this diagram)

```text
OFFLINE (once / when docs change)
─────────────────────────────────
Lesson PDFs/MD
   → Load
   → Split into chunks
   → Embed chunks into vectors
   → Store in Chroma (vector_db/)


ONLINE (every student question)
───────────────────────────────
Question
   → Embed question
   → Similarity search in Chroma (Top-K)
   → Build prompt = question + retrieved chunks
   → LLM generates answer
   → Return answer (+ citations)
```

Two phases:
1. **Indexing** (prepare knowledge)
2. **Querying** (use knowledge)

---

## Core concepts you must understand

### 1. Why not just put the whole PDF in the prompt?
LLM context windows are limited, expensive, and noisy.  
RAG retrieves only the **most relevant small pieces**.

### 2. Chunking
Big documents are split into smaller text pieces.

- Too big → weak search, wasted tokens  
- Too small → missing context  
- Overlap keeps sentences from being cut awkwardly

EduCoach: `chunk_size=500`, `overlap=50`

### 3. Embeddings
An embedding model turns text into a list of numbers (a vector) that represents **meaning**.

Similar meanings → vectors close together.

Example idea:

```text
"for loop"  ≈  "iterate with for"
"for loop"  ≠  "HTML forms"
```

EduCoach embedding model: `sentence-transformers/all-MiniLM-L6-v2`

### 4. Vector database (Chroma)
Stores vectors + original text, and finds nearest neighbors fast.

Query: embed question → find closest lesson chunks.

### 5. Retrieval (Top-K)
Return the K most similar chunks (EduCoach: K=3).

### 6. Augmented generation
Prompt the LLM like:

```text
Use ONLY the context below.
If missing, say you don't know.

Context:
[chunk 1]
[chunk 2]
[chunk 3]

Question: ...
```

### 7. Hallucinations
When the LLM invents facts.  
RAG reduces this by grounding answers in retrieved docs (not perfect, but much better).

---

## Proposed course (watch this order)

### Track A — Understand the idea (Day 1, ~1h)

| # | Video | Why watch | Length vibe |
|---|-------|-----------|-------------|
| 1 | [What is RAG? Retrieval-Augmented Generation Explained](https://www.youtube.com/watch?v=KNvkUH50xXM) | Clearest beginner “find first, then generate” intro | Short |
| 2 | [Is RAG Still Needed? (IBM Technology)](https://www.youtube.com/watch?v=UabBYexBD4k) | RAG vs long context; when RAG still wins | Short |
| 3 | [Building a RAG app from scratch (Santiago / LangChain style)](https://www.youtube.com/watch?v=BrsocJb-fAo) | See end-to-end flow once in code | Medium |

**Checkpoint after Track A**  
Explain out loud:

1. What RAG means in one sentence  
2. Difference between retrieval and generation  
3. Why EduCoach Concept Tutor needs it  

---

### Track B — Deepen the building blocks (Day 2, ~2–3h)

Watch these concepts one by one:

#### B1. Embeddings
- Search/watch: **“Word embeddings” / “Sentence embeddings explained”**  
  Good practical companion while coding later: parts of Krish Naik RAG course below.

What to learn:
- text → vector
- semantic similarity
- cosine similarity intuition

#### B2. Chunking
- Covered inside both major RAG courses below
- Extra reading (optional): [IBM chunking strategies for RAG](https://www.ibm.com/think/tutorials/chunking-strategies-for-rag-with-langchain-watsonx-ai)

What to learn:
- why split docs
- chunk size / overlap trade-off

#### B3. Vector DB / Chroma
- Covered in Krish Naik + freeCodeCamp RAG courses
- Official quickstart later: https://docs.trychroma.com/docs/overview/getting-started

What to learn:
- store embeddings
- query nearest neighbors
- persistence on disk (`vector_db/`)

---

### Track C — Full courses (pick ONE main + skim the other)

#### Option 1 (recommended main course)
**Krish Naik — Complete RAG Crash Course (~2h)**  
[https://www.youtube.com/watch?v=o126p1QN_RI](https://www.youtube.com/watch?v=o126p1QN_RI)

Best for you because:
- beginner-friendly
- ingestion → retrieval → generation
- chunking strategy discussion
- practical LangChain pipeline

#### Option 2 (deeper / advanced, from a LangChain engineer)
**freeCodeCamp — Learn RAG From Scratch (~2.5h)**  
[https://www.youtube.com/watch?v=sVcwVQRHIc8](https://www.youtube.com/watch?v=sVcwVQRHIc8)

Best later because:
- more advanced techniques (multi-query, fusion, routing…)
- excellent conceptual depth
- more than EduCoach PoC needs at first

**Suggestion:**  
Do Krish fully now. Keep freeCodeCamp for after Phase 3 works.

---

## 3-day study plan (practical)

### Day 1 — Mental model
- Watch Track A videos 1–3
- Draw the EduCoach RAG diagram on paper
- Write 5 bullet notes in your own words

### Day 2 — Pipeline details
- Watch Krish Naik RAG course (at least first half: indexing + retrieval)
- Pause and map each part to EduCoach files:
  - `src/rag/ingest.py`
  - `src/rag/retrieval.py`
  - `vector_db/`
  - Concept Tutor agent

### Day 3 — Generation + quality
- Finish Krish course (generation / prompting)
- Watch IBM “Is RAG still needed?” again if fuzzy
- Answer the self-check below
- Then start Phase 3 coding with me

---

## How this maps to EduCoach Phase 3

| RAG idea | Your future code |
|----------|------------------|
| Load docs | `data/raw/` lesson files |
| Chunk | `RecursiveCharacterTextSplitter(500, 50)` |
| Embed | `all-MiniLM-L6-v2` |
| Store | Chroma in `vector_db/` |
| Retrieve Top-K | `retrieval.py` |
| Generate with context | Concept Tutor prompt + Ollama |
| Cite source | “According to Day X…” |

---

## Self-check (must pass before Phase 3)

Answer without looking:

1. What does RAG stand for?
2. What problem does RAG solve that a raw LLM has?
3. What is an embedding in one sentence?
4. Why do we chunk documents?
5. What does Chroma store?
6. What is Top-K retrieval?
7. In EduCoach, which agent uses RAG?
8. Why cite the day/source in answers?

If you can answer all 8, you’re ready to code Phase 3.

---

## Mini glossary

| Term | Meaning |
|------|---------|
| **LLM** | Large Language Model (e.g. Llama via Ollama) |
| **Prompt** | Text instructions + question sent to the LLM |
| **Context** | Retrieved chunks added into the prompt |
| **Hallucination** | Confident but false answer |
| **Semantic search** | Search by meaning, not exact keywords |
| **Vector** | List of numbers representing meaning |
| **Retriever** | Component that finds relevant chunks |
| **Ingestion / Indexing** | Offline pipeline that prepares the vector DB |

---

## Do / Don’t for EduCoach RAG

### Do
- Ground answers in retrieved lesson text
- Return “I don’t know from today’s materials” if context is weak
- Cite day/topic
- Keep chunks reasonably small

### Don’t
- Let the tutor invent curriculum content
- Dump entire documents into every prompt
- Confuse RAG with fine-tuning (RAG does **not** retrain the LLM)
- Expect perfect answers from tiny local models without good retrieval

---

## Optional reading (short)

- AWS plain definition: https://aws.amazon.com/what-is/retrieval-augmented-generation/  
- IBM overview: https://www.ibm.com/think/topics/retrieval-augmented-generation  
- LangChain RAG docs: https://docs.langchain.com/oss/python/langchain/rag  

---

## When you’re ready

Message me with:

1. Your 1-sentence definition of RAG  
2. Which videos you finished  
3. Any concept that still feels fuzzy  

Then we start **Phase 3 — RAG implementation** for EduCoach.
