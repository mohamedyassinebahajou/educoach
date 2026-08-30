# EduCoach AI — Complete Theory & Practice Curriculum

**Purpose:** One place to **fully understand** every phase: theory, how it is used in EduCoach, worked examples, video references, and self-checks.  
**Audience:** You before the soutenance (and anytime you need to re-explain the project).  
**Companion oral Q&A:** [`SOUTENANCE_ORAL_PREP.md`](SOUTENANCE_ORAL_PREP.md)  
**Slides:** [`educoach_soutenance.tex`](educoach_soutenance.tex)

---

## How to study this document

For **each phase** below:

1. Read **Why this phase exists**  
2. Watch the **Videos** (in order)  
3. Study **Theory** + **EduCoach practice**  
4. Work through the **Example**  
5. Answer the **Self-check** out loud  

Do **one phase per sitting**. Do not binge.

### Master map of the project

```text
Phase 0  Scaffold + synthetic panel data
Phase 1  EDA — understand data before modeling
Phase 2  ML — predict evening score + at-risk
Phase 3  RAG — lesson chunks in Chroma
Phase 4  Agents — LangGraph + guardrails + memory + LLM
Phase 5  API + UI — FastAPI + Streamlit
Phase 6  Delivery — Docker, tests, README, demo
```

Two brains forever:

| Brain | Job |
|-------|-----|
| **ML** | Numbers → “will this student fail tonight?” |
| **LLM agents** | Text → teach / hint (never full solution) |

---

# Phase 0 — Scaffold & synthetic data

## Why this phase exists
Without a clear repo layout and a dataset, nothing else can run. Synthetic data lets you build a full hybrid PoC without private student logs.

## Videos
| Watch | Link | Focus |
|-------|------|--------|
| Git & project structure (any short) | Search: `git project structure python package` | `src/` packages |
| Synthetic data idea | Search: `synthetic data machine learning why` | Why generate data |
| Panel / longitudinal data (optional) | Search: `panel data explained` | Same entity over time |

## Theory

### Proof of Concept (PoC)
A **PoC** proves that architecture and ideas work end-to-end. It is not a production SaaS.

### Synthetic vs real data
| | Synthetic | Real (e.g. OULAD later) |
|--|-----------|-------------------------|
| Control | Full (seed, formula) | Limited |
| Privacy | Safe | Must anonymize / license |
| Realism | Approximate | Higher |
| Use in EduCoach | Phases 0–6 PoC | Future improvement |

### Panel (longitudinal) data
Each **student** appears on multiple **days**.  
Day `d`’s `previous_eval_score` = day `d-1`’s `today_eval_score`.

That is **time-linked**, even without calendar timestamps.

### Project layout (practical concept)
```text
src/ml          → predict
src/rag         → ingest / retrieve
src/agents      → LangGraph
src/guardrails  → safety
src/memory      → short-term chat
src/api         → FastAPI
src/ui          → Streamlit
data/raw        → lessons
data/processed  → CSV
models/         → .pkl
vector_db/      → Chroma
```

## EduCoach practice
- `data/synthetic/generate_data.py` → `student_performance.csv` (24×11 = 264 rows)
- Formula idea: mix of previous score + success rate + noise − penalty if many hints and few solves
- `student_id` is for the product, **not** for ML features later

## Worked example
Student 1:

| day | previous | today (simplified story) |
|-----|----------|---------------------------|
| 1 | 12.9 | 16.2 |
| 2 | 16.2 | 6.5 |
| 3 | 6.5 | 11.3 |

Day 3 starts from yesterday’s 6.5 — the model can use that lag.

## Self-check
1. What is a PoC?  
2. Why is the CSV time-linked?  
3. Why generate data instead of inventing random independent rows?

---

# Phase 1 — EDA (Exploratory Data Analysis)

## Why this phase exists
Modeling blind is guessing. EDA tells you distributions, correlations, data quality, and whether `at_risk` is usable.

## Videos
| Watch | Link | Focus |
|-------|------|--------|
| freeCodeCamp EDA / Pandas | Search YouTube: `freeCodeCamp pandas data analysis` | DataFrames, describe, plots |
| Correlation explained | Search: `correlation vs causation statistics` | What corr can/cannot say |
| Class imbalance | Search: `class imbalance machine learning` | Why accuracy can lie |

Deeper text: [`PHASE1_CONCEPTS_EXPLAINED.md`](PHASE1_CONCEPTS_EXPLAINED.md) · guide: [`PHASE1_EDA_GUIDE.md`](PHASE1_EDA_GUIDE.md)

## Theory

### What EDA answers
- What does `today_eval_score` look like?  
- How many students are `at_risk`?  
- Which features move with the score?  
- Missing values / outliers?  
- Is `topic` usable as a category?

### Target vs features
- **Target (y):** `today_eval_score`  
- **Derived label:** `at_risk = (score < 10)` — coach view  
- **Features (X):** activity + `previous_eval_score` + `day`/`topic`  
- **Never in X:** `today_eval_score`, `at_risk` → **leakage**

### Correlation (intuition)
If `previous_eval_score` rises when `today_eval_score` rises → positive correlation.  
High correlation suggests a useful predictor, not proof of causation.

### Class balance
If 95% are “ok”, a dumb model saying “everyone ok” gets 95% accuracy but **0% recall** on at-risk. Coach needs **recall**.

## EduCoach practice
Notebook `01_EDA_and_Data_Gen.ipynb`:
- histograms of scores  
- value counts for `at_risk`  
- correlation heatmap  
- scatter: success rate / hints vs score  

Insights you should be able to say:
- previous score is a strong signal  
- many hints tend to go with weaker scores  
- `day` ≈ `topic` (1:1 mapping)

## Worked example
```text
Student with previous=5, solved=1/5, hints=10
→ likely low today_eval_score → at_risk True

Student with previous=15, solved=4/5, hints=1
→ likely safe
```

## Self-check
1. Define leakage with an EduCoach example.  
2. Why care about recall more than accuracy here?  
3. Name two EDA plots you would show a jury.

---

# Phase 2 — Machine Learning

## Why this phase exists
CDC Bloc 1: predict evening performance and flag at-risk students early.

## Videos
| Watch | Link | Focus |
|-------|------|--------|
| StatQuest Random Forest | Search: `StatQuest random forests` | Trees + bagging intuition |
| Train/test & overfitting | Search: `StatQuest cross validation` or `overfitting explained` | Generalization |
| sklearn Pipeline | Search: `scikit-learn pipeline ColumnTransformer` | Production-safe preprocess |
| Classification metrics | Search: `precision recall explained StatQuest` | Recall for at-risk |

Deeper text: [`PHASE2_CONCEPTS_EXPLAINED.md`](PHASE2_CONCEPTS_EXPLAINED.md) · guide: [`PHASE2_ML_GUIDE.md`](PHASE2_ML_GUIDE.md)

## Theory

### Regression then threshold
1. Model predicts continuous **score /20**  
2. Business rule: `at_risk = predicted_score < 10`  

Why not only classification? The dashboard needs ranking and nuance (“8.1 vs 3.2”).

### Baseline
A **baseline** (Linear Regression) is the “simple competitor”. If RF cannot beat it, complexity is unjustified.

### Random Forest (intuition)
- Many decision trees vote/average  
- Each tree sees a random subset of data/features  
- Captures non-linear interactions (e.g. hints × solved)  
- Needs little feature scaling compared to many other models  

### Pipeline + ColumnTransformer
```text
Raw row
  → impute numeric
  → One-Hot encode topic
  → RandomForest
```
Saving the **whole Pipeline** in `random_forest.pkl` means predict-time uses the **same** transforms as training.

### Metrics (say them correctly)

| Metric | Meaning | EduCoach priority |
|--------|---------|-------------------|
| **RMSE** | Typical size of score error | Soft CDC &lt; 2.5 |
| **R²** | Variance explained | Higher better |
| **Recall (at-risk)** | Of true struggling students, % we flag | **Critical** (&gt;75% CDC) |
| **Precision** | Of flagged students, % truly at-risk | Secondary |

### Your results (memorize)

| | Baseline | RF |
|--|----------|-----|
| RMSE | ≈ 2.73 | ≈ 2.65 |
| R² | ≈ 0.80 | ≈ 0.81 |
| At-risk recall | ≈ 0.96 | **1.00** |

Feature importance (approx.): **solved** & **previous_score** dominate; `day` is weak.

### Why not put `student_id` in X?
Model would memorize identities, fail on new IDs, and learn “who” instead of “behavior”.

## EduCoach practice
- Train in notebook `02_Model_Training.ipynb`  
- Save `models/random_forest.pkl` + `model_metrics.json`  
- Runtime use: `src/ml/predict.py` → `predict_student(features)`

## Worked example
```python
features = {
  "day": 3, "topic": "loops",
  "exercises_attempted": 5,
  "exercises_solved_correctly": 1,
  "hints_used": 10,
  "time_spent_minutes": 90,
  "previous_eval_score": 5.0,
}
# → predicted_score ≈ 3.81, at_risk True
```

## Self-check
1. Why Pipeline?  
2. RMSE 2.65 vs target 2.5 — how do you defend it?  
3. Name the two most important features.

---

# Phase 3 — RAG (Retrieval-Augmented Generation)

## Why this phase exists
The Concept Tutor must teach **your** SAS lessons, not generic internet Python.

## Videos
| Watch | Link | Focus |
|-------|------|--------|
| RAG from scratch | [freeCodeCamp RAG](https://www.youtube.com/watch?v=sVcwVQRHIc8) | Full mental model |
| Embeddings intuition | Search: `embeddings explained visually` | Vectors / similarity |
| LangChain + Chroma intro | Search: `LangChain Chroma tutorial` | Practical stack |

Deeper text: [`RAG_CRASH_COURSE.md`](RAG_CRASH_COURSE.md) · [`PHASE3_INGEST_RETRIEVAL_UNDERSTANDING.md`](PHASE3_INGEST_RETRIEVAL_UNDERSTANDING.md)

## Theory

### Without RAG vs with RAG
```text
Without: LLM answers from training memory → may hallucinate / miss your Day 3 wording
With:    retrieve Day 3 chunks → LLM answers using those chunks → cite Day 3
```

### Core pipeline
```text
Documents → Chunk → Embed → Vector DB
                              ↑
Question → Embed → Similarity search Top-K → Context → (Phase 4) LLM
```

### Concepts
| Concept | Meaning | EduCoach setting |
|---------|---------|------------------|
| **Chunk** | Small text piece | size 500, overlap 50 |
| **Embedding** | Text → vector | MiniLM CPU |
| **Similarity** | Close vectors ≈ related meaning | cosine / default Chroma |
| **Top-K** | Keep K best chunks | K=3 |
| **Ingest** | Build index offline | `ingest.py --rebuild` |
| **Retrieve** | Query index online | `retrieval.py` |

### Why enrich lessons with code + output?
If chunks lack examples, the Tutor truthfully says “context insufficient”. After enrichment (~131 chunks), it can show:

```python
words = ["cat", "window", "defenestrate"]
for w in words:
    print(w, len(w))
```
Output: `cat 3` / `window 6` / …

## EduCoach practice
- `data/raw/day01_….md` … `day11_….md`  
- `src/rag/ingest.py` → `vector_db/`  
- `src/rag/retrieval.py` → `retrieve_context` / `format_context`  

## Worked example
Query: “Show a for loop example with output”  
→ Top chunks from `day03_loops.md` including Example 1  
→ Later Tutor pastes code + step-by-step + output  

## Self-check
1. Formula of RAG in one sentence.  
2. Ingest vs retrieve.  
3. What happens if Top-K=1 and the wrong chunk wins?

---

# Phase 4 — Multi-agents, LangGraph, memory, guardrails, LLM

## Why this phase exists
CDC Bloc 2: specialized agents collaborating; safety; short memory; connect ML + RAG.

## Videos
| Watch | Link | Focus |
|-------|------|--------|
| Ollama + LangChain agents | [Beginners AI Agents](https://www.youtube.com/watch?v=aE7UdyQubD0) | Local agent idea |
| LangGraph crash course | [Sam Witteveen](https://www.youtube.com/watch?v=PqS1kib7RTw) | State / nodes / edges / supervisor |
| Multi-agent article | [freeCodeCamp LangGraph](https://www.freecodecamp.org/news/how-to-build-your-first-multi-agent-ai-system-in-python-and-langgraph/) | Written companion |
| Guardrails / security | [LangChain Guardrails](https://www.youtube.com/watch?v=7GCZWK-AG0k) | Input/output checks |
| Prompt injection | [OWASP cheat sheet](https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html) | Threat model |

Deeper text: [`PHASE4_CONCEPTS_COURSE.md`](PHASE4_CONCEPTS_COURSE.md) · [`PHASE4_ONLINE_LLM.md`](PHASE4_ONLINE_LLM.md)

## Theory

### Agent
```text
Agent = Role prompt + LLM + optional tools
```

### Your four agents
| Agent | Speaks to student? | Job |
|-------|--------------------|-----|
| Supervisor | No | Route tutor / helper |
| Concept Tutor | Yes | RAG + theory |
| Code Helper | Yes | Hints only |
| Performance Analyzer | No (coach channel) | RF → `coach_alert` |

### LangGraph vocabulary
| Term | Meaning | Example |
|------|---------|---------|
| **State** | Shared clipboard | `message`, `route`, `reply`, `coach_alert` |
| **Node** | Function updating state | `guardrails_node` |
| **Edge** | Always next | tutor → analyzer |
| **Conditional edge** | Choose next | supervisor → tutor \| helper \| blocked |

### Graph (practical)
```text
START → guardrails → supervisor
          ├─ tutor ─┐
          ├─ helper ┼→ analyzer → finalize → END
          └─ blocked ──────────→ finalize → END
```

### Memory
Short-term = last ~5 turns (≈ 10 messages) per `student_id` in RAM.  
Lost on process restart — OK for PoC.

### Guardrails (defense in depth)
1. Regex input filter (`eval`, `os.system`, …)  
2. Injection detector (“ignore previous instructions”, “full solution”)  
3. Strict system prompts (Helper never dumps full code)  

### LLM provider switch
```text
get_llm() reads LLM_PROVIDER
  gemini → ChatGoogleGenerativeAI (gemini-3.5-flash-lite)
  ollama → ChatOllama
  groq / openai → alternatives
```
**Why Gemini in your setup:** local Ollama froze the PC; architecture unchanged.

### Design choice: coach_alert
At-risk warning goes to **coach**, not into the student chat bubble → coach decides 1:1 or group recap.

## EduCoach practice
- `src/agents/*.py`, `src/memory/short_term.py`, `src/guardrails/*`  
- Entry: `orchestrator.chat(student_id, message, features?)`  

## Worked example
```text
Message: "What is a for loop?"
→ guardrails OK → route=tutor → retrieve Day 3 → Gemini answer with code/output
→ no features → no coach_alert

Message: "while True never stops" + weak features
→ route=helper → hints
→ analyzer → coach_alert for coach dashboard
```

## Self-check
1. Draw the graph from memory.  
2. Why keyword supervisor first?  
3. Why coach_alert ≠ student reply?

---

# Phase 5 — FastAPI + Streamlit

## Why this phase exists
Expose brains through a stable API and a coach/student UI for the demo.

## Videos
| Watch | Link | Focus |
|-------|------|--------|
| FastAPI full course | [freeCodeCamp FastAPI](https://www.youtube.com/watch?v=0sOvCWFmrtA) | Routes, Pydantic, Docker chapters |
| Streamlit + FastAPI pattern | [freeCodeCamp article](https://www.freecodecamp.org/news/how-to-serve-a-multi-user-ai-agent-with-fastapi-and-streamlit/) | UI as thin client |
| NVIDIA blog (ML + both) | [Streamlit + FastAPI](https://developer.nvidia.com/blog/how-to-build-an-instant-machine-learning-web-application-with-streamlit-and-fastapi/) | Two-service design |

Guides: [`PHASE5_API_UI_GUIDE.md`](PHASE5_API_UI_GUIDE.md) · [`PHASE5_IMPLEMENTATION.md`](PHASE5_IMPLEMENTATION.md)

## Theory

### Why an API between UI and agents?
| With API | Without (UI imports agents) |
|----------|-----------------------------|
| Swagger testing | Harder to test |
| Reusable by other clients | Locked to Streamlit |
| Clear contracts (Pydantic) | Logic mixed with widgets |
| Same service in Docker | Messy process mgmt |

### FastAPI concepts
- **Route**: URL + method (`POST /chat`)  
- **Pydantic model**: validates JSON  
- **OpenAPI/Swagger**: auto docs at `/docs`  
- **CORS**: allow browser on `:8501` to call `:8000`  

### Streamlit concepts
- Python script → web UI  
- `st.tabs` for Coach vs Student  
- `st.session_state` for chat history  
- `httpx` calls to API  

### Endpoints you must name
| Endpoint | Calls |
|----------|--------|
| `POST /chat` | `orchestrator.chat` |
| `POST /predict_today` | `predict_student` |
| `GET /coach/risk_board` | CSV day slice + RF for 24 students |
| `GET /health` | liveness |

## EduCoach practice
- Coach tab: ranked 🟢/🔴 + bar chart + coach alerts list  
- Student tab: select id 1–24, chat, optional features for alerts  
- Student bubble shows **only** `reply`  

## Worked example
```bash
# Terminal A
uvicorn src.api.main:app --reload --port 8000
# Terminal B
streamlit run src/ui/streamlit_app.py
```
Coach refreshes day 11 → 24 rows.  
Student asks loops question → Tutor answer with Day 3 example.

## Self-check
1. Why CORS?  
2. What breaks if only Streamlit runs?  
3. Where does coach_alert appear in the UI?

---

# Phase 6 — Docker, tests, delivery

## Why this phase exists
Jury must install/run/demo reliably; tests prevent last-minute regressions.

## Videos
| Watch | Link | Focus |
|-------|------|--------|
| Docker Compose section | Inside [FastAPI course](https://www.youtube.com/watch?v=0sOvCWFmrtA) (~13h38+) | Multi-service |
| Pytest intro | Search: `pytest tutorial freecodecamp` | Assertions, collection |
| CI idea (optional) | Search: `GitHub Actions pytest` | Bonus CI |

Guides: [`PHASE6_FINAL_GUIDE.md`](PHASE6_FINAL_GUIDE.md) · [`PHASE6_IMPLEMENTATION.md`](PHASE6_IMPLEMENTATION.md)

## Theory

### Docker
- **Image**: recipe (Dockerfile)  
- **Container**: running instance  
- **Compose**: multi-container app (`api`, `streamlit`, optional `ollama`)  

### Gemini profile
Heavy Ollama optional. Overlay `docker-compose.gemini.yml` runs API+UI with `LLM_PROVIDER=gemini`.

### Pytest
- Tests import `src.*` → need `pytest.ini` with `pythonpath = .`  
- Prefer **offline** tests (predict, guardrails, routing, injection)  
- Avoid requiring Gemini keys in CI for happy-path chat  

### Delivery artifacts
- README (install + demo URLs)  
- Demo script 3–4 min  
- Beamer slides 10–12  
- Checklist CDC  

## EduCoach practice
- `pytest -q` → 12 passed  
- Compose: `api` + `streamlit`  
- Slides: `educoach_soutenance.tex`  

## Self-check
1. What does `pythonpath = .` fix?  
2. Why not call Ollama in every CI job?  
3. Name three demo beats (dashboard / chat / block).

---

# Cross-phase concepts (exam favorites)

## Data leakage
Using information you would not have at prediction time.  
Example: putting `today_eval_score` into X.

## Hybrid AI system
Classical ML (tabular RF) + generative LLM agents + retrieval.  
Each part solves a different failure mode.

## Grounding
Forcing answers to stick to retrieved documents (RAG + prompt rules).

## Defense in depth
Multiple incomplete defenses stacked (filters + prompts + coach-only alerts).

## Separation of concerns
Tutor ≠ Helper ≠ Analyzer ≠ UI ≠ API.

## Real data path (future talking point)
OULAD ≈ at-risk + daily activity; ASSISTments ≈ hints/attempts.  
Map → retrain RF → same agents/UI.

---

# Unified video playlist (copy this)

```text
1) Pandas / EDA overview (freeCodeCamp search)
2) StatQuest — Random Forests
3) StatQuest — Precision/Recall
4) https://www.youtube.com/watch?v=sVcwVQRHIc8          # RAG
5) https://www.youtube.com/watch?v=aE7UdyQubD0          # Agents + Ollama/LC
6) https://www.youtube.com/watch?v=PqS1kib7RTw          # LangGraph
7) https://www.youtube.com/watch?v=7GCZWK-AG0k          # Guardrails
8) https://www.youtube.com/watch?v=0sOvCWFmrtA          # FastAPI (+ Docker chapters)
9) Streamlit+FastAPI article (freeCodeCamp link above)
10) OWASP prompt injection cheat sheet (read)
```

---

# 7-day study plan (recommended)

| Day | Phase focus | Deliverable |
|-----|-------------|-------------|
| 1 | 0 + 1 | Explain panel data + EDA insights |
| 2 | 2 | Recite metrics + feature importances |
| 3 | 3 | Draw RAG pipeline + demo retrieve |
| 4 | 4 | Draw LangGraph + explain coach_alert |
| 5 | 5 | Trace one `/chat` call end-to-end |
| 6 | 6 + slides | Run pytest + rehearse demo script |
| 7 | Full oral | Use [`SOUTENANCE_ORAL_PREP.md`](SOUTENANCE_ORAL_PREP.md) as mock jury |

---

# Where deeper guides live (if you want more)

| Topic | File |
|-------|------|
| EDA deep dive | `PHASE1_CONCEPTS_EXPLAINED.md` |
| ML deep dive | `PHASE2_CONCEPTS_EXPLAINED.md` |
| RAG beginner | `RAG_CRASH_COURSE.md` |
| Ingest/retrieve theory | `PHASE3_INGEST_RETRIEVAL_UNDERSTANDING.md` |
| Agents course | `PHASE4_CONCEPTS_COURSE.md` |
| Online LLM | `PHASE4_ONLINE_LLM.md` |
| Implementation how-tos | `PHASE*_IMPLEMENTATION.md` / `*_GUIDE.md` |
| Oral Q&A | `SOUTENANCE_ORAL_PREP.md` |

---

You now have a **single curriculum spine**. Study phase by phase with videos + examples; then switch to oral prep for pressure questions.
