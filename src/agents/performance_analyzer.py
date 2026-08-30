"""Silent Performance Analyzer: ML risk signal for the coach (not the student)."""

from __future__ import annotations

from src.agents.state import AgentState
from src.ml.predict import predict_student


def run_performance_analyzer(state: AgentState) -> dict:
    """
    Run RF prediction in the background.

    The student reply is never modified here.
    If at-risk, a coach_alert is produced so the coach can decide on
    individual or group tutoring interventions.
    """
    features = state.get("features")
    if not features:
        # No features provided → skip silently (common in early chat tests).
        return {}

    result = predict_student(features)
    student_id = state.get("student_id", "?")
    topic = features.get("topic", "today's topic")
    day = features.get("day", "?")

    updates: dict = {
        "predicted_score": result["predicted_score"],
        "at_risk": result["at_risk"],
        "coach_alert": "",
    }

    if result["at_risk"]:
        updates["coach_alert"] = (
            f"COACH ALERT — student {student_id} is predicted at-risk "
            f"(≈ {result['predicted_score']}/20, threshold {result['threshold']}). "
            f"Day {day} · topic: {topic}. "
            f"Signals suggest heavy struggle (e.g. many hints / low solve rate). "
            f"Consider personalized tutoring for this student, or a short group recap on {topic}."
        )

    return updates
