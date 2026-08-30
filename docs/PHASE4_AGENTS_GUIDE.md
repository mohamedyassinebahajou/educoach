# Phase 4 — Multi-Agents Guide (EduCoach AI)

**Project:** EduCoach AI  
**Goal:** Wire a LangGraph workflow: guardrails → supervisor → tutor/helper → silent ML analyzer, with short-term memory and local Ollama.  
**You write the code.** This is the roadmap. Detailed typing instructions: [`PHASE4_IMPLEMENTATION.md`](PHASE4_IMPLEMENTATION.md).

Concepts refresh: [`PHASE4_CONCEPTS_COURSE.md`](PHASE4_CONCEPTS_COURSE.md)

---

## 1. What Phase 4 delivers

```text
Student message + student_id (+ optional ML features)
        │
        ▼
┌───────────────────┐
│ Guardrails        │  reject dangerous / injection attempts
└─────────┬─────────┘
          ▼
┌───────────────────┐
│ Short-term memory │  last 5 turns for this student
└─────────┬─────────┘
          ▼
┌───────────────────┐
│ Supervisor        │  route = tutor | helper
└─────┬─────────────┘
      ├─ theory ──▶ Concept Tutor ──▶ RAG + Ollama
      └─ code   ──▶ Code Helper  ──▶ hints only + Ollama
          │
          ▼
┌───────────────────┐
│ Performance       │  silent RF predict → at_risk flag
│ Analyzer          │  coach_alert (coach only — NOT in student reply)
└─────────┬─────────┘
          ▼
     Student reply unchanged + coach_alert side channel
```

### In / Out of scope

| In Phase 4 | Later (Phase 5+) |
|------------|------------------|
| LangGraph graph + 4 agents | FastAPI `/chat` |
| Ollama answers | Streamlit UI |
| Guardrails + short-term memory | Long-term DB memory |
| Minimal `src/ml/predict.py` | Polished coach dashboard |
| CLI smoke tests | Pytest suite polish |

---

## 2. Files you will create

| File | Role |
|------|------|
| `src/agents/llm.py` | Shared ChatOllama factory |
| `src/agents/state.py` | LangGraph shared state |
| `src/agents/concept_tutor.py` | RAG + theory answers |
| `src/agents/code_helper.py` | Hint-only coding help |
| `src/agents/performance_analyzer.py` | Silent ML risk check |
| `src/agents/orchestrator.py` | Graph + routing + public `chat()` |
| `src/memory/short_term.py` | Last N turns per student |
| `src/guardrails/input_validator.py` | Block dangerous patterns |
| `src/guardrails/prompt_injection.py` | Detect jailbreak attempts |
| `src/ml/predict.py` | Load RF + predict score / at-risk |

Exact names match the CDC + learning guide (Orchestrator, Concept Tutor, Exercise Helper, Performance Predictor).

---

## 3. Build order (follow this)

| Step | What | Why this order |
|------|------|----------------|
| **0** | Ollama up + `langchain-ollama` | Everything LLM-related depends on it |
| **1** | Guardrails | Cheap, no LLM, easy to unit-test |
| **2** | Short-term memory | Pure Python dict |
| **3** | `predict.py` | Analyzer needs it |
| **4** | `llm.py` + `state.py` | Shared plumbing |
| **5** | Concept Tutor | Reuses Phase 3 retrieval |
| **6** | Code Helper | Same LLM pattern, stricter prompt |
| **7** | Performance Analyzer | Uses `predict.py` |
| **8** | Orchestrator graph | Ties all nodes together |
| **9** | Smoke tests | Theory / code / injection / at-risk |

Do **not** start with the full graph. Build leaves first, then wire them.

---

## 4. Prerequisites

```bash
cd /home/ycode/Projet-FR-IA
source .venv/bin/activate
pip install -r requirements.txt

# Local LLM
ollama serve          # if not already running
ollama pull llama3.2:3b
ollama list           # must show llama3.2:3b
```

Also confirm Phase 3 artifacts exist:

```bash
ls vector_db/
ls models/random_forest.pkl
python -m src.rag.retrieval --query "What is a for loop?"
```

`.env` must include (already in `.env.example`):

| Variable | Typical value |
|----------|----------------|
| `OLLAMA_HOST` | `http://localhost:11434` |
| `OLLAMA_MODEL` | `llama3.2:3b` |
| `SHORT_TERM_MEMORY_TURNS` | `5` |
| `MODEL_PATH` | `models/random_forest.pkl` |
| `AT_RISK_THRESHOLD` | `10.0` |
| `VECTOR_DB_PATH` | `vector_db` |

---

## 5. Agent contracts (memorize)

| Agent | Speaks to student? | Must |
|-------|--------------------|------|
| **Supervisor** | No (routing only) | Choose `tutor` or `helper` |
| **Concept Tutor** | Yes | Answer from RAG context; cite Day X |
| **Code Helper** | Yes | Hints only — **never** full solutions |
| **Performance Analyzer** | No (coach side channel) | Fill `predicted_score` / `at_risk` / `coach_alert`; never alter student reply |

---

## 6. Definition of Done

- [ ] Ollama answers a simple prompt from Python (`ChatOllama`)
- [ ] Guardrails block `os.system` / `eval(` and “ignore previous instructions”
- [ ] Short-term memory keeps last 5 turns per `student_id`
- [ ] Tutor answers a theory question using retrieved chunks
- [ ] Helper refuses to dump a full solution
- [ ] Analyzer sets `at_risk` from the RF model when features are provided
- [ ] `orchestrator.chat(...)` runs the full graph end-to-end
- [ ] You can explain State / Node / Edge / conditional routing in your own words

---

## 7. How to work with me

1. Open [`PHASE4_IMPLEMENTATION.md`](PHASE4_IMPLEMENTATION.md)
2. Implement **one step**, run its verification command
3. Paste output / errors here if stuck
4. Only then move to the next step

Avoid pasting the whole guide into a file blindly. Type and understand each section.
