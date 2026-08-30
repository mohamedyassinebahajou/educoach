"""PoC UI authentication — coach vs learner roles (not production-grade)."""

from __future__ import annotations

import hashlib
import hmac
import os
from dataclasses import dataclass
from pathlib import Path
from typing import Literal

from dotenv import load_dotenv

PROJECT_ROOT = Path(__file__).resolve().parents[2]
load_dotenv(PROJECT_ROOT / ".env")

Role = Literal["coach", "learner"]

# Demo-only salt. Replace with a proper identity provider for production.
_SALT = "educoach-poc-ui-auth"


@dataclass(frozen=True)
class User:
    username: str
    role: Role
    display_name: str
    student_id: str | None = None  # set for learners


def _hash_password(password: str) -> str:
    payload = f"{_SALT}:{password}".encode("utf-8")
    return hashlib.sha256(payload).hexdigest()


def _coach_password() -> str:
    return os.getenv("UI_COACH_PASSWORD", "coach123")


def _learner_password() -> str:
    return os.getenv("UI_LEARNER_PASSWORD", "student123")


def build_users() -> dict[str, tuple[str, User]]:
    """
    username -> (password_hash, User)

    Demo accounts:
      coach / (UI_COACH_PASSWORD or coach123)
      student1 … student24 / (UI_LEARNER_PASSWORD or student123)
    """
    users: dict[str, tuple[str, User]] = {
        "coach": (
            _hash_password(_coach_password()),
            User(username="coach", role="coach", display_name="IT Coach"),
        )
    }
    learner_hash = _hash_password(_learner_password())
    for i in range(1, 25):
        username = f"student{i}"
        users[username] = (
            learner_hash,
            User(
                username=username,
                role="learner",
                display_name=f"Student {i}",
                student_id=str(i),
            ),
        )
    return users


USERS = build_users()


def authenticate(username: str, password: str) -> User | None:
    key = (username or "").strip().lower()
    entry = USERS.get(key)
    if entry is None:
        return None
    expected_hash, user = entry
    if not hmac.compare_digest(expected_hash, _hash_password(password)):
        return None
    return user


def demo_credentials_hint() -> str:
    return (
        f"**Coach:** `coach` / `{_coach_password()}`  \n"
        f"**Learner:** `student1` … `student24` / `{_learner_password()}`"
    )
