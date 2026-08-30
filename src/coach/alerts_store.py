"""Persist coach alerts so they sync across Streamlit sessions."""

from __future__ import annotations

import json
import os
import threading
from datetime import datetime, timezone
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[2]
_LOCK = threading.Lock()
_MAX_ALERTS = 50


def _store_path() -> Path:
    raw = os.getenv("COACH_ALERTS_PATH", "data/runtime/coach_alerts.json")
    path = Path(raw)
    return path if path.is_absolute() else PROJECT_ROOT / path


def _read_unlocked(path: Path) -> list[dict]:
    if not path.exists():
        return []
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError):
        return []
    return data if isinstance(data, list) else []


def list_alerts(limit: int = 20) -> list[dict]:
    path = _store_path()
    with _LOCK:
        alerts = _read_unlocked(path)
    return list(reversed(alerts[-max(1, limit) :]))


def append_alert(student_id: str, message: str) -> dict:
    text = (message or "").strip()
    if not text:
        raise ValueError("alert message is empty")

    entry = {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "student_id": str(student_id),
        "message": text,
    }
    path = _store_path()
    with _LOCK:
        path.parent.mkdir(parents=True, exist_ok=True)
        alerts = _read_unlocked(path)
        alerts.append(entry)
        alerts = alerts[-_MAX_ALERTS:]
        path.write_text(json.dumps(alerts, indent=2), encoding="utf-8")
    return entry


def clear_alerts() -> None:
    path = _store_path()
    with _LOCK:
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text("[]\n", encoding="utf-8")
