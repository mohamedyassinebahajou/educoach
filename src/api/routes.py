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
    CoachAlert,
    CoachAlertsResponse,
    PredictRequest,
    PredictResponse,
    RiskBoardResponse,
    RiskBoardRow,
)
from src.coach.alerts_store import append_alert, list_alerts
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

    alert = (result.get("coach_alert") or "").strip()
    if alert:
        append_alert(body.student_id, alert)

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


@router.get("/coach/alerts", response_model=CoachAlertsResponse)
def coach_alerts(limit: int = 20) -> CoachAlertsResponse:
    """Recent coach_alert messages produced by /chat (shared across UI sessions)."""
    safe_limit = max(1, min(int(limit), 50))
    raw = list_alerts(limit=safe_limit)
    return CoachAlertsResponse(alerts=[CoachAlert(**item) for item in raw])