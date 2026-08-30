"""In-<emory short-term conversation history [last N turns.]"""

from __future__ import annotations

import os 
from collections import defaultdict

def _max_turns() -> int:
    raw = os.getenv("SHORT_TERM_MEMORY_TURNS","5")
    value = int(raw)
    if value <= 0 :
        raise ValueError("SHORT_TERM_MEMORY_TURNS must be > 0")
    return value


class ShortTermMemory:
    """Store recent {role, content} messages per student_id."""

    def __init__(self, max_turns: int | None = None) -> None:
        self.max_turns = max_turns or _max_turns()
        self._store: dict[str, list[dict[str, str]]] = defaultdict(list)

    def get(self, student_id: str) -> list[dict[str, str]]:
        return list(self._store.get(str(student_id), []))

    def add(self, student_id: str, role: str, content: str) -> None:
        key = str(student_id)
        self._store[key].append({"role": role, "content": content})
        limit = self.max_turns * 2
        if len(self._store[key]) > limit:
            self._store[key] = self._store[key][-limit:]

    def clear(self, student_id: str) -> None:
        self._store.pop(str(student_id), None)

    def as_text(self, student_id: str) -> str:
        """Flatten history for prompts."""
        lines: list[str] = []
        for msg in self.get(student_id):
            lines.append(f"{msg['role'].upper()}: {msg['content']}")
        return "\n".join(lines)

MEMORY = ShortTermMemory()