"""Load the trained Random Forest pipeline and predict evening score / at-risk."""

from __future__ import annotations

import os
from pathlib import Path
from typing import Any

import joblib
import pandas as pd
from dotenv import load_dotenv

PROJECT_ROOT = Path(__file__).resolve().parents[2]
load_dotenv(PROJECT_ROOT / ".env")

FEATURE_COLUMNS = [
    "day",
    "topic",
    "exercises_attempted",
    "exercises_solved_correctly",
    "hints_used",
    "time_spent_minutes",
    "previous_eval_score",
]

_model = None


def resolve_model_path(raw: str | None = None) -> Path:
    raw = raw or os.getenv("MODEL_PATH", "models/random_forest.pkl")
    path = Path(raw)
    return path if path.is_absolute() else PROJECT_ROOT / path


def load_model(model_path: Path | None = None):
    global _model
    if _model is not None and model_path is None:
        return _model
    path = model_path or resolve_model_path()
    if not path.exists():
        raise FileNotFoundError(f"Model not found: {path}")
    _model = joblib.load(path)
    return _model


def predict_student(features: dict[str, Any]) -> dict[str, Any]:
    """
    features must include FEATURE_COLUMNS keys.
    Returns predicted_score and at_risk.
    """
    missing = [c for c in FEATURE_COLUMNS if c not in features]
    if missing:
        raise ValueError(f"Missing features: {missing}")

    row = pd.DataFrame([{c: features[c] for c in FEATURE_COLUMNS}])
    model = load_model()
    score = float(model.predict(row)[0])
    threshold = float(os.getenv("AT_RISK_THRESHOLD", "10.0"))
    return {
        "predicted_score": round(score, 2),
        "at_risk": bool(score < threshold),
        "threshold": threshold,
    }