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


class CoachAlert(BaseModel):
    timestamp: str
    student_id: str
    message: str


class CoachAlertsResponse(BaseModel):
    alerts: list[CoachAlert]


class GradeRequest(BaseModel):
    exercise_id: str = Field(..., min_length=1)
    title: str = Field(..., min_length=1)
    prompt: str = Field(..., min_length=1)
    code: str = ""
    console_output: str = ""
    auto_tests_passed: bool = False
    auto_test_summary: str = ""


class GradeResponse(BaseModel):
    passed: bool
    feedback: str
    reasons: list[str] = Field(default_factory=list)