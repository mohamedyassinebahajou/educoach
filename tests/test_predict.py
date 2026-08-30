"""Tests for Random Forest prediction helper."""

from __future__ import annotations

from src.ml.predict import FEATURE_COLUMNS, predict_student


def test_predict_student_at_risk_profile():
    features = {
        "day": 3,
        "topic": "loops",
        "exercises_attempted": 5,
        "exercises_solved_correctly": 1,
        "hints_used": 10,
        "time_spent_minutes": 90,
        "previous_eval_score": 5.0,
    }
    assert set(FEATURE_COLUMNS) <= set(features)
    result = predict_student(features)
    assert "predicted_score" in result
    assert "at_risk" in result
    assert result["at_risk"] is True
    assert result["predicted_score"] < result["threshold"]


def test_predict_student_missing_feature_raises():
    import pytest

    with pytest.raises(ValueError):
        predict_student({"day": 1, "topic": "variables"})