"""Solution Grader: judge whether learner code satisfies the exercise prompt."""

from __future__ import annotations

import json
import re

from langchain_core.messages import HumanMessage, SystemMessage

from src.agents.llm import invoke_with_fallback

SYSTEM_PROMPT = """You are EduCoach Solution Grader for a beginner JavaScript bootcamp.
Your job is to decide whether a student's submitted code correctly solves the exercise prompt.

Rules:
- Judge against the exercise PROMPT and expected behavior, not style preferences.
- If automated tests passed, still reject cheating (e.g. hard-coded console.log output
  without doing what the prompt asked, or ignoring required logic).
- Accept multiple valid implementations when they genuinely satisfy the prompt.
- Be strict but fair for beginners — small style issues should not fail a correct solution.
- Feedback must be encouraging and actionable (2-4 short sentences).
- Do NOT rewrite or provide the full corrected solution in feedback.
- Respond with ONLY valid JSON (no markdown fences), exactly this shape:
{"passed": true, "feedback": "...", "reasons": ["...", "..."]}
"""


def _parse_json_response(text: str) -> dict:
    cleaned = text.strip()
    if cleaned.startswith("```"):
        cleaned = re.sub(r"^```(?:json)?\s*", "", cleaned)
        cleaned = re.sub(r"\s*```$", "", cleaned)

    try:
        data = json.loads(cleaned)
    except json.JSONDecodeError:
        match = re.search(r"\{.*\}", cleaned, flags=re.DOTALL)
        if not match:
            raise ValueError("Grader did not return JSON") from None
        data = json.loads(match.group(0))

    passed = bool(data.get("passed"))
    feedback = str(data.get("feedback") or "").strip()
    reasons_raw = data.get("reasons") or []
    reasons = [str(r).strip() for r in reasons_raw if str(r).strip()]
    if not feedback:
        feedback = (
            "Your solution looks correct."
            if passed
            else "Your solution does not fully match what the exercise asked for."
        )
    return {"passed": passed, "feedback": feedback, "reasons": reasons}


def grade_solution(
    *,
    exercise_id: str,
    title: str,
    prompt: str,
    code: str,
    console_output: str,
    auto_tests_passed: bool,
    auto_test_summary: str,
) -> dict:
    """Return {passed, feedback, reasons}."""
    if not auto_tests_passed:
        return {
            "passed": False,
            "feedback": "Fix the failing automated checks before submitting.",
            "reasons": ["Automated tests did not pass."],
        }

    user_block = "\n".join(
        [
            f"Exercise ID: {exercise_id}",
            f"Title: {title}",
            "",
            "Prompt:",
            prompt,
            "",
            "Automated test result: PASSED",
            auto_test_summary or "(no detailed summary)",
            "",
            "Student code:",
            "```js",
            code.strip() or "// (empty)",
            "```",
            "",
            "Console output when run:",
            "```",
            console_output.strip() or "(empty)",
            "```",
            "",
            "Does this submission correctly solve the exercise? Reply with JSON only.",
        ]
    )

    content, _provider = invoke_with_fallback(
        [
            SystemMessage(content=SYSTEM_PROMPT),
            HumanMessage(content=user_block),
        ]
    )
    return _parse_json_response(content)
