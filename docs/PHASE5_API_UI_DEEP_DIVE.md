# Phase 5 Deep Dive — FastAPI + Streamlit (EduCoach)

**Companions:** [`PHASE5_API_UI_GUIDE.md`](PHASE5_API_UI_GUIDE.md) · [`PHASE5_IMPLEMENTATION.md`](PHASE5_IMPLEMENTATION.md)  
**Code:** `src/api/{schemas,routes,main}.py` · `src/ui/streamlit_app.py`  
**Depends on:** Phase 2 `predict_student` · Phase 4 `orchestrator.chat` · CSV `data/processed/student_performance.csv`

---

## 1. Why Phase 5 exists

Phases 2–4 are **library code** (predict, RAG, LangGraph).  
Phase 5 makes them **usable by humans and other apps**.

Without Phase 5:
```text
Only CLI / Python REPL → hard to demo for a coach or jury
```

With Phase 5:
```text
Streamlit (coach + student)  ──HTTP──▶  FastAPI  ──▶  ML + agents
Swagger /docs for contract checks
```

**Formula to memorize:**

```text
Phase 5 = wrap existing brains behind stable JSON + two UIs (coach vs student)
```

Phase 5 does **not** retrain the RF, rebuild Chroma, or rewrite agents. It **exposes** them.

---

## 2. Architecture picture

```text
┌────────────────────────────┐         HTTP JSON        ┌────────────────────────────┐
│  Streamlit :8501           │ ───────────────────────▶ │  FastAPI :8000             │
│                            │                          │                            │
│  Tab Coach                 │  GET  /coach/risk_board  │  → CSV + predict_student×24│
│   · ranked risk table      │  POST /predict_today     │  → predict_student         │
│   · coach_alerts list      │                          │                            │
│                            │                          │                            │
│  Tab Student Chat          │  POST /chat              │  → orchestrator.chat       │
│   · bubbles = reply only   │                          │     (LangGraph + RAG + LLM)│
│   · alerts → session only  │  GET  /health            │  → {"status":"ok"}         │
└────────────────────────────┘                          └────────────────────────────┘
```

Two processes. UI never imports LangGraph directly — only `httpx` → API.

---

## 3. Why FastAPI then Streamlit (not Streamlit alone)?

| | Call agents from Streamlit | FastAPI + Streamlit (yours) |
|--|----------------------------|-----------------------------|
| Contracts | Ad hoc | Pydantic + Swagger `/docs` |
| Reuse | UI-only | Any client (tests, other UIs, curl) |
| Separation | UI ↔ ML mixed | Clear backend vs frontend |
| Jury story | “I made a demo page” | “API product surface + dashboard” |

**Trap Q:** “Why not call LangGraph from Streamlit?”  
**A:** Decoupling. API is the stable contract; UI is one client. Easier tests, Swagger demos, future mobile/web.

---

## 4. API surface (memorize)

| Method | Path | Calls | Audience |
|--------|------|-------|----------|
| `GET` | `/` | — | Root hint → `/docs` |
| `GET` | `/health` | — | Liveness |
| `POST` | `/chat` | `orchestrator.chat` | Student path (+ optional ML features) |
| `POST` | `/predict_today` | `predict_student` | Single-student risk |
| `GET` | `/coach/risk_board` | CSV + predict ×24 | Coach dashboard |

### `/chat` — hybrid endpoint

**Request:** `student_id`, `message`, optional `features` (7 ML fields).  
**Response:** `reply`, `route`, `blocked`, `block_reason`, `predicted_score`, `at_risk`, `coach_alert`.

- No `features` → chat still works; analyzer skips; no alert.  
- With `features` + at-risk → `coach_alert` filled; **`reply` stays pedagogical**.

### `/predict_today`

Same 7 features as Phase 2 training (no `student_id` in the model).  
Returns `predicted_score`, `at_risk`, `threshold` (10.0).

### `/coach/risk_board?day=`

- Default day = **max day in CSV** (or query param).  
- For each of 24 students: build features from activity columns → RF predict.  
- **Does not use** `today_eval_score` (no leakage).  
- Sort: at-risk first, then lower predicted score.  
- Returns `{ day, topic, students: [...] }`.

---

## 5. Schemas (Pydantic)

**Job:** validate JSON, document Swagger, fail fast on bad payloads.

| Model | Role |
|-------|------|
| `StudentFeatures` | 7 RF inputs + bounds (`day` 1–20, scores 0–20…) |
| `ChatRequest` / `ChatResponse` | Chat I/O including `coach_alert` |
| `PredictRequest` / `PredictResponse` | Standalone ML |
| `RiskBoardRow` / `RiskBoardResponse` | Dashboard payload |

**Oral line:** “Schemas are the API contract; routes only wire validated data to Phase 2/4.”

---

## 6. Routes & main

**`routes.py`:** thin handlers — parse body → call Python → map to response models; `HTTPException` on errors (400 bad features, 404 empty day, 500 missing CSV / LLM blow-up).

**`main.py`:**
- `FastAPI(title=…)`
- **CORS** `allow_origins=["*"]` (PoC only)
- `include_router(router)`

Run:
```bash
uvicorn src.api.main:app --host 0.0.0.0 --port 8000 --reload
```
Swagger: `http://localhost:8000/docs`

---

## 7. Streamlit — two audiences, two tabs

### Coach Dashboard
- Day picker + **Refresh risk board** → `GET /coach/risk_board`
- Table: Student, Solved, Hints, Prev, Predicted, 🔴/🟢  
- Metric: at-risk count / 24  
- Bar chart of predicted scores  
- **Latest coach alerts** from chat (session list) — not inside student bubbles

### Student Chat
- Select student `1–24`  
- Optional “attach features” (prefill from risk board when available)  
- `st.chat_input` → `POST /chat`  
- History in `st.session_state[chat_history_{id}]`  
- Show `reply` + caption (`route`, `blocked`)  
- If `coach_alert`: append to `coach_alerts` for Coach tab — **never** as the assistant bubble text

Client: `httpx`, `API_URL` env (default `http://localhost:8000`), timeout 120s (LLM can be slow).

---

## 8. coach_alert channel (Phase 4 rule, Phase 5 UX)

```text
JSON response
├── reply        → Student Chat bubble
└── coach_alert  → Coach tab “Latest coach alerts” (session_state)
```

Same HTTP response, **two consumers**. That is the hybrid product story on screen.

---

## 9. End-to-end paths (know for demo)

### A. Risk board only (ML)
```text
Coach Refresh → /coach/risk_board → CSV day N → 24× RF → ranked table
```

### B. Theory chat (agents + RAG)
```text
Student: "What is a for loop?" → /chat → LangGraph → Tutor → RAG → LLM → reply
```

### C. At-risk chat (hybrid)
```text
Student + features (low solved, high hints…)
→ /chat → reply to student
         → coach_alert → Coach tab list
```

### D. Injection
```text
"Ignore previous instructions…" → blocked reply; no specialist dump
```

---

## 10. What lives where (don’t confuse memories)

| Store | Where | What |
|-------|--------|------|
| Short-term agent memory | API process (`MEMORY`) | Last 5 turns for orchestrator prompts |
| Streamlit chat bubbles | Browser session (`st.session_state`) | UI history display |
| Risk board cache | `st.session_state["risk_board"]` | Last fetched board |
| Coach alerts UI | `st.session_state["coach_alerts"]` | Alerts from this UI session |

Restarting API clears agent memory; refreshing Streamlit clears UI state. PoC — say so if asked.

---

## 11. Failure modes (jury)

| Problem | Symptom | Fix / note |
|---------|---------|------------|
| Connection refused | UI can’t reach API | Start uvicorn on :8000 |
| Wrong `API_URL` | Same | `export API_URL=http://localhost:8000` |
| Missing CSV | risk_board 500 | Generate/processed path |
| No features on chat | No coach_alert | Expected; checkbox off or empty |
| LLM key missing | `/chat` 500 | `.env` Gemini/Ollama |
| CORS | Browser client issues | PoC allows `*`; Streamlit server-side httpx usually fine |

---

## 12. Numbers / files cheat sheet

| Item | Value |
|------|--------|
| API port | 8000 |
| UI port | 8501 |
| Students on board | 24 |
| Chat features | optional 7 ML fields |
| Key rule | `coach_alert` ≠ student bubble |
| Files | `schemas.py`, `routes.py`, `main.py`, `streamlit_app.py` |

---

## 13. 60-second pitch

“Phase 5 wraps our hybrid stack behind FastAPI: `/chat` runs the LangGraph orchestrator, `/predict_today` and `/coach/risk_board` expose the Random Forest. Streamlit gives the coach a ranked evening-risk board and alerts, and students a chat that only shows the pedagogical reply—coach_alert stays on the coach side.”

---

## 14. Self-check

1. What does Phase 5 *not* reimplement?  
2. Why FastAPI in front of Streamlit?  
3. Three main endpoints + one bonus?  
4. Does risk_board use `today_eval_score`?  
5. Where does the student see `coach_alert`?  
6. Two kinds of “history” (API vs UI)?  
7. Happy path for Refresh risk board?

---

## 15. Trap Q&A

**Q: Is Streamlit the AI?**  
A: No — it’s the UI. AI/ML live behind the API.

**Q: Why is `coach_alert` in the `/chat` JSON if students use `/chat`?**  
A: One response, two fields; the **client** chooses what to show. Coach UI reads the alert; Student tab shows only `reply`.

**Q: Could the coach dashboard call `predict` in-process without HTTP?**  
A: Yes technically; we kept HTTP so one API serves UI + Swagger + future clients.

**Q: Auth?**  
A: Out of PoC scope (Phase 6 / production). Demo assumes trusted local use.
