# EduCoach — Oral Defense Prep (Theory + Q&A)

**Goal:** explain every phase clearly and answer jury questions without notes panic.  
**How to use:** for each phase — read the 60-second pitch, then drill the Q&A out loud.

Related deeper docs (if you need a refresh):
- Phase 1: `PHASE1_CONCEPTS_EXPLAINED.md`
- Phase 2: `PHASE2_CONCEPTS_EXPLAINED.md`
- Phase 3/RAG: `RAG_CRASH_COURSE.md`, `PHASE3_INGEST_RETRIEVAL_UNDERSTANDING.md`
- Phase 4: `PHASE4_CONCEPTS_COURSE.md`

---

# 0. Big picture (memorize this)

EduCoach is a **hybrid system**:

| Brain | Input | Output | Used for |
|-------|-------|--------|----------|
| **ML** | numbers (activity + past score) | predicted score + at-risk | Coach radar |
| **LLM + agents** | text (question) + optional RAG | pedagogical reply | Student help |

**Story for the jury:**  
“By 2 PM I know who may fail tonight; during the day the bot tutors without spoiling solutions; alerts go to **me** (coach), not as shame in the student chat.”

**One diagram to draw on the board:**

```text
CSV → RF → Analyzer (coach_alert)
Lessons → Chroma → Tutor
Student msg → Guardrails → Supervisor → Tutor | Helper → Analyzer → reply
                              UI: Streamlit ← FastAPI
```

---

# Phase 0 — Scaffold & synthetic data

## Theory
- **PoC**: prove architecture, not production scale.
- **Synthetic data**: generated with a known formula so you control correlations and at-risk rate.
- **Panel / longitudinal data**: same student across days; `previous_eval_score(d) = today_eval_score(d-1)`.
- **Why not real data first?** Privacy + no open SAS Python log with your exact schema. Real option later: OULAD (map features).

## 60-second pitch
“We scaffolded the repo (src, Docker, requirements), then generated 24×11=264 rows with a formula linking yesterday’s score to today’s activity, so the ML and dashboard have realistic time-linked data.”

## Likely questions

**Q: Why synthetic data?**  
A: Controlled PoC, reproducible seed, no GDPR issues. Formula encodes the coaching hypothesis (hints↑ + solved↓ → risk↑). We can swap in OULAD with a mapping script.

**Q: Is the data time-linked?**  
A: Yes — panel data. Not calendar timestamps, but day index with lag feature `previous_eval_score`.

**Q: Why 11 days not 20?**  
A: Compact Python track for the PoC; still one topic per day, enough for RAG + ML.

**Q: Why exclude student_id from ML features?**  
A: Avoid memorizing identity; we want behavioral rules that generalize to new students. ID stays for UI/API only.

---

# Phase 1 — EDA

## Theory
- **EDA**: understand distributions, missing values, correlations, class balance **before** modeling.
- **Target**: `today_eval_score` (regression).
- **Derived label**: `at_risk = score < 10` (classification view for the coach).
- **Leakage**: never use the target (or something computed only from the target) as an input feature.
- **Correlation ≠ causation**, but guides which features matter.

## 60-second pitch
“EDA showed previous score strongly tracks today’s score, heavy hint use associates with lower scores, and at-risk is roughly balanced enough to train recall-focused detection.”

## Likely questions

**Q: What did EDA change in your modeling choices?**  
A: Keep `previous_eval_score` and activity features; treat `topic` as categorical (One-Hot); don’t over-trust `day` (redundant with topic).

**Q: What is class imbalance and did you have it?**  
A: When one class dominates (e.g. 95% not at-risk), accuracy lies. We watched **recall** for at-risk. Our synthetic set is not extremely imbalanced.

**Q: Define leakage with an example from your project.**  
A: Putting `at_risk` or `today_eval_score` into X — the model would cheat because those are the thing we’re predicting (or derived from it).

---

# Phase 2 — Machine Learning

## Theory
- **Regression**: predict continuous score /20.
- **Then threshold**: `at_risk if pred < 10` (business rule from CDC).
- **Baseline**: simple model (Linear Regression) to prove RF is worth it.
- **Random Forest**: ensemble of trees; robust, little scaling pain, feature importance.
- **Pipeline + ColumnTransformer**: numeric vs categorical transforms baked with the model → same transform at predict time.
- **Train/test split**: evaluate generalization; fixed `random_seed=42`.
- **Metrics**:
  - **RMSE**: typical error size in score points (lower better).
  - **R²**: variance explained (higher better).
  - **Recall (at-risk)**: of true struggling students, how many we flag — **critical for coach**.
  - **Precision**: of those we flag, how many are truly at-risk (trade-off with recall).

## Your numbers (say them)
| | Baseline LR | RF |
|--|-------------|-----|
| RMSE | ~2.73 | ~2.65 |
| R² | ~0.80 | ~0.81 |
| At-risk recall | ~0.96 | **1.0** |

## 60-second pitch
“We predict evening score with RF in a sklearn Pipeline, beat a linear baseline slightly on RMSE/R², and prioritize at-risk recall — RF reached 100% recall on the test set so the coach doesn’t miss struggling students. RMSE is ~2.65, slightly above the soft CDC 2.5 target, acceptable for PoC.”

## Likely questions

**Q: Why regression then threshold, not pure classification?**  
A: Score gives ranking and nuance for the dashboard; threshold maps to the coach’s binary intervention decision.

**Q: Why Random Forest?**  
A: Non-linear interactions (hints × solved), handles mixed types with preprocessing, stable on small tabular data, importances for explainability.

**Q: Your RMSE > 2.5 — is the project failed?**  
A: Soft target. Recall objective is met. Error ~2.6 points on a /20 scale is usable for early warning; with more real data we can improve.

**Q: What are the most important features?**  
A: Roughly: `exercises_solved_correctly` and `previous_eval_score` dominate; `hints_used` medium; `day` weak (~1%).

**Q: Overfitting?**  
A: We use train/test split, tune with GridSearch constraints (max_depth, min_samples_leaf), compare to baseline. Small n (264) is a limit — another reason to move to OULAD later.

**Q: Why One-Hot for topic?**  
A: Topics are nominal categories, not ordered magnitudes. Label encoding would invent a false order (loops < lists…).

---

# Phase 3 — RAG

## Theory
- **RAG = Retrieval-Augmented Generation**: retrieve relevant text, then generate an answer **grounded** in that text.
- **Why**: small LLMs hallucinate; bootcamp answers must match **your** lessons.
- **Pipeline**: load docs → chunk → embed → store (Chroma) → query embed → similarity Top-K → context for LLM.
- **Chunking**: 500 / overlap 50 — balance context vs precision.
- **Embeddings**: `all-MiniLM-L6-v2` — local, CPU, sentence vectors.
- **Chroma**: local vector DB.
- **Top-K=3**: enough context without flooding a small prompt.

## 60-second pitch
“We turned 11 Markdown lessons into ~131 Chroma chunks. When a student asks about loops, we retrieve the closest chunks (with code+output) and the Tutor answers only from that context, citing Day X.”

## Likely questions

**Q: RAG vs fine-tuning?**  
A: Fine-tuning is heavy and still can drift. RAG updates by editing Markdown + re-ingest — perfect for evolving course material.

**Q: What if retrieval is wrong?**  
A: Tutor may be weak/off-topic. Mitigations: better chunking, Top-K, richer lessons, optional re-ranker later. We enriched lessons after the tutor said context lacked examples.

**Q: Why MiniLM not a huge embedding model?**  
A: PoC constraint: CPU, no paid embedding API, fast ingest.

**Q: Difference ingest vs retrieval?**  
A: Ingest = offline index build. Retrieval = online query path (no Ollama required for retrieval alone).

**Q: Chroma version error you hit?**  
A: Old `vector_db` config incompatible after upgrade → `--rebuild`. Lesson: vector stores are version-sensitive.

---

# Phase 4 — Multi-agents, memory, guardrails

## Theory
- **Agent**: role (system prompt) + LLM + optional tools (RAG, predict).
- **Multi-agent**: specialists beat one mega-prompt for clear responsibilities.
- **LangGraph**: shared **state**, **nodes** (functions), **edges** / **conditional edges** (routing).
- **Supervisor**: chooses Tutor vs Helper (we use keyword/theory heuristics for CPU reliability).
- **Short-term memory**: last N turns per student_id (RAM dict) — not a database.
- **Guardrails**: deterministic filters + strict prompts (defense in depth). Perfect security doesn’t exist.
- **Prompt injection**: user tries to override system rules (“ignore previous instructions”).
- **coach_alert**: ML side channel for coach; **not** appended to student `reply`.

## 60-second pitch
“A LangGraph orchestrator runs guardrails, routes theory to a RAG Tutor and coding issues to a hint-only Helper, then silently runs the RF analyzer. At-risk produces a coach_alert for intervention decisions; the student only sees the pedagogical answer.”

## Likely questions

**Q: Why 4 agents not 1?**  
A: Separation of concerns, testability, CDC requirement, clearer prompts (Tutor vs Helper rules conflict if merged).

**Q: Why keyword routing not LLM router?**  
A: Faster, free, explainable on small hardware; we fixed the `for` false positive with theory patterns. Can upgrade later.

**Q: Does Analyzer talk to the student?**  
A: No. It fills `predicted_score` / `at_risk` / `coach_alert`. Coach UI consumes the alert.

**Q: Why change CDC “alert the student”?**  
A: Pedagogically better: avoid shaming; coach decides 1:1 or group recap. Documented design choice.

**Q: Gemini instead of Ollama?**  
A: Local 3B model froze the machine. Architecture unchanged: `get_llm()` switches provider via `.env`. Mention honestly in difficulties slide.

**Q: Temperature 0.2?**  
A: Lower randomness → more stable teaching answers.

**Q: Can guardrails be bypassed?**  
A: Regex isn’t perfect; layered with Helper/Tutor prompts. Defense in depth, not a silver bullet.

---

# Phase 5 — FastAPI + Streamlit

## Theory
- **API**: stable HTTP contract between UI and logic (Swagger = living docs).
- **Pydantic**: validate JSON shapes.
- **CORS**: browser on :8501 calling :8000.
- **Streamlit**: rapid internal dashboard; two audiences = two tabs.
- **Separation**: UI must not reimplement agents — only call API.

## Endpoints to name
- `POST /chat` → orchestrator  
- `POST /predict_today` → RF  
- `GET /coach/risk_board` → 24 ranked students  

## 60-second pitch
“FastAPI exposes chat and prediction; Streamlit gives the coach a risk board and students a chat. Coach alerts stay on the coach side.”

## Likely questions

**Q: Why not call LangGraph directly from Streamlit?**  
A: Decoupling, Swagger testing, future mobile/other clients, same API Docker service.

**Q: What if API is down?**  
A: UI shows connection refused — demo needs both processes (lesson learned).

**Q: Stateless API vs memory?**  
A: Memory is in-process on the API side (`ShortTermMemory` singleton). Restart clears it — fine for PoC; production would use Redis/DB.

---

# Phase 6 — Docker, tests, delivery

## Theory
- **Docker**: reproducible demo environment.
- **Pytest**: regression safety; prefer offline tests (no LLM in CI for happy-path chat).
- **pythonpath**: project root so `import src...` works.
- **README / slides / demo**: jury artifacts.

## 60-second pitch
“We containerize API+UI, keep a Gemini profile to avoid heavy Ollama, cover core logic with Pytest (12 passed), and package README + Beamer slides for soutenance.”

## Likely questions

**Q: What’s in CI vs not?**  
A: predict, guardrails, routing, health/predict/risk_board/injection. Full Tutor generation needs API keys — mocked or manual demo.

---

# Cross-cutting “trap” questions

**Q: Where is Deep Learning?**  
A: PoC prioritizes tabular RF + LLM agents. Embeddings are neural (MiniLM). Full DL (LSTM on OULAD clicks) is a natural extension, not required for the hybrid demo.

**Q: Hallucinations?**  
A: Reduced by RAG grounding + “answer from context only” + enriched lessons. Not eliminated.

**Q: Ethics?**  
A: At-risk labels can stigmatize → we show alerts to coach only; synthetic data for development; cite licenses if using OULAD.

**Q: Scalability?**  
A: 24 students PoC. Bottlenecks: LLM latency, embedding load, in-memory memory. Scale: queue, cache retrieval, external memory store.

**Q: Before/after intervention story?**  
A: Dashboard flags student → coach triggers group recap on topic → next day previous_score / activity improve (narrative). With synthetic data it’s illustrative; with OULAD you could measure impact offline.

**Q: End-to-end data flow for one chat?**  
A:  
1. Streamlit POST `/chat`  
2. Guardrails  
3. Load short-term history  
4. Supervisor → tutor/helper  
5. Tutor: retrieve → Gemini  
6. Analyzer: optional predict → coach_alert  
7. Save memory  
8. JSON back; UI shows reply; coach tab can show alert  

---

# Cheat sheet — vocabulary (French jury often mixes)

| Term | One-line |
|------|----------|
| RMSE | Erreur moyenne (quadratique) en points de note |
| Recall | Parmi les vrais at-risk, % détectés |
| Pipeline | Chaîne preprocess+modèle sauvegardée ensemble |
| Embedding | Vecteur numérique d’un texte |
| Chunk | Petit morceau de document indexé |
| Top-K | K chunks les plus similaires |
| State (LangGraph) | Dictionnaire partagé entre nœuds |
| Guardrail | Règle dure autour du LLM |
| Leakage | Feature qui révèle la cible |
| PoC | Preuve de concept, pas prod |

---

# Drill plan (2 evenings)

### Evening A
1. Draw architecture from memory (5 min)  
2. Explain Phases 1–2 + metrics without notes  
3. Answer all Phase 2 Qs out loud  

### Evening B
1. Explain RAG + agents + coach_alert split  
2. Walk one `/chat` request step-by-step  
3. Difficulties slide (Ollama, Chroma, routing, lessons)  
4. Mock jury: friend asks 10 random Qs from this doc  

### Pass criteria
You can do **without reading**:
- 60-second pitch for each phase  
- Your RF numbers  
- Why no student_id in X  
- Why RAG  
- Why coach_alert ≠ student reply  
- Full path of one message  

---

# Quick self-test (write answers, then check)

1. Why hybrid ML + LLM?  
2. Formula idea behind synthetic scores?  
3. Leakage example?  
4. RMSE vs recall — which matters more for the coach?  
5. Ingest vs retrieve?  
6. Four agents’ jobs?  
7. What does Supervisor not do?  
8. Three guardrail layers?  
9. Why Gemini?  
10. Three API endpoints?  

*(Answers are in the sections above — if you hesitate, re-read that phase.)*
