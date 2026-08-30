"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

export type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

type TutorProps = {
  mode: "tutor";
  lessonSlug: string;
  lessonTitle: string;
  open: boolean;
  onClose: () => void;
};

type HelperProps = {
  mode: "helper";
  exerciseId: string;
  exerciseTitle: string;
  code: string;
  failingLabels: string[];
  open: boolean;
  onClose: () => void;
};

type ChatDrawerProps = TutorProps | HelperProps;

/**
 * Learner chat drawer. Renders API `reply` only — never `coach_alert`.
 */
export function ChatDrawer(props: ChatDrawerProps) {
  const inputId = useId();
  const listRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const contextLabel =
    props.mode === "tutor"
      ? `Lesson “${props.lessonTitle}”`
      : `${props.exerciseId} · ${props.exerciseTitle}`;

  useEffect(() => {
    if (!props.open) return;
    setMessages([]);
    setDraft("");
    setError(null);
  }, [props.open, props.mode]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, pending]);

  const send = useCallback(async () => {
    const text = draft.trim();
    if (!text || pending) return;
    setDraft("");
    setError(null);
    setMessages((m) => [...m, { role: "user", text }]);
    setPending(true);

    try {
      const body =
        props.mode === "tutor"
          ? { mode: "tutor" as const, message: text, lessonSlug: props.lessonSlug }
          : {
              mode: "helper" as const,
              message: text,
              exerciseId: props.exerciseId,
              code: props.code,
              failingLabels: props.failingLabels,
            };

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.status === 401) {
        setError("Sign in required.");
        setPending(false);
        return;
      }
      if (!res.ok) {
        setError("Chat request failed.");
        setPending(false);
        return;
      }

      const data = (await res.json()) as {
        reply?: string;
        // Intentionally ignore coach_alert / at_risk in the learner UI.
      };

      const reply = data.reply?.trim() || "No reply.";
      setMessages((m) => [...m, { role: "assistant", text: reply }]);
    } catch {
      setError("Network error.");
    } finally {
      setPending(false);
    }
  }, [draft, pending, props]);

  if (!props.open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/25"
      role="dialog"
      aria-modal="true"
      aria-label={props.mode === "tutor" ? "Tutor" : "Code Helper"}
      onClick={(e) => {
        if (e.target === e.currentTarget) props.onClose();
      }}
    >
      <div className="flex h-full w-full max-w-md flex-col border-l border-[var(--border)] bg-[var(--surface)] shadow-xl">
        <header className="flex items-start justify-between gap-3 border-b border-[var(--border)] px-4 py-3">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--ink)]">
              {props.mode === "tutor" ? "Tutor" : "Code Helper"}
            </h2>
            <p className="mt-0.5 text-xs text-[var(--muted)]">Context: {contextLabel}</p>
            {props.mode === "helper" ? (
              <p className="mt-1 text-xs font-medium text-[var(--accent)]">
                Python Code Helper · hints only — no full solution
              </p>
            ) : (
              <p className="mt-1 text-xs text-[var(--muted)]">
                Powered by Python RAG Concept Tutor (FastAPI)
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={props.onClose}
            className="rounded-md border border-[var(--border)] px-2 py-1 text-sm text-[var(--muted)] hover:text-[var(--ink)]"
          >
            Close
          </button>
        </header>

        <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-sm">
          {messages.length === 0 ? (
            <p className="text-[var(--muted)]">
              {props.mode === "tutor"
                ? "Ask about a concept from this lesson…"
                : "Ask for a hint about your failing tests…"}
            </p>
          ) : null}
          {messages.map((m, i) => (
            <div
              key={`${m.role}-${i}`}
              className={
                m.role === "user"
                  ? "ml-8 rounded-lg bg-[var(--paper)] px-3 py-2 text-[var(--ink)]"
                  : "mr-4 rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-[var(--ink)] whitespace-pre-wrap"
              }
            >
              <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-[var(--muted)]">
                {m.role === "user" ? "You" : props.mode === "tutor" ? "Tutor" : "Helper"}
              </span>
              {m.text}
            </div>
          ))}
          {pending ? (
            <p className="text-xs text-[var(--muted)]">Thinking…</p>
          ) : null}
          {error ? <p className="text-sm text-[#9f1239]">{error}</p> : null}
        </div>

        <form
          className="flex gap-2 border-t border-[var(--border)] p-3"
          onSubmit={(e) => {
            e.preventDefault();
            void send();
          }}
        >
          <label htmlFor={inputId} className="sr-only">
            Message
          </label>
          <input
            id={inputId}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={
              props.mode === "tutor" ? "Type a question…" : "Ask for a hint…"
            }
            className="min-w-0 flex-1 rounded-md border border-[var(--border)] bg-[var(--paper)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
            disabled={pending}
          />
          <button
            type="submit"
            disabled={pending || !draft.trim()}
            className="rounded-md bg-[var(--accent)] px-3 py-2 text-sm font-semibold text-white disabled:opacity-40"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
