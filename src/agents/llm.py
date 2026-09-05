"""Shared LLM client for EduCoach agents (local Ollama or online API)."""

from __future__ import annotations

import os
from functools import lru_cache
from pathlib import Path
from typing import Any

from dotenv import load_dotenv
from langchain_core.language_models.chat_models import BaseChatModel
from langchain_core.messages import BaseMessage

PROJECT_ROOT = Path(__file__).resolve().parents[2]
load_dotenv(PROJECT_ROOT / ".env")

SUPPORTED_PROVIDERS = ("ollama", "gemini", "groq", "openai", "anthropic", "claude")


def _temperature() -> float:
    return float(os.getenv("LLM_TEMPERATURE", "0.2"))


def build_llm(provider: str) -> BaseChatModel:
    """Build an LLM client for a named provider."""
    name = provider.strip().lower()
    temperature = _temperature()

    if name == "ollama":
        from langchain_ollama import ChatOllama

        return ChatOllama(
            model=os.getenv("OLLAMA_MODEL", "llama3.2:3b"),
            base_url=os.getenv("OLLAMA_HOST", "http://localhost:11434"),
            temperature=temperature,
        )

    if name == "gemini":
        from langchain_google_genai import ChatGoogleGenerativeAI

        api_key = (
            os.getenv("GOOGLE_API_KEY", "").strip()
            or os.getenv("GEMINI_API_KEY", "").strip()
        )
        if not api_key:
            raise ValueError(
                "LLM_PROVIDER=gemini requires GOOGLE_API_KEY in .env. "
                "Get a key at https://aistudio.google.com/apikey"
            )
        return ChatGoogleGenerativeAI(
            model=os.getenv("GEMINI_MODEL", "gemini-3.5-flash-lite"),
            google_api_key=api_key,
            temperature=temperature,
        )

    if name == "groq":
        from langchain_groq import ChatGroq

        api_key = os.getenv("GROQ_API_KEY", "").strip()
        if not api_key:
            raise ValueError(
                "LLM_PROVIDER=groq requires GROQ_API_KEY in .env. "
                "Get a free key at https://console.groq.com/keys"
            )
        return ChatGroq(
            model=os.getenv("GROQ_MODEL", "openai/gpt-oss-20b"),
            api_key=api_key,
            temperature=temperature,
        )

    if name == "openai":
        from langchain_openai import ChatOpenAI

        api_key = os.getenv("OPENAI_API_KEY", "").strip()
        if not api_key:
            raise ValueError(
                "LLM_PROVIDER=openai requires OPENAI_API_KEY in .env."
            )
        return ChatOpenAI(
            model=os.getenv("OPENAI_MODEL", "gpt-4o-mini"),
            api_key=api_key,
            temperature=temperature,
        )

    if name in {"anthropic", "claude"}:
        from langchain_anthropic import ChatAnthropic

        api_key = os.getenv("ANTHROPIC_API_KEY", "").strip()
        if not api_key:
            raise ValueError(
                "LLM_PROVIDER=anthropic requires ANTHROPIC_API_KEY in .env. "
                "Create one at https://console.anthropic.com/"
            )
        return ChatAnthropic(
            model=os.getenv("ANTHROPIC_MODEL", "claude-3-5-haiku-latest"),
            api_key=api_key,
            temperature=temperature,
        )

    raise ValueError(
        f"Unknown LLM provider={name!r}. "
        "Use: ollama | gemini | groq | openai | anthropic"
    )


@lru_cache(maxsize=8)
def get_llm_for_provider(provider: str) -> BaseChatModel:
    return build_llm(provider)


@lru_cache(maxsize=1)
def get_llm() -> BaseChatModel:
    """Primary LLM from LLM_PROVIDER."""
    primary = os.getenv("LLM_PROVIDER", "ollama").strip().lower()
    return get_llm_for_provider(primary)


def invoke_with_fallback(messages: list[BaseMessage]) -> tuple[str, str]:
    """
    Call the primary LLM; on any failure, retry with LLM_PROVIDER_FALLBACK.

    Returns (response_text, provider_used).
    """
    primary = os.getenv("LLM_PROVIDER", "ollama").strip().lower()
    fallback = os.getenv("LLM_PROVIDER_FALLBACK", "").strip().lower()

    try:
        response = get_llm_for_provider(primary).invoke(messages)
        content = (response.content or "").strip()
        if not content:
            raise ValueError(f"{primary} returned an empty response")
        return content, primary
    except Exception as primary_err:
        if not fallback or fallback == primary:
            raise primary_err

        try:
            response = get_llm_for_provider(fallback).invoke(messages)
            content = (response.content or "").strip()
            if not content:
                raise ValueError(f"{fallback} returned an empty response")
            return content, fallback
        except Exception as fallback_err:
            raise RuntimeError(
                f"Primary LLM ({primary}) failed: {primary_err}. "
                f"Fallback LLM ({fallback}) also failed: {fallback_err}."
            ) from fallback_err


def reset_llm_cache() -> None:
    """Call after changing .env in the same Python process."""
    get_llm.cache_clear()
    get_llm_for_provider.cache_clear()
