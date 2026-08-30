# EduCoach AI — Learning Guide (You Build, I Guide)

> Goal: you implement each piece yourself. I explain concepts, give checklists, and review your code.  
> Status: **Scaffold + synthetic data done** → next = understand data (EDA), then ML.

---

## How we work

1. I explain **why** this step exists and **what** to build.
2. You write the code (notebooks / scripts).
3. You paste results or open a PR / show files — I review and unblock.
4. We only move on when the step’s **Definition of Done** is met.

Avoid copy-pasting huge blocks from me. Prefer: ask a question → try → ask for a hint.

---

## Big picture (keep this map in your head)

```text
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
│ Synthetic   │────▶│ ML model     │────▶│ Performance     │
│ data (CSV)  │     │ (RF score)   │     │ Analyzer agent  │
└─────────────┘     └──────────────┘     └────────┬────────┘
                                                   │ silent risk
┌─────────────┐     ┌──────────────┐     ┌────────▼────────┐
│ Lesson docs │────▶│ RAG (Chroma) │────▶│ Concept Tutor   │
└─────────────┘     └──────────────┘     └────────┬────────┘
                                                   │
                    ┌──────────────┐     ┌────────▼────────┐
                    │ Code Helper  │◀────│ Supervisor      │◀── Student chat
                    └──────────────┘     │ (routes + mem)  │
                                         └────────┬────────┘
                                                  │
                                         FastAPI + Streamlit
```

Two “brains”:
- **ML brain**: numbers → “will this student fail tonight?”
- **LLM brain**: text → “explain the concept / give a hint” (never full solution)

---

## Roadmap (phases)

| Phase | You do | Why it matters |
|-------|--------|----------------|
| **0** ✅ | Scaffold, Docker, `generate_data.py` | Project skeleton |
| **1** ← now | EDA notebook | Know the data before modeling |
| **2** | Train RF + baseline, save `.pkl` | Obligatory Bloc 1 |
| **2.5** | RAG theory course (before coding) | Understand retrieval before Phase 3 |
| **3** ✅ | Fake lesson docs + RAG ingest | Tutor needs a knowledge base |
| **4** ✅ | 4 LangGraph agents + guardrails | Obligatory Bloc 2 |
| **5** ✅ | FastAPI + Streamlit | Coach dashboard + student chat |
| **6** ← now | Docker polish, tests, README | Demo-ready package |
| **6** | Docker end-to-end + README demo | Soutenance-ready |

---

## Phase 1 — EDA (your next mission)

**Full step-by-step guide (methods, docs, expected outputs):**  
→ [`docs/PHASE1_EDA_GUIDE.md`](docs/PHASE1_EDA_GUIDE.md)

**Concept deep-dive + YouTube videos:**  
→ [`docs/PHASE1_CONCEPTS_EXPLAINED.md`](docs/PHASE1_CONCEPTS_EXPLAINED.md)

### Why (short)
Know the data before modeling: score distribution, at-risk rate, feature correlations, data quality.

### Create
`notebooks/01_EDA_and_Data_Gen.ipynb` — follow the guide above cell by cell.

### Definition of Done
- [ ] Notebook runs top-to-bottom without error
- [ ] You can explain in one sentence: *who is at risk and why the formula pushes them there*
- [ ] You note if ~50% at-risk is too high for a realistic demo (we can rebalance later)

---

## Phase 2 — ML (full guide)

**Full step-by-step guide (training, metrics, save pipeline):**  
→ [`docs/PHASE2_ML_GUIDE.md`](docs/PHASE2_ML_GUIDE.md)

**Concept deep-dive + YouTube videos:**  
→ [`docs/PHASE2_CONCEPTS_EXPLAINED.md`](docs/PHASE2_CONCEPTS_EXPLAINED.md)

### Create
`notebooks/02_Model_Training.ipynb`

### Goal
Train a baseline `LinearRegression`, then a tuned `RandomForestRegressor`, derive the `at_risk` flag from predicted score `< 10`, and save the best full pipeline to `models/random_forest.pkl`.

### Success targets
- RMSE roughly `< 2.5`
- At-risk Recall `> 75%`

---

## Phase 2.5 — Understand RAG (before coding Phase 3)

**Full beginner course + YouTube watchlist:**  
→ [`docs/RAG_CRASH_COURSE.md`](docs/RAG_CRASH_COURSE.md)

Do this before Phase 3 if RAG is new to you.

---

## Phase 3 — RAG implementation (full guide)

**Full step-by-step guide (lesson docs, ingest, retrieval, tests):**  
→ [`docs/PHASE3_RAG_GUIDE.md`](docs/PHASE3_RAG_GUIDE.md)

### Create
- `data/raw/day01_….md` … `day11_….md`
- `src/rag/ingest.py`
- `src/rag/retrieval.py`

### Implementation guides
- Ingest: [`docs/PHASE3_INGEST_IMPLEMENTATION.md`](docs/PHASE3_INGEST_IMPLEMENTATION.md)
- Retrieval: [`docs/PHASE3_RETRIEVAL_IMPLEMENTATION.md`](docs/PHASE3_RETRIEVAL_IMPLEMENTATION.md)
- RAG test notebook: [`docs/PHASE3_RAG_TEST_NOTEBOOK.md`](docs/PHASE3_RAG_TEST_NOTEBOOK.md)
- Theory ↔ your code: [`docs/PHASE3_INGEST_RETRIEVAL_UNDERSTANDING.md`](docs/PHASE3_INGEST_RETRIEVAL_UNDERSTANDING.md)

### Goal
Build Chroma knowledge base from 11 SAS lessons and retrieve Top-K=3 relevant chunks for a question.

### Definition of Done
- [ ] 11 lesson files exist
- [ ] Ingest builds `vector_db/`
- [ ] Retrieval returns relevant chunks for test queries
- [ ] You can explain load → chunk → embed → store → retrieve

---

## Phase 4 — Multi-Agents (understand first, then code)

**Concept course + YouTube watchlist:**  
→ [`docs/PHASE4_CONCEPTS_COURSE.md`](docs/PHASE4_CONCEPTS_COURSE.md)

**Roadmap:** [`docs/PHASE4_AGENTS_GUIDE.md`](docs/PHASE4_AGENTS_GUIDE.md)  
**Step-by-step coding:** [`docs/PHASE4_IMPLEMENTATION.md`](docs/PHASE4_IMPLEMENTATION.md)

### Goal
Supervisor routes to Concept Tutor (RAG), Code Helper (hints only), and silent Performance Analyzer (ML), with memory + guardrails.

### Create (follow implementation guide order)
- `src/guardrails/input_validator.py`, `prompt_injection.py`
- `src/memory/short_term.py`
- `src/ml/predict.py`
- `src/agents/llm.py`, `state.py`, `concept_tutor.py`, `code_helper.py`, `performance_analyzer.py`, `orchestrator.py`
- Ollama `llama3.2:3b` via `langchain-ollama`

### Definition of Done
- [ ] Full graph runs via `python -m src.agents.orchestrator`
- [ ] Tutor / helper / block / at-risk paths verified
- [ ] You can explain State / Node / Edge / supervisor routing

---

## Phase 5 — FastAPI + Streamlit

**Roadmap:** [`docs/PHASE5_API_UI_GUIDE.md`](docs/PHASE5_API_UI_GUIDE.md)  
**Step-by-step coding:** [`docs/PHASE5_IMPLEMENTATION.md`](docs/PHASE5_IMPLEMENTATION.md)

### Goal
Expose agents + ML through HTTP, then build Coach Dashboard + Student Chat.

### Create
- `src/api/schemas.py`, `routes.py`, `main.py`
- `src/ui/streamlit_app.py`

### Definition of Done
- [ ] Swagger `/chat` + `/predict_today` (+ optional `/coach/risk_board`)
- [ ] Coach tab ranks 24 students with 🟢/🔴
- [ ] Chat tab works; `coach_alert` coach-only

---

## Phase 6 — Finalization (Docker, tests, README, demo)

**Roadmap:** [`docs/PHASE6_FINAL_GUIDE.md`](docs/PHASE6_FINAL_GUIDE.md)  
**Step-by-step coding:** [`docs/PHASE6_IMPLEMENTATION.md`](docs/PHASE6_IMPLEMENTATION.md)

### Goal
Make the PoC demo-ready for soutenance.

### Create / update
- Pytest (`tests/…`)
- Docker polish (+ optional Gemini compose overlay)
- README rewrite
- `docs/DEMO_SCRIPT.md`, `docs/SLIDES_OUTLINE.md`, `docs/FINAL_CHECKLIST.md`
- Bonus: `.github/workflows/ci.yml`

### Definition of Done
- [ ] `pytest -q` green
- [ ] Demo stack runs (Docker or local)
- [ ] README + slides + demo script ready
- [ ] CDC checklist signed off

---

## Soutenance — theory + Q&A drill

**Complete theory & practice curriculum (all phases, videos, examples):**  
→ [`docs/COMPLETE_CURRICULUM.md`](docs/COMPLETE_CURRICULUM.md)

**Oral Q&A drill:**  
→ [`docs/SOUTENANCE_ORAL_PREP.md`](docs/SOUTENANCE_ORAL_PREP.md)

**Beamer slides:** [`docs/educoach_soutenance.tex`](docs/educoach_soutenance.tex)

---

## Concepts cheat-sheet (read when stuck)

| Term | Plain meaning |
|------|----------------|
| **Feature** | Input column the model uses (e.g. hints_used) |
| **Target** | What we predict (today_eval_score) |
| **RMSE** | Average size of prediction error (same units as score /20) |
| **Recall (at-risk)** | Of students who *really* fail, % we correctly flag — critical for the coach |
| **Baseline** | Dumb/simple model — proves RF is worth it |
| **RAG** | Retrieve lesson text, then ask the LLM to answer *only* from that |
| **LangGraph** | State machine: Supervisor decides which agent runs next |
| **Guardrail** | Hard rules so the bot can’t dump full solutions / get jailbroken |

---

## When you’re stuck

Ask me things like:
- “Does my correlation plot look sane?”
- “Should topic be OneHot or Label encoded?”
- “My RMSE is 4 — what’s wrong?”

Paste errors / short code snippets; I’ll debug *with* you, not *for* you.
