# Phase 5 — API + UI Guide (EduCoach AI)

**Project:** EduCoach AI  
**Goal:** Expose Phase 2–4 through FastAPI, then build a Streamlit app with a **Coach Dashboard** and a **Student Chat**.  
**You write the code.** Detailed typing guide: [`PHASE5_IMPLEMENTATION.md`](PHASE5_IMPLEMENTATION.md).

---

## 1. What Phase 5 delivers

```text
┌──────────────────────┐         HTTP          ┌──────────────────────┐
│  Streamlit UI        │ ───────────────────▶  │  FastAPI             │
│  :8501               │                       │  :8000               │
│                      │                       │                      │
│  Tab: Coach          │  POST /predict_today  │  → ml.predict        │
│  Tab: Student Chat   │  POST /chat           │  → agents.orchestrator│
└──────────────────────┘                       └──────────────────────┘
```

| Surface | Audience | Job |
|---------|----------|-----|
| **API** | machines / Swagger / Streamlit | Stable JSON contracts |
| **Coach Dashboard** | you (IT coach) | Who is at-risk today? Ranked table + status |
| **Student Chat** | simulated student | Talk to Tutor/Helper via `/chat` |

### In / Out of scope

| In Phase 5 | Later (Phase 6) |
|------------|-----------------|
| FastAPI `/chat`, `/predict_today`, health | Full Docker polish / compose tweaks |
| Streamlit 2 tabs | Pytest CI, slides, demo video |
| HTTP client from UI → API | Long-term DB memory |
| Show `coach_alert` on coach side only | Production auth |

---

## 2. Files you will create

| File | Role |
|------|------|
| `src/api/schemas.py` | Pydantic request/response models |
| `src/api/routes.py` | Endpoint handlers |
| `src/api/main.py` | FastAPI app + CORS + router |
| `src/ui/streamlit_app.py` | Coach Dashboard + Student Chat |

You already have: `orchestrator.chat()`, `predict_student()`, Gemini/Ollama via `get_llm()`.

---

## 3. Build order

| Step | What | Why |
|------|------|-----|
| **1** | `schemas.py` | Contracts before routes |
| **2** | `routes.py` | Wire ML + agents |
| **3** | `main.py` | Run API + Swagger |
| **4** | Manual Swagger tests | Prove API before UI |
| **5** | Streamlit Coach tab | Risk table |
| **6** | Streamlit Chat tab | Student UX |
| **7** | End-to-end check | Both tabs via live API |

---

## 4. API contracts (memorize)

### `POST /chat`

**Request**
```json
{
  "student_id": "1",
  "message": "What is a for loop?",
  "features": {
    "day": 3,
    "topic": "loops",
    "exercises_attempted": 5,
    "exercises_solved_correctly": 1,
    "hints_used": 10,
    "time_spent_minutes": 90,
    "previous_eval_score": 5.0
  }
}
```
`features` is optional. If present and at-risk → `coach_alert` filled (coach side).

**Response**
```json
{
  "reply": "...",
  "route": "tutor",
  "blocked": false,
  "block_reason": "",
  "predicted_score": 3.81,
  "at_risk": true,
  "coach_alert": "COACH ALERT — ..."
}
```

### `POST /predict_today`

**Request** — the 7 ML features (same as Phase 2 training).

**Response**
```json
{
  "predicted_score": 12.4,
  "at_risk": false,
  "threshold": 10.0
}
```

### Bonus (recommended): `GET /coach/risk_board`

Loads the latest day from `student_performance.csv`, runs `predict_student` for all 24 students, returns a ranked list for the dashboard (avoids 24 manual Swagger calls).

---

## 5. Definition of Done

- [ ] `uvicorn src.api.main:app --reload` starts without error
- [ ] Swagger `/docs` shows `/chat` and `/predict_today`
- [ ] Chat theory → tutor reply; injection → blocked
- [ ] Predict returns score + at_risk
- [ ] Streamlit Coach tab: 24 students, sorted with 🟢/🔴
- [ ] Streamlit Chat tab: select student 1–24, send messages, see history
- [ ] `coach_alert` visible to coach (dashboard / expander), **not** as the student bubble text

---

## 6. How to run (local)

Terminal A:
```bash
cd /home/ycode/Projet-FR-IA
source .venv/bin/activate
uvicorn src.api.main:app --host 0.0.0.0 --port 8000 --reload
```

Terminal B:
```bash
cd /home/ycode/Projet-FR-IA
source .venv/bin/activate
export API_URL=http://localhost:8000
streamlit run src/ui/streamlit_app.py
```

Open: API docs http://localhost:8000/docs · UI http://localhost:8501  

Ensure `.env` has a working `LLM_PROVIDER` (e.g. `gemini` + `GOOGLE_API_KEY`).
