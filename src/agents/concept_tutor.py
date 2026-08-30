"""Concept Tutor: answer theory questions from RAG context only."""

from __future__ import annotations

from langchain_core.messages import HumanMessage, SystemMessage

from src.agents.llm import get_llm
from src.agents.state import AgentState
from src.rag.retrieval import format_context, retrieve_context

SYSTEM_PROMPT = """You are EduCoach Concept Tutor for a JavaScript bootcamp (EduCoach JS).
Answer ONLY using the provided lesson context.
Cite the day when possible (e.g. "According to Day 3...").
When the context contains worked examples, include:
1) the JavaScript code sample, and
2) the step-by-step execution / Output shown in the lesson.
Do not invent code or outputs that are not in the context.
If the context is insufficient, say you are not sure and suggest reviewing the relevant lesson.
Be clear, short, and beginner-friendly.
Do NOT provide a full exercise solution for graded mini-exercises.
Prefer core JavaScript (console, strings, arrays, objects, functions) — not DOM, events, or fetch unless the context explicitly includes them.
"""


def run_concept_tutor(state: AgentState) -> dict:
    question = state["message"]
    docs = retrieve_context(question)
    context = format_context(docs)

    history = state.get("history_text") or ""
    user_block = (
        f"Conversation so far:\n{history}\n\n"
        if history
        else ""
    ) + f"Lesson context:\n{context}\n\nStudent question:\n{question}"

    llm = get_llm()
    response = llm.invoke(
        [
            SystemMessage(content=SYSTEM_PROMPT),
            HumanMessage(content=user_block),
        ]
    )
    return {"reply": response.content.strip()}