"""Routing tests without calling the LLM."""

from __future__ import annotations

from src.agents.orchestrator import supervisor_node


def test_supervisor_routes_theory_to_tutor():
    out = supervisor_node({"message": "What is a for loop in Python?", "blocked": False})
    assert out["route"] == "tutor"


def test_supervisor_routes_debug_to_helper():
    out = supervisor_node(
        {"message": "My while True loop never stops and has a bug", "blocked": False}
    )
    assert out["route"] == "helper"