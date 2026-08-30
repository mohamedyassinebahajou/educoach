"""Shared LangGraph state for EduCoach agents."""

from __future__ import annotations

from typing import Any, Literal, TypedDict


Route = Literal["tutor", "helper"]


class AgentState(TypedDict, total=False):
    """Data passed between graph nodes."""

    student_id: str
    message: str
    route: Route
    history_text: str
    reply: str
    blocked: bool
    block_reason: str
    predicted_score: float
    at_risk: bool
    # Coach-only signal (never shown to the student in the chat reply)
    coach_alert: str
    # Optional ML features for the analyzer (from API later / smoke tests now)
    features: dict[str, Any]