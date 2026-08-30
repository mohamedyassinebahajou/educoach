"""Detect common prompt-injection / jailbreak attempts."""

from __future__ import annotations

import re

INJECTION_PATTERNS: list[tuple[str, str]] = [
    (r"ignore\s+(all\s+)?(previous|prior|above)\s+instructions?", "prompt injection"),
    (r"disregard\s+(all\s+)?(previous|prior|above)\s+instructions?", "prompt injection"),
    (r"you\s+are\s+now\s+(dan|unrestricted|jailbroken)", "jailbreak attempt"),
    (r"system\s+prompt\s*:", "attempt to override system prompt"),
    (r"reveal\s+(your|the)\s+(system\s+)?prompt", "prompt exfiltration"),
    (r"(give|output|write|provide)\s+(me\s+)?(the\s+)?(full|complete)\s+solution", "solution dump request"),
    (r"do\s+not\s+follow\s+your\s+rules", "rule bypass"),
]


def detect_prompt_injection(text: str) -> tuple[bool, str]:
    """Return (is_injection, reason)."""
    cleaned = (text or "").strip()
    if not cleaned:
        return False, "ok"

    for pattern, reason in INJECTION_PATTERNS:
        if re.search(pattern, cleaned, flags=re.IGNORECASE):
            return True, reason

    return False, "ok"