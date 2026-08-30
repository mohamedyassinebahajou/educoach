# EduCoach — Step 3: Q&A bank + must-remember sheet

**Language:** English (oral)  
**Companions:** [`educoach_soutenance.tex`](educoach_soutenance.tex) · [`PRESENTATION_SPEAKER_NOTES.md`](PRESENTATION_SPEAKER_NOTES.md) · deep dives Phases 1–5  
**How to use:** Cover answers out loud. Don’t memorize word-for-word — memorize the **idea** + **one file name** per answer.  
**Bank map:** B0–B7 project · **B8 theory** · B9 implementation · **B10 traps** · Part C drill


---

# Part A — Must-remember sheet (print / phone)

## One-sentence product
Hybrid system: **RF risk radar for the coach** + **RAG multi-agent tutor for the learner**; alerts stay off the student bubble.

## Numbers
| Item | Value |
|------|--------|
| Cohort | **24 × 11 = 264** rows |
| At-risk | score **&lt; 10** (`AT_RISK_THRESHOLD` in `.env`) |
| RF | RMSE **≈2.65** · R² **≈0.81** · recall **1.0** |
| RF best params | `n_estimators=300`, `max_depth=10`, `min_samples_leaf=2` |
| Soft CDC RMSE | **&lt;2.5** (slightly missed — recall priority) |
| RAG | chunk **500** / overlap **50** · Top-**K=3** · **~131** chunks |
| Embeddings | `sentence-transformers/all-MiniLM-L6-v2` (CPU) |
| Memory | last **5** turns (`ShortTermMemory`) |
| LLM | Gemini Flash-Lite via `get_llm()` (Ollama optional) |
| Ports | API **:8000** · UI **:8501** |

## Implementation anchors (phase → entry point)
| Phase | What runs | Key path |
|-------|-----------|----------|
| 0 Data | `generate_data.py` → CSV | `data/synthetic/generate_data.py` |
| 1 EDA | quality, distributions, balance, correlations, leakage checks | `notebooks/01_EDA_and_Data_Gen.ipynb` |
| 2 ML | train → pickle; serve `predict_student` | `models/random_forest.pkl`, `src/ml/predict.py` |
| 3 RAG | offline ingest; online retrieve | `src/rag/ingest.py`, `src/rag/retrieval.py` |
| 4 Agents | single public entry | `orchestrator.chat(...)` in `src/agents/orchestrator.py` |
| 5 API/UI | JSON contracts + httpx client | `src/api/routes.py`, `src/ui/streamlit_app.py` |

## ML feature contract (`FEATURE_COLUMNS` — 7 fields)
`day` · `topic` · `exercises_attempted` · `exercises_solved_correctly` · `hints_used` · `time_spent_minutes` · `previous_eval_score`

**Never in X:** `student_id`, `today_eval_score`, `at_risk`

## `AgentState` (what flows through LangGraph)
`student_id` · `message` · `route` · `history_text` · `reply` · `blocked` · `block_reason` · `predicted_score` · `at_risk` · `coach_alert` · `features`

## Four diagrams (redraw from memory)
1. SAS day: lecture → challenges → 1:1 → eval  
2. Hybrid: numbers brain / language brain · `reply` vs `coach_alert`  
3. RAG: lessons → chunk → embed → Chroma → Top-3 → Tutor  
4. LangGraph: guardrails → supervisor → tutor\|helper → analyzer → finalize  

## Hard rules (never forget)
- **No `student_id` in ML features**  
- **No leakage** of `today_eval_score` / `at_risk` into X  
- **Helper = hints only** (never full solution)  
- **Analyzer never edits `reply`** (`analyzer_node` only calls `run_performance_analyzer`)  
- **Same embedding model** for ingest and query  
- **UI is a client**; FastAPI is the product surface  
- **Theory-first routing** — “what is a for loop” → Tutor, not Helper (regex fix)

## API quick ref
| Method | Route | Returns |
|--------|-------|---------|
| `POST` | `/chat` | `reply`, `route`, `blocked`, `predicted_score`, `at_risk`, `coach_alert` |
| `POST` | `/predict_today` | `predicted_score`, `at_risk`, `threshold` |
| `GET` | `/coach/risk_board` | all 24 students ranked by risk |
| `GET` | `/coach/alerts` | recent `coach_alert` messages |
| `GET` | `/health` | `{"status":"ok"}` |

## Demo logins
`coach` / `coach123` · `student1`…`student24` / `student123`

## Commands (if jury asks “show me”)
```bash
# API
uvicorn src.api.main:app --reload --port 8000
# UI
streamlit run src/ui/streamlit_app.py
# Rebuild vector DB
python -m src.rag.ingest --rebuild
# Smoke predict
python -m src.ml.predict
```

## 10-second close
“Predict risk early, tutor from our materials, keep coach alerts off the student bubble.”

---

# Part B — Q&A bank

## B0 — Big picture / trap

**Q: What problem do you solve?**  
A: In a 24-learner SAS, at-risk students and weak points must be spotted early for personalized tutoring before the evening eval — to cut dropout and stop concept gaps (*décalage*) stacking.

**Q: Why hybrid ML + LLM?**  
A: Numbers (activity) → risk for the coach. Text (questions/bugs) → grounded tutoring for the learner. Different jobs, different tools.

**Q: Where is Deep Learning?**  
A: Tabular RF + LLM agents for the PoC. Embeddings (MiniLM) are neural. Sequence DL on clickstreams (e.g. OULAD) is a natural extension, not required for the demo.

**Q: Is this production?**  
A: No — architecture PoC. Synthetic data, PoC auth, in-memory memory.

**Q: Ethics of at-risk labels?**  
A: Labels can stigmatize → we show risk to the **coach only**, not in the student chat bubble.

---

## B1 — Data & EDA

**Q: Why synthetic data?**  
A: Control the coaching hypothesis, reproducible seed, no GDPR, exact schema. Later map OULAD (or similar) into the same features.

**Q: What is longitudinal / panel data?**  
A: Same learners measured across days. Yesterday’s score → today’s `previous_eval_score`.

**Q: Why exclude `student_id` from the model?**  
A: Avoid memorizing identity; learn behavioral rules that generalize to new students. ID is for UI/API only.

**Q: What is leakage? Example?**  
A: Putting the target (or something derived only from it) into inputs — e.g. `today_eval_score` or `at_risk` in X. The model would cheat.

**Q: Correlation ≠ causation — so why EDA?**  
A: EDA doesn’t prove causes; it guides which features to keep (previous score, activity) and encoding (One-Hot topic).

**Q: Why One-Hot for topic?**  
A: Topics are nominal categories. Label encoding invents a fake order (loops &lt; lists).

**Q: Why is `day` weak?**  
A: Mostly redundant with topic (one topic per day in the curriculum).

---

## B2 — Machine Learning

**Q: Why regression then threshold, not only classification?**  
A: Score gives **ranking and nuance** (predicted 12 ≠ predicted 3). Threshold 10 maps to coach yes/no.

**Q: Why Random Forest?**  
A: Captures interactions (high hints **and** low solves); good on small tabular data; little scaling pain; feature importances; ensemble stabler than one tree. Beats linear baseline; full at-risk recall.

**Q: Why a Pipeline?**  
A: Preprocessing + model saved together → same transforms at predict time (API-safe).

**Q: Your RMSE &gt; 2.5 — failed?**  
A: Soft CDC target. Recall objective met (1.0). ~2.65 points on /20 is usable early warning; real data can improve.

**Q: What is recall? Why prioritize it?**  
A: Of true at-risk learners, how many we flag. Missing a struggler is costlier for the coach than a false alarm.

**Q: Most important features?**  
A: Roughly `exercises_solved_correctly` and `previous_eval_score`; hints medium; day weak.

**Q: Overfitting?**  
A: Train/test split, tree depth / leaf constraints, compare to baseline. Small n=264 is a real limit.

---

## B3 — RAG

**Q: What is RAG in one sentence?**  
A: Retrieve relevant lesson chunks, put them in the prompt, then generate — so answers are grounded in our materials.

**Q: RAG vs fine-tuning?**  
A: Fine-tune bakes lessons into weights (costly, slow updates, weak citations). RAG: edit Markdown + re-ingest; natural Day citations. We chose RAG.

**Q: Why same embedding model both sides?**  
A: Vectors must live in the same space. Different models → broken similarity search.

**Q: Why Top-K=3?**  
A: Enough context without flooding a small prompt / confusing the LLM.

**Q: What if retrieval is wrong?**  
A: Weak or off-topic answers. Mitigate: better chunks, richer lessons, tune K, later re-ranker.

**Q: Ingest vs retrieve — which needs the chat LLM?**  
A: Neither for search. Chat LLM is only for generation (Tutor/Helper). Ingest needs the embedding model only.

**Q: Chroma error you hit?**  
A: Version mismatch on old `vector_db` → `ingest --rebuild`.

**Q: Do hallucinations disappear?**  
A: No — reduced by grounding prompt + good docs. Not eliminated.

---

## B4 — Agents / LangGraph

**Q: Chatbot vs tool vs agent?**  
A: Chatbot talks. Tool computes/retrieves. Agent = role + optional LLM + optional tools.

**Q: Why four agents not one mega-bot?**  
A: Separation of concerns (tutor ≠ helper ≠ risk); clearer prompts; testable; CDC multi-agent requirement.

**Q: Is the Supervisor an “agent” if it doesn’t call an LLM?**  
A: It’s a routing specialist node with an agent role. PoC uses keywords; can upgrade to LLM router later.

**Q: State / Node / Edge?**  
A: State = shared bag for one run. Node = function returning updates. Edge = next step; conditional edge = junction.

**Q: Why LangGraph not one script?**  
A: Explicit workflow, conditional routing, clear contracts, drawable for jury, easier to extend.

**Q: Does the Analyzer talk to the student?**  
A: No. It fills `predicted_score` / `at_risk` / `coach_alert` only.

**Q: Why not put risk in the student reply?**  
A: Pedagogy: avoid shaming; coach decides 1:1 or group recap.

**Q: Why keyword routing?**  
A: Fast, free, explainable. Fixed “for loop” false-positive with theory-first rules.

**Q: Can guardrails be bypassed?**  
A: Regex isn’t perfect → defense in depth (filters + strict prompts). No silver bullet.

**Q: Why Gemini not Ollama?**  
A: Local 3B froze the machine. Architecture unchanged: `get_llm()` switches via `.env`.

---

## B5 — API / UI

**Q: Why FastAPI in front of Streamlit?**  
A: Stable JSON contracts + Swagger; UI is one client; tests/curl reuse the same brain.

**Q: Main endpoints?**  
A: `POST /chat`, `POST /predict_today`, `GET /coach/risk_board`, `GET /coach/alerts`, `GET /health`.

**Q: Does risk_board use today’s true score?**  
A: No — activity features + RF only (no label leakage).

**Q: Two kinds of “memory”?**  
A: API short-term memory (last 5 turns for prompts) vs Streamlit `session_state` (UI bubbles). Restart clears both in the PoC.

**Q: Is Streamlit auth production-grade?**  
A: No — PoC role login only. Real SSO/tokens = next step.

---

## B6 — Delivery / engineering

**Q: What do tests cover?**  
A: Health, predict, risk_board, injection blocked, routing/guardrails. Full Tutor generation needs API keys — demo/manual.

**Q: Docker role?**  
A: Reproducible API+UI demo; Gemini profile avoids heavy local Ollama.

**Q: Biggest difficulties?**  
A: Ollama freeze → Gemini; Chroma rebuild; thin lessons → enrich; Supervisor “for” bug.

---

## B7 — Walk one `/chat` (must be fluent)

1. Streamlit learner (`render_learner_dashboard`) → `api_post("/chat", …)`  
2. FastAPI `chat_endpoint` → `orchestrator.chat(student_id, message, features)`  
3. **Guardrails** (`guardrails_node`): `validate_input` + `detect_prompt_injection` → block or load `history_text` from `MEMORY`  
4. **Supervisor** (`supervisor_node`): `THEORY_HINTS` → tutor; `CODE_HINTS` → helper; default tutor  
5. **Tutor** (`run_concept_tutor`): `retrieve_context` Top-3 → `format_context` → LLM with grounded prompt  
6. **Helper** (`run_code_helper`): hints-only LLM (no full solution)  
7. **Analyzer** (`run_performance_analyzer`): if `features` present → `predict_student` → `coach_alert` (never touches `reply`)  
8. **Finalize** (`finalize_node`): `MEMORY.add` user + assistant turn  
9. JSON `ChatResponse` back → learner UI shows **`reply` only**; coach dashboard shows **`coach_alert`** via `/coach/alerts`

**If blocked:** supervisor routes to `blocked_end` → finalize (no tutor/helper/analyzer LLM call).

---

## B9 — Implementation deep-dive (file-level)

**Q: What is the single entry point for the language brain?**  
A: `orchestrator.chat(student_id, message, features)` in `src/agents/orchestrator.py`. FastAPI never imports individual agents directly.

**Q: What does `predict_student` actually do?**  
A: Validates all 7 `FEATURE_COLUMNS`, builds a one-row DataFrame, loads `models/random_forest.pkl` via `joblib`, runs `model.predict`, applies `AT_RISK_THRESHOLD` (default 10), returns `{predicted_score, at_risk, threshold}`.

**Q: What is inside the saved pickle?**  
A: A sklearn `Pipeline`: `ColumnTransformer` (One-Hot on `topic` + passthrough numerics) → `RandomForestRegressor`. Saved as one artifact so API inference matches training transforms.

**Q: Walk through RAG ingest.**  
A: `ingest.py` loads 11 Markdown lessons from `data/lessons/`, parses day/topic metadata, splits with `RecursiveCharacterTextSplitter` (500/50), embeds with MiniLM, persists to `vector_db/` via Chroma. `--rebuild` wipes old index (fixes version mismatch).

**Q: Walk through RAG at query time.**  
A: `retrieval.py` loads the same embedding model + Chroma store, runs similarity search with `k=TOP_K` (default 3), returns `Document` list; `format_context` wraps chunks with day/topic headers for the Tutor prompt.

**Q: What does the Tutor prompt contain?**  
A: System rules (ground in context, cite day), retrieved lesson chunks, optional `history_text` (last 5 turns), and the student question. Temperature ~0.2 for stable answers.

**Q: What does the Helper prompt forbid?**  
A: Giving the full solution or complete corrected code. It must give hints, questions, and small nudges only.

**Q: How does the Analyzer decide to alert?**  
A: `run_performance_analyzer` checks if `features` dict is non-empty; if yes, calls `predict_student`; if `at_risk` is True, sets `coach_alert` string (e.g. “Student X predicted at risk…”). It returns an empty dict if blocked or no features.

**Q: Why pass `features` in `/chat` and not only in `/predict_today`?**  
A: So one learner message can produce both a pedagogical `reply` and a silent coach signal in the same graph run — the hybrid product rule in one HTTP call.

**Q: How does the coach dashboard get alerts?**  
A: `/chat` response includes `coach_alert`; `routes.py` calls `append_alert` in `src/coach/alerts_store.py`; coach UI polls `GET /coach/alerts`.

**Q: How does `risk_board` work?**  
A: Reads `student_performance.csv`, takes each student’s latest row **before** today’s label, extracts `FEATURE_COLUMNS`, runs `predict_student` for all 24, sorts by predicted score ascending (most at-risk first).

**Q: What do guardrails actually check?**  
A: `input_validator.py`: empty/too-long messages. `prompt_injection.py`: regex patterns like “ignore previous instructions”. Both set `blocked=True` and a safe `reply` — no LLM call.

**Q: How does Supervisor routing work in code?**  
A: If `THEORY_HINTS` matches (“what is”, “explain”, …) and no error/bug words → `tutor`. Else if `CODE_HINTS` matches (code, bug, traceback, `def `, …) → `helper`. Else default `tutor`. Theory-first avoids “for loop” false-positive.

**Q: Where is the LLM configured?**  
A: `src/agents/llm.py` → `get_llm()` reads `.env` (`LLM_PROVIDER`, API keys). Swapping Gemini ↔ Ollama does not change the graph.

**Q: What is short-term memory?**  
A: `src/memory/short_term.py` — in-process dict keyed by `student_id`, max 5 turns, formatted as `history_text` for prompts. Cleared on API restart (PoC).

**Q: How does Streamlit auth work?**  
A: `src/ui/auth.py` — role login (`coach` vs `studentN`), password from env vars, stored in `st.session_state`. Coach sees risk board + alerts; learner sees chat only.

**Q: What tests exist?**  
A: Health, predict, risk_board, injection blocked, routing/guardrails. Full Tutor generation needs API keys — covered in demo/manual.

**Q: What would you change for production?**  
A: Real SSO, persistent memory (Redis/DB), async LLM calls, monitoring, real cohort data (OULAD mapping), re-ranker on RAG, LLM-based supervisor, rate limiting.

---

## B8 — Theoretical concepts (jury theory)

*These are concept questions: define / compare / why it exists — then tie back to EduCoach in one breath.*

### Data & statistics

**Q: What is a feature vs a target (label)?**  
A: Features ($X$) are inputs used to predict. Target ($y$) is what you predict. EduCoach: activity + previous score → `today_eval_score`.

**Q: Supervised vs unsupervised learning?**  
A: Supervised learns from labeled examples (we have scores). Unsupervised finds structure without labels (clustering). We use supervised regression.

**Q: Train / test split — why?**  
A: Estimate generalization on unseen rows. Training only → you don’t know if the model memorized.

**Q: What is overfitting?**  
A: Model fits training noise so badly that test performance drops. Mitigate: simpler model, more data, regularization, depth limits, train/test.

**Q: What is underfitting?**  
A: Model too simple to capture the signal (e.g. linear when interactions matter).

**Q: Nominal vs ordinal vs numeric variables?**  
A: Nominal = categories with no order (topic). Ordinal = ordered categories. Numeric = real numbers (hints, time, score). Wrong encoding invents fake order.

**Q: What is One-Hot encoding?**  
A: Turn a category into binary columns (one per value). Used for `topic`.

**Q: What is class imbalance?**  
A: One class dominates (e.g. 95% not at-risk). Accuracy looks high while missing the minority. Prefer recall/precision/F1 for the rare class.

**Q: Correlation vs causation?**  
A: Correlation = move together. Causation = A makes B happen. EDA finds associations; it doesn’t prove causal coaching effects.

---

### Regression & classification metrics

**Q: What is regression vs classification?**  
A: Regression predicts continuous values (score /20). Classification predicts classes (at-risk / ok). We do regression then apply a threshold.

**Q: What is RMSE?**  
A: Root Mean Squared Error — typical size of prediction error in score points (same units as $y$). Lower is better. Sensitive to large mistakes.

**Q: What is MAE?**  
A: Mean Absolute Error — average absolute error. More robust to outliers than RMSE.

**Q: What is R²?**  
A: Fraction of variance in $y$ explained by the model (1 = perfect, 0 ≈ predicting the mean). Higher is better.

**Q: Precision vs recall?**  
A: Precision = of predicted positives, how many are true. Recall = of true positives, how many we found. Coach priority: **recall** (don’t miss at-risk).

**Q: What is a false negative here?**  
A: True at-risk learner predicted as ok — the dangerous miss for coaching.

**Q: What is a confusion matrix?**  
A: Table of TP / FP / TN / FN after thresholding predictions into classes.

**Q: Why not optimize accuracy alone?**  
A: With imbalance, predicting “always ok” can get high accuracy and zero recall on at-risk.

---

### Models (Linear Regression & Random Forest)

**Q: What does Linear Regression assume?**  
A: Roughly a linear (additive) link between features and target (after encoding). Fast baseline; weak on strong interactions.

**Q: What is a decision tree?**  
A: Flow of if/else splits on features that partition the data to predict $y$.

**Q: What is a Random Forest?**  
A: Ensemble of many trees trained on bootstrap samples / feature subsets; predictions averaged (regression) or voted (classification). Reduces variance vs one tree.

**Q: What is bagging?**  
A: Train models on bootstrap resamples and aggregate — core idea behind forests.

**Q: What are feature importances?**  
A: Scores showing how much each feature contributes to reducing error / impurity across trees. Interpretable for the coach story.

**Q: What is a sklearn Pipeline?**  
A: Chain of transformers + estimator fitted/saved together so train and predict use the same steps.

**Q: What is GridSearch / hyperparameter tuning?**  
A: Try combinations of settings (depth, n_estimators, …) and pick by validation metric. Hyperparameters are chosen by us, not learned as weights.

**Q: Bias–variance trade-off (simple)?**  
A: Too simple → high bias (underfit). Too complex → high variance (overfit). Forests average trees to lower variance.

---

### NLP / embeddings / RAG

**Q: What is an embedding?**  
A: A vector of numbers representing text so that similar meanings are close in space.

**Q: What is cosine similarity (intuition)?**  
A: Measures angle between vectors — high similarity → similar direction → related meaning. Used to rank chunks vs the question.

**Q: What is chunking? Why overlap?**  
A: Split long docs into pieces that fit retrieval/prompts. Overlap preserves sentences cut at boundaries.

**Q: What is a vector database?**  
A: Store that indexes vectors for nearest-neighbor search (plus original text/metadata). Ours: Chroma.

**Q: What is RAG?**  
A: Retrieval-Augmented Generation — retrieve evidence, augment the prompt, then generate.

**Q: What is grounding / hallucination?**  
A: Grounding = stick to provided evidence. Hallucination = fluent but unfounded content. RAG + prompts reduce (don’t erase) hallucinations.

**Q: What is a system prompt vs user message?**  
A: System = role/rules for the model. User = the question / context block. Tutor rules live in the system prompt.

**Q: What is temperature?**  
A: Sampling randomness. Lower → more deterministic (good for tutoring). We use ~0.2.

**Q: Context window — why care?**  
A: Max tokens the model can read. Too many chunks → truncate/noise; hence Top-K=3.

**Q: Dense retrieval vs keyword search?**  
A: Keyword = exact terms. Dense = embedding similarity (captures paraphrase: “iterate a list” ≈ “for loop”).

---

### Agents / orchestration / safety

**Q: What is an agent (in this course sense)?**  
A: A component with a role, optional LLM, optional tools, operating inside a workflow.

**Q: What is multi-agent?**  
A: Several specialists + coordination (router/supervisor), not one prompt doing all jobs.

**Q: What is LangGraph (conceptually)?**  
A: Graph framework: shared state, nodes (steps), edges (control flow), including conditional routing.

**Q: What is short-term vs long-term memory?**  
A: Short-term = recent turns in the session. Long-term = durable store across sessions (DB). We only ship short-term PoC memory.

**Q: What is prompt injection?**  
A: User text tries to override system rules (“ignore previous instructions”). Defend with filters + strict prompts.

**Q: What is defense in depth?**  
A: Multiple layers of control so one failure doesn’t open everything (input filter + role prompts + channel separation).

**Q: What is a tool-calling agent vs our PoC specialists?**  
A: Tool-calling loops “think → call tool → observe.” Our PoC specialists are thinner: prompt + one tool (RAG or predict) inside a fixed graph.

---

### Software / API concepts

**Q: What is an API?**  
A: Contract for programs to talk (here HTTP JSON). Hides internal Python behind stable endpoints.

**Q: What is REST (loosely)?**  
A: Resource-oriented HTTP verbs (`GET`/`POST`) + status codes. Our FastAPI routes follow that style.

**Q: What is a schema / Pydantic model?**  
A: Declared shape + types for request/response; validates bad JSON early; feeds Swagger.

**Q: What is CORS?**  
A: Browser security rule for cross-origin HTTP. UI (:8501) calling API (:8000) needs CORS allowed in PoC.

**Q: Frontend vs backend?**  
A: Frontend = UI (Streamlit). Backend = API + ML + agents. Separation of concerns.

**Q: What is a PoC?**  
A: Proof of Concept — show the architecture works end-to-end, not full production hardening.

---

### Extra theory (often asked in AI/ML courses)

**Q: What is a baseline model?**  
A: A simple reference (mean predictor, linear regression) to prove a more complex model is worth it. We compare RF to linear regression.

**Q: What is cross-validation (intuition)?**  
A: Rotate train/validation folds so metrics don’t depend on one lucky split. Useful when *n* is small (we have 264 rows).

**Q: What is a hyperparameter vs a parameter?**  
A: Parameters are learned (tree splits). Hyperparameters are set by us (`n_estimators`, `max_depth`) and tuned by search.

**Q: What is bootstrap sampling?**  
A: Sample with replacement from the training set. Each RF tree sees a different bootstrap sample → diversity → lower variance when averaged.

**Q: What is impurity / information gain (tree idea)?**  
A: Trees pick splits that best separate the target (reduce MSE in regression or Gini/entropy in classification).

**Q: What is tokenization (LLM)?**  
A: Split text into tokens (subwords) that the model reads. Context window is counted in tokens, not characters.

**Q: What is a transformer (one sentence)?**  
A: Neural architecture with attention that lets each token look at others — basis of modern LLMs and many embedding models.

**Q: What is attention (intuition)?**  
A: Soft weights that say “which parts of the context matter for this token.” Helps long-range dependencies.

**Q: What is fine-tuning?**  
A: Continue training a pretrained model on your data so weights change. Costly; slow to update when lessons change → we preferred RAG.

**Q: What is zero-shot / few-shot prompting?**  
A: Zero-shot = instructions only. Few-shot = add examples in the prompt. Our Tutor is mostly zero-shot + retrieved evidence.

**Q: What is Top-K retrieval?**  
A: Return the *K* nearest chunks by similarity. We use K=3 as a prompt-size / noise trade-off.

**Q: What is a re-ranker?**  
A: Second model that reorders retrieved chunks for relevance. Not in PoC; natural next step if Top-K is noisy.

**Q: What is semantic search?**  
A: Search by meaning (embeddings), not exact keywords. “How do I iterate?” can match a “for loop” lesson.

**Q: What is a state machine / graph workflow?**  
A: Explicit steps and transitions. LangGraph: nodes update `AgentState`; edges decide the next node.

**Q: What is idempotency (API intuition)?**  
A: Repeating the same request doesn’t corrupt state unexpectedly. Our PoC chat appends memory each time — not fully idempotent (honest PoC limit).

**Q: What is latency vs throughput?**  
A: Latency = time for one request. Throughput = requests per second. LLM call dominates our latency.

**Q: What is cold start (embeddings / models)?**  
A: First load of MiniLM / RF pickle is slow; later calls reuse the in-memory object (`_model` cache, `get_llm()` cache).

**Q: GDPR / personal data — why care?**  
A: Real learner logs are personal data. Synthetic data avoids collecting PII in the PoC; production needs consent, retention, access control.

**Q: What is explainability / interpretability?**  
A: Ability to justify predictions. RF feature importances help tell the coach *why* risk rose (e.g. low solves + high hints).

**Q: What is a false positive vs false negative (coach story)?**  
A: FP = alert but learner is fine (wasted coach time). FN = miss a struggler (costlier). We bias toward fewer FNs → high recall.

---

### Tie-back one-liners (if they say “and in your project?”)

| Concept | In EduCoach |
|---------|-------------|
| Supervised regression | Predict evening score |
| Thresholding | score &lt; 10 → at-risk |
| RF ensemble | Main risk model |
| Embedding + ANN search | MiniLM + Chroma |
| RAG | Concept Tutor context |
| Multi-agent graph | LangGraph orchestrator |
| Side channel | `coach_alert` ≠ `reply` |
| Leakage control | No `today_eval_score` / `at_risk` in X |
| Defense in depth | Guardrails + prompts + channel split |

---

## B10 — Trap questions (jury gotchas)

*These sound like attacks. Answer calmly: acknowledge the trap, give the precise distinction, then one EduCoach sentence.*

### “You failed / your numbers are wrong”

**Trap: Your RMSE is 2.65 &gt; 2.5 — you failed the CDC.**  
A: Soft target, not a hard fail. We prioritized **recall = 1.0** (no missed at-risk). ~2.65 points on /20 is usable early warning; real data + more rows can improve RMSE.

**Trap: R² = 0.81 means the model is 81% accurate.**  
A: No. R² is variance explained, not classification accuracy. Accuracy is a different metric after thresholding.

**Trap: Recall = 1.0 means the model is perfect.**  
A: No. Perfect **at-risk detection** after threshold — it can still have score error (RMSE) and false positives. We accept some FP to avoid FN.

**Trap: Why not just report accuracy?**  
A: With class imbalance, “always predict ok” can look accurate and miss every struggler. Coach cares about **recall on at-risk**.

**Trap: n=264 is tiny — your model is useless.**  
A: Honest limit of a PoC. Enough to validate the **pipeline and product rule**. Production needs real / larger longitudinal data (e.g. OULAD mapping).

### “Your ML design is cheating / broken”

**Trap: You used `student_id` somehow, right?**  
A: No — ID is UI/API only. `FEATURE_COLUMNS` has 7 behavioral fields. Putting ID in X would memorize identities, not generalize.

**Trap: Isn’t `previous_eval_score` leakage?**  
A: No. It is **yesterday’s** known score, available before tonight’s eval. Leakage would be **today’s** score or `at_risk` derived from it.

**Trap: You predict score and also use at_risk as a feature.**  
A: Never. `at_risk` is an **output** (score &lt; 10), not an input.

**Trap: Why regression if you only need at-risk yes/no?**  
A: Score gives ranking and nuance (predicted 3 vs 9). Threshold turns it into a coach flag. Classification alone loses severity.

**Trap: Random Forest is outdated; why not XGBoost / a neural net?**  
A: RF is strong on small tabular data, interpretable importances, low tuning pain for a PoC. Boosting/NN are possible upgrades with more data.

**Trap: Did you train and test on the same rows?**  
A: No — train/test split in the training notebook; metrics reported on held-out test. Pipeline saved for serving only.

**Trap: Feature importances prove causality.**  
A: No — they show predictive contribution in the forest, not causal proof. Coaching still needs human judgment.

### “RAG / LLM traps”

**Trap: RAG means the model never hallucinates.**  
A: False. RAG **reduces** hallucinations by grounding; it doesn’t eliminate them. Bad retrieval or thin lessons still produce weak answers.

**Trap: Why not fine-tune on the 11 lessons?**  
A: Lessons change often; fine-tuning is costly and weak for citations. RAG: edit Markdown → re-ingest → natural Day citations.

**Trap: Embeddings are just TF-IDF / bag-of-words.**  
A: No. Dense MiniLM vectors capture **semantic** similarity (paraphrases), not only exact word overlap.

**Trap: You used different embedding models for ingest and query.**  
A: Never — same MiniLM both sides. Different models → incompatible vector spaces → broken search.

**Trap: Top-K=3 is arbitrary / too small.**  
A: Trade-off: enough context vs prompt noise and context-window cost. Tunable; re-ranker is a next step.

**Trap: Chroma is “the AI” / the LLM.**  
A: No. Chroma is a **vector store**. The LLM generates text; Chroma only retrieves chunks.

**Trap: Temperature 0.2 means the model is deterministic / always correct.**  
A: Lower temperature → more stable sampling, not correctness. Grounding + good docs drive quality.

### “Agents / architecture traps”

**Trap: You don’t have real agents — just if/else.**  
A: Agents = role + optional LLM + optional tools in a workflow. Supervisor is a router node (keywords now; LLM-router later). Tutor/Helper/Analyzer are specialists with clear contracts — CDC multi-agent pattern.

**Trap: Why four agents? One GPT call is enough.**  
A: Separation of concerns: theory ≠ debugging ≠ risk. Clearer prompts, testable nodes, coach side-channel without polluting pedagogy.

**Trap: The Analyzer talks to the student about being at risk.**  
A: No. Analyzer only fills `predicted_score` / `at_risk` / `coach_alert`. Learner UI shows `reply` only.

**Trap: Showing risk in the chat is better transparency.**  
A: Product/ethics choice: avoid shaming beginners. Coach decides 1:1 or group recap. Transparency to the **coach**, not in the student bubble.

**Trap: LangGraph is just marketing — a Python script is the same.**  
A: Graph makes routing explicit, drawable, and extendable (add nodes/edges without spaghetti). Jury can see the control flow.

**Trap: Keyword routing is too naive.**  
A: Agreed for production. PoC: fast, free, explainable; theory-first rules fixed the “for loop” false-positive. Upgrade path: LLM supervisor.

**Trap: Guardrails = secure.**  
A: Regex filters are **one layer**, not a silver bullet. Defense in depth: filters + strict prompts + channel separation. Bypass remains possible → PoC honesty.

### “Product / data / ethics traps”

**Trap: Synthetic data means the project isn’t real.**  
A: Synthetic lets us control the coaching hypothesis, seed, and schema without GDPR. Architecture is real; data source can swap later (OULAD-style).

**Trap: This replaces the human coach.**  
A: No — **decision support**. RF flags who needs attention; tutor scales Q&A; coach still owns pedagogy and 1:1.

**Trap: At-risk labels are discriminatory.**  
A: Risk of stigma is why labels stay coach-only. Model uses activity features, not demographics. Human remains in the loop.

**Trap: Streamlit login = production security.**  
A: No — demo role auth only. Production needs SSO/tokens, HTTPS, secrets management, audit logs.

**Trap: Where is Deep Learning? Without DL you didn’t do AI.**  
A: MiniLM embeddings are neural; LLMs are transformers. Tabular RF is the right tool for this small panel. Sequence DL on clickstreams is a natural Phase-N extension.

**Trap: The UI is the product.**  
A: No — FastAPI is the product surface (JSON contracts). Streamlit is one client. Same brain via curl/tests.

**Trap: If the API is down, the UI still tutors.**  
A: No — UI is a thin httpx client. Brain lives in API + agents + ML.

### “Gotcha definitions (say the wrong thing = fail)”

**Trap: Define overfitting.**  
A: Fits training noise → poor generalization on unseen data. Mitigate: split, depth limits, more data, compare to baseline.

**Trap: Define leakage in one sentence.**  
A: Using information at train/predict time that would **not** be available in real deployment (e.g. today’s exam score).

**Trap: Precision vs recall — which for the coach?**  
A: **Recall** first — don’t miss at-risk learners. Precision matters too (coach time) but FN costs more here.

**Trap: What is bagging?**  
A: Bootstrap aggregating — train many models on resampled data and average. Core of Random Forest.

**Trap: RAG formula?**  
A: Retrieve relevant docs → Augment the prompt with them → Generate the answer.

---

# Part C — Drill plan (night before)

### Round 1 (20 min) — muscle memory
- Redraw **4 diagrams** from memory (Part A)  
- Recite **numbers cheat table** + `FEATURE_COLUMNS` (7 fields)  
- Global pitch + **10-second close**  
- Name the **5 API routes** without looking  

### Round 2 (30 min) — project traps
- Answer all **Hard rules** questions aloud  
- Full **`/chat` walk** (B7) — function names included  
- Metrics + **RMSE honesty** (“soft miss, recall priority”)  
- **B9:** explain `predict_student` and `orchestrator.chat` in 30 s each  
- **B10:** answer the 5 RMSE / leakage / RAG-hallucination / Analyzer / Deep-Learning traps  

### Round 3 (30 min) — jury simulation
- Friend/jury picks **10 random Qs** from B0–B7 + B9  
- Plus **5 theory Qs from B8**  
- Plus **5 trap Qs from B10** (force short, calm answers)  
- Demo dry-run (4 beats): coach risk board → learner theory Q → learner bug Q → coach sees alert  

### Round 4 (theory + traps)
- Define without notes: RMSE, MAE, R², precision, recall, embedding, cosine similarity, RAG, leakage, overfitting, bagging, Random Forest, prompt injection, hallucination  
- Friend reads **trap** questions only; you answer in ≤20 seconds each  

### Pass if you can say without notes
- Why hybrid + two channels (`reply` ≠ `coach_alert`)  
- Leakage + no `student_id` + 7 `FEATURE_COLUMNS`  
- RAG formula + vs fine-tuning + same embedding model  
- Recall priority + RMSE soft miss (honest)  
- Analyzer never edits `reply`  
- LangGraph node order (6 nodes)  
- Define RMSE, recall, embedding, RAG in one sentence each  
- Defuse: “RMSE fail?”, “RAG = no hallucination?”, “Where is DL?”, “Is this production?”  

### High-probability jury questions (top 12)
1. Why hybrid ML + LLM?  
2. What is leakage? Give an example in your project.  
3. Why Random Forest and not only linear regression?  
4. RAG vs fine-tuning — why RAG?  
5. Walk me through one `/chat` request.  
6. Why does the Analyzer not talk to the student?  
7. Your RMSE is above 2.5 — did you fail?  
8. What is recall and why prioritize it?  
9. Where is Deep Learning in your project?  
10. Is this production-ready? What’s missing?  
11. Does RAG stop hallucinations?  
12. Isn’t `previous_eval_score` leakage?

### Trap answer template (use every time)
1. **Name the trap** (“That’s mixing X with Y…”)  
2. **Give the correct definition / distinction**  
3. **One EduCoach sentence** (“In our code, …”)

---

**Presentation stack:** slides [`educoach_soutenance.tex`](educoach_soutenance.tex) · notes [`PRESENTATION_SPEAKER_NOTES.md`](PRESENTATION_SPEAKER_NOTES.md) · this Step 3 file.
