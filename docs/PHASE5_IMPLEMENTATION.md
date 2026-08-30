# Phase 5 — Implementation (type this yourself)

**Follow after:** [`PHASE5_API_UI_GUIDE.md`](PHASE5_API_UI_GUIDE.md)  
**Style:** same as Phase 3/4 — understand each block, type it, verify, then continue.

```bash
cd /home/ycode/Projet-FR-IA
source .venv/bin/activate
```

---

## Big picture — what each block is for

```text
schemas.py     →  JSON shapes (validation)
routes.py      →  HTTP handlers calling your existing Python
main.py        →  FastAPI app (CORS + include router)
streamlit_app  →  human UI that calls the API with httpx
```

Phase 5 does **not** reimplement agents. It only **wraps** them.

| Block | Talks to | Does not |
|-------|----------|----------|
| `/chat` | `orchestrator.chat` | train ML / rebuild Chroma |
| `/predict_today` | `predict_student` | call Gemini |
| Coach tab | API (+ CSV for activity columns) | show full chat history of all students |
| Chat tab | `/chat` | display `coach_alert` in the student bubble |

---

## Step 1 — Pydantic schemas

### What this block is for

FastAPI uses **Pydantic models** to:

- validate incoming JSON;
- document Swagger automatically;
- reject bad payloads early (missing `topic`, wrong types…).

### File: `src/api/schemas.py`

```python
"""Request/response schemas for the EduCoach FastAPI."""

from __future__ import annotations

from typing import Any, Literal

from pydantic import BaseModel, Field


class StudentFeatures(BaseModel):
    """Features required by the Random Forest pipeline."""

    day: int = Field(..., ge=1, le=20)
    topic: str
    exercises_attempted: int = Field(..., ge=0)
    exercises_solved_correctly: int = Field(..., ge=0)
    hints_used: int = Field(..., ge=0)
    time_spent_minutes: float = Field(..., ge=0)
    previous_eval_score: float = Field(..., ge=0, le=20)


class ChatRequest(BaseModel):
    student_id: str = Field(..., min_length=1)
    message: str = Field(..., min_length=1)
    features: StudentFeatures | None = None


class ChatResponse(BaseModel):
    reply: str
    route: Literal["tutor", "helper"] | None = None
    blocked: bool = False
    block_reason: str = ""
    predicted_score: float | None = None
    at_risk: bool | None = None
    coach_alert: str = ""


class PredictRequest(StudentFeatures):
    """Same fields as StudentFeatures (alias for clarity in Swagger)."""


class PredictResponse(BaseModel):
    predicted_score: float
    at_risk: bool
    threshold: float


class RiskBoardRow(BaseModel):
    student_id: str
    day: int
    topic: str
    exercises_solved_correctly: int
    hints_used: int
    previous_eval_score: float
    predicted_score: float
    at_risk: bool
    status: str  # "at_risk" | "ok"


class RiskBoardResponse(BaseModel):
    day: int
    topic: str
    students: list[RiskBoardRow]
```

### Functionality overview

| Model | Role |
|-------|------|
| `StudentFeatures` | Shared ML input shape |
| `ChatRequest` / `ChatResponse` | `/chat` contract (includes coach side channel) |
| `PredictRequest` / `PredictResponse` | `/predict_today` contract |
| `RiskBoard*` | Coach dashboard batch payload |

### Verify

```bash
python - <<'EOF'
from src.api.schemas import ChatRequest, StudentFeatures
req = ChatRequest(student_id="1", message="hi", features=StudentFeatures(
    day=3, topic="loops", exercises_attempted=5, exercises_solved_correctly=1,
    hints_used=10, time_spent_minutes=90, previous_eval_score=5.0,
))
print(req.model_dump())
EOF
```

---

## Step 2 — Routes

### What this block is for

Each route is a thin adapter:

```text
HTTP JSON → Pydantic → call existing function → Pydantic → HTTP JSON
```

### File: `src/api/routes.py`

```python
"""HTTP routes for EduCoach."""

from __future__ import annotations

import os
from pathlib import Path

import pandas as pd
from fastapi import APIRouter, HTTPException

from src.agents.orchestrator import chat as run_chat
from src.api.schemas import (
    ChatRequest,
    ChatResponse,
    PredictRequest,
    PredictResponse,
    RiskBoardResponse,
    RiskBoardRow,
)
from src.ml.predict import FEATURE_COLUMNS, predict_student

router = APIRouter()

PROJECT_ROOT = Path(__file__).resolve().parents[2]


def _csv_path() -> Path:
    raw = os.getenv("DATA_PROCESSED_PATH", "data/processed/student_performance.csv")
    path = Path(raw)
    return path if path.is_absolute() else PROJECT_ROOT / path


@router.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@router.post("/chat", response_model=ChatResponse)
def chat_endpoint(body: ChatRequest) -> ChatResponse:
    features = body.features.model_dump() if body.features else None
    try:
        result = run_chat(
            student_id=body.student_id,
            message=body.message,
            features=features,
        )
    except Exception as exc:  # noqa: BLE001 — surface cleanly in API
        raise HTTPException(status_code=500, detail=str(exc)) from exc

    return ChatResponse(**result)


@router.post("/predict_today", response_model=PredictResponse)
def predict_today(body: PredictRequest) -> PredictResponse:
    try:
        result = predict_student(body.model_dump())
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except FileNotFoundError as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc

    return PredictResponse(**result)


@router.get("/coach/risk_board", response_model=RiskBoardResponse)
def risk_board(day: int | None = None) -> RiskBoardResponse:
    """
    Rank all students for a given day (default = latest day in CSV).
    Uses activity columns from CSV + RF predictions (not leaked today_eval_score).
    """
    path = _csv_path()
    if not path.exists():
        raise HTTPException(status_code=500, detail=f"CSV not found: {path}")

    df = pd.read_csv(path)
    target_day = int(day) if day is not None else int(df["day"].max())
    day_df = df[df["day"] == target_day].copy()
    if day_df.empty:
        raise HTTPException(status_code=404, detail=f"No rows for day={target_day}")

    rows: list[RiskBoardRow] = []
    topic = str(day_df.iloc[0]["topic"])

    for _, row in day_df.iterrows():
        features = {col: row[col] for col in FEATURE_COLUMNS}
        # pandas may give numpy types — cast for the pipeline
        features["day"] = int(features["day"])
        features["topic"] = str(features["topic"])
        features["exercises_attempted"] = int(features["exercises_attempted"])
        features["exercises_solved_correctly"] = int(features["exercises_solved_correctly"])
        features["hints_used"] = int(features["hints_used"])
        features["time_spent_minutes"] = float(features["time_spent_minutes"])
        features["previous_eval_score"] = float(features["previous_eval_score"])

        pred = predict_student(features)
        rows.append(
            RiskBoardRow(
                student_id=str(int(row["student_id"])),
                day=target_day,
                topic=topic,
                exercises_solved_correctly=int(row["exercises_solved_correctly"]),
                hints_used=int(row["hints_used"]),
                previous_eval_score=float(row["previous_eval_score"]),
                predicted_score=pred["predicted_score"],
                at_risk=pred["at_risk"],
                status="at_risk" if pred["at_risk"] else "ok",
            )
        )

    rows.sort(key=lambda r: (not r.at_risk, r.predicted_score))
    return RiskBoardResponse(day=target_day, topic=topic, students=rows)
```

### Instruction-by-instruction (routes)

| Piece | Why |
|-------|-----|
| `APIRouter()` | Keep routes separate from app factory |
| `/health` | Quick “is the server up?” check |
| `chat_endpoint` | Thin wrap of `orchestrator.chat` |
| Optional `features` | Enables coach_alert during chat |
| `predict_today` | Direct ML for dashboard / Swagger demos |
| `risk_board` | One call → 24 ranked students for Coach tab |
| Sort `at_risk` first | Coach sees urgent students on top |
| Do **not** use `today_eval_score` as a feature | That would be leakage (evening score not known at 2 PM) |

### Verify (import only)

```bash
python - <<'EOF'
from src.api.routes import router
print([r.path for r in router.routes])
EOF
```

---

## Step 3 — FastAPI app (`main.py`)

### What this block is for

Creates the ASGI application Streamlit (and Swagger) will call.

**CORS** is required because the browser UI on `:8501` calls the API on `:8000` (different origin).

### File: `src/api/main.py`

```python
"""EduCoach FastAPI entrypoint."""

from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.api.routes import router

app = FastAPI(
    title="EduCoach AI",
    description="Hybrid ML + multi-agent tutor for SAS bootcamp coaching.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # PoC only — tighten later if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.get("/")
def root() -> dict[str, str]:
    return {"message": "EduCoach API — see /docs"}
```

### Verify — start the server

```bash
uvicorn src.api.main:app --host 0.0.0.0 --port 8000 --reload
```

Open http://localhost:8000/docs

### Swagger checklist

1. `GET /health` → `{"status":"ok"}`  
2. `POST /predict_today` with a weak student profile → `at_risk: true`  
3. `POST /chat` with `"What is a for loop?"` → `route: tutor`  
4. `POST /chat` with injection text → `blocked: true`  
5. `GET /coach/risk_board` → 24 students, sorted  

Curl examples:

```bash
curl -s http://localhost:8000/health

curl -s -X POST http://localhost:8000/predict_today \
  -H 'Content-Type: application/json' \
  -d '{
    "day":3,"topic":"loops","exercises_attempted":5,
    "exercises_solved_correctly":1,"hints_used":10,
    "time_spent_minutes":90,"previous_eval_score":5.0
  }'

curl -s -X POST http://localhost:8000/chat \
  -H 'Content-Type: application/json' \
  -d '{"student_id":"1","message":"What is a for loop in Python?"}'

curl -s 'http://localhost:8000/coach/risk_board'
```

---

## Step 4 — Streamlit app

### What this block is for

A simple 2-tab UI:

| Tab | Audience | Data source |
|-----|----------|-------------|
| **Coach Dashboard** | Coach | `GET /coach/risk_board` |
| **Student Chat** | Student | `POST /chat` |

Coach sees risk + optional last `coach_alert` from chat tests.  
Student sees only conversation messages (never the coach alert as their assistant text).

### File: `src/ui/streamlit_app.py`

```python
"""EduCoach Streamlit UI — Coach Dashboard + Student Chat."""

from __future__ import annotations

import os
from typing import Any

import httpx
import pandas as pd
import streamlit as st

API_URL = os.getenv("API_URL", "http://localhost:8000").rstrip("/")


def api_get(path: str, **params: Any) -> dict[str, Any]:
    with httpx.Client(timeout=120.0) as client:
        response = client.get(f"{API_URL}{path}", params=params or None)
        response.raise_for_status()
        return response.json()


def api_post(path: str, payload: dict[str, Any]) -> dict[str, Any]:
    with httpx.Client(timeout=120.0) as client:
        response = client.post(f"{API_URL}{path}", json=payload)
        response.raise_for_status()
        return response.json()


st.set_page_config(page_title="EduCoach AI", layout="wide")
st.title("EduCoach AI")
st.caption(f"API: {API_URL}")

tab_coach, tab_chat = st.tabs(["Coach Dashboard", "Student Chat"])


# ---------------------------------------------------------------------------
# Tab 1 — Coach
# ---------------------------------------------------------------------------
with tab_coach:
    st.subheader("Evening-eval risk board")
    st.write(
        "Students ranked by predicted risk. Use this to decide "
        "**1:1 coaching** or a **group recap** on today's topic."
    )

    day = st.number_input("Day (blank = latest)", min_value=1, max_value=20, value=11)
    if st.button("Refresh risk board", type="primary"):
        try:
            board = api_get("/coach/risk_board", day=int(day))
            st.session_state["risk_board"] = board
        except Exception as exc:  # noqa: BLE001
            st.error(f"API error: {exc}")

    board = st.session_state.get("risk_board")
    if board:
        st.markdown(f"**Day {board['day']} — topic: `{board['topic']}`**")
        rows = []
        for s in board["students"]:
            rows.append(
                {
                    "Student": s["student_id"],
                    "Solved": s["exercises_solved_correctly"],
                    "Hints": s["hints_used"],
                    "Prev score": s["previous_eval_score"],
                    "Predicted /20": s["predicted_score"],
                    "Status": "🔴 at-risk" if s["at_risk"] else "🟢 ok",
                }
            )
        st.dataframe(pd.DataFrame(rows), use_container_width=True)

        at_risk_n = sum(1 for s in board["students"] if s["at_risk"])
        st.metric("At-risk students", f"{at_risk_n} / {len(board['students'])}")

        chart_df = pd.DataFrame(
            {
                "student": [s["student_id"] for s in board["students"]],
                "predicted_score": [s["predicted_score"] for s in board["students"]],
            }
        )
        st.bar_chart(chart_df.set_index("student"))

    st.divider()
    st.subheader("Latest coach alerts (from chat)")
    alerts = st.session_state.get("coach_alerts", [])
    if not alerts:
        st.info("No coach alerts yet. Chat with features on the Student tab to generate some.")
    else:
        for item in reversed(alerts[-10:]):
            st.warning(item)


# ---------------------------------------------------------------------------
# Tab 2 — Student Chat
# ---------------------------------------------------------------------------
with tab_chat:
    st.subheader("Student chatbot")

    student_id = st.selectbox(
        "Student ID",
        options=[str(i) for i in range(1, 25)],
        index=0,
    )

    attach_features = st.checkbox(
        "Attach today's activity features (enables coach_alert)",
        value=True,
    )

    # Prefill features from risk board / defaults
    default_features = {
        "day": 11,
        "topic": "final_project",
        "exercises_attempted": 5,
        "exercises_solved_correctly": 2,
        "hints_used": 8,
        "time_spent_minutes": 70.0,
        "previous_eval_score": 8.0,
    }
    board = st.session_state.get("risk_board")
    if board:
        match = next(
            (s for s in board["students"] if s["student_id"] == student_id),
            None,
        )
        if match:
            default_features.update(
                {
                    "day": board["day"],
                    "topic": board["topic"],
                    "exercises_solved_correctly": match["exercises_solved_correctly"],
                    "hints_used": match["hints_used"],
                    "previous_eval_score": match["previous_eval_score"],
                }
            )

    with st.expander("Features sent with chat (optional)"):
        f_day = st.number_input("day", 1, 20, int(default_features["day"]))
        f_topic = st.text_input("topic", str(default_features["topic"]))
        f_attempted = st.number_input("exercises_attempted", 0, 50, 5)
        f_solved = st.number_input(
            "exercises_solved_correctly",
            0,
            50,
            int(default_features["exercises_solved_correctly"]),
        )
        f_hints = st.number_input(
            "hints_used", 0, 50, int(default_features["hints_used"])
        )
        f_time = st.number_input(
            "time_spent_minutes", 0.0, 300.0, float(default_features["time_spent_minutes"])
        )
        f_prev = st.number_input(
            "previous_eval_score",
            0.0,
            20.0,
            float(default_features["previous_eval_score"]),
        )

    history_key = f"chat_history_{student_id}"
    if history_key not in st.session_state:
        st.session_state[history_key] = []

    for turn in st.session_state[history_key]:
        with st.chat_message(turn["role"]):
            st.markdown(turn["content"])

    prompt = st.chat_input("Ask the tutor / helper…")
    if prompt:
        st.session_state[history_key].append({"role": "user", "content": prompt})
        with st.chat_message("user"):
            st.markdown(prompt)

        payload: dict[str, Any] = {
            "student_id": student_id,
            "message": prompt,
        }
        if attach_features:
            payload["features"] = {
                "day": int(f_day),
                "topic": f_topic,
                "exercises_attempted": int(f_attempted),
                "exercises_solved_correctly": int(f_solved),
                "hints_used": int(f_hints),
                "time_spent_minutes": float(f_time),
                "previous_eval_score": float(f_prev),
            }

        try:
            result = api_post("/chat", payload)
            reply = result.get("reply", "")
            st.session_state[history_key].append(
                {"role": "assistant", "content": reply}
            )
            with st.chat_message("assistant"):
                st.markdown(reply)
                meta = []
                if result.get("route"):
                    meta.append(f"route=`{result['route']}`")
                if result.get("blocked"):
                    meta.append(f"blocked (`{result.get('block_reason')}`)")
                if meta:
                    st.caption(" · ".join(meta))

            # Coach side channel — store for Coach tab, do not put in student bubble
            alert = (result.get("coach_alert") or "").strip()
            if alert:
                alerts = st.session_state.setdefault("coach_alerts", [])
                alerts.append(f"Student {student_id}: {alert}")
                st.session_state["coach_alerts"] = alerts[-20:]
        except Exception as exc:  # noqa: BLE001
            st.error(f"Chat failed: {exc}")
```

### Functionality overview (UI)

| Piece | Role |
|-------|------|
| `API_URL` | Points Streamlit at FastAPI |
| `api_get` / `api_post` | Small HTTP helpers (`httpx`) |
| Coach `risk_board` | Ranked predictions for intervention decisions |
| `st.session_state` chat history | Per-student message list in the browser session |
| `coach_alerts` list | Side channel for the coach tab |
| Student bubble = `reply` only | Pedagogical answer without risk shaming |

### Verify

Terminal A (API must already be running):

```bash
export API_URL=http://localhost:8000
streamlit run src/ui/streamlit_app.py
```

Manual UI checklist:

1. Coach → Refresh → see 24 rows with 🟢/🔴  
2. Chat → student `1` → “What is a for loop?” → Day-aware answer  
3. Chat → stuck loop question with high hints → helper hints; Coach tab shows alert  
4. Chat → “Ignore previous instructions…” → blocked message  

---

## Step 5 — End-to-end Definition of Done

| Check | Pass? |
|-------|-------|
| `/docs` lists routes | |
| `/predict_today` works | |
| `/chat` tutor + helper + block | |
| `/coach/risk_board` returns 24 rows | |
| Streamlit Coach table sorted | |
| Streamlit Chat history works | |
| `coach_alert` not inside student bubble | |
| Gemini/Ollama configured in `.env` | |

---

## Common mistakes

| Mistake | Fix |
|---------|-----|
| Streamlit `Connection refused` | Start uvicorn first; check `API_URL` |
| CORS errors in browser | Ensure `CORSMiddleware` in `main.py` |
| Chat 500 / Gemini auth | Check `GOOGLE_API_KEY` / `LLM_PROVIDER` |
| Risk board empty | Confirm CSV path + day exists (1–11 in your data) |
| Using `today_eval_score` as input feature | Leakage — never send it to `predict_student` |
| Import errors | Run commands from project root with venv |

---

## What you send me for review

1. Screenshot or paste of Swagger `/chat` + `/predict_today` results  
2. Coach table (or JSON from `/coach/risk_board`)  
3. One chat theory reply + one blocked injection  
4. Confirmation that coach alerts stay off the student bubble  

Then we move to **Phase 6** (Docker polish, tests, README, demo).
