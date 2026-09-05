"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type CoachLearnerAccessControlProps = {
  userId: string;
  learnerMaxDay: number | null;
  cohortMaxDay: number;
  dayOptions: Array<{ value: number; label: string }>;
  labels: {
    title: string;
    hint: string;
    save: string;
    saving: string;
    saved: string;
    error: string;
    defaultOption: string;
    cohortDefaultNote: string;
  };
};

export function CoachLearnerAccessControl({
  userId,
  learnerMaxDay,
  cohortMaxDay,
  dayOptions,
  labels,
}: CoachLearnerAccessControlProps) {
  const router = useRouter();
  const [value, setValue] = useState(learnerMaxDay == null ? "default" : String(learnerMaxDay));
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function save() {
    setStatus("saving");
    try {
      const res = await fetch(`/api/coach/learners/${userId}/access`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          maxUnlockedDay: value === "default" ? null : Number(value),
        }),
      });
      if (!res.ok) throw new Error("save failed");
      setStatus("saved");
      router.refresh();
      setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
      <h2 className="font-[family-name:var(--font-display)] text-lg text-[var(--ink)]">
        {labels.title}
      </h2>
      <p className="mt-1 text-sm text-[var(--muted)]">
        {labels.hint} ({labels.cohortDefaultNote})
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <select
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="rounded-md border border-[var(--border)] bg-white px-3 py-2 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)]"
        >
          <option value="default">{labels.defaultOption}</option>
          {dayOptions.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={save}
          disabled={status === "saving"}
          className="rounded-md border border-[var(--border)] bg-[var(--paper)] px-4 py-2 text-sm font-semibold text-[var(--ink)] transition hover:border-[var(--accent)] disabled:opacity-60"
        >
          {status === "saving" ? labels.saving : labels.save}
        </button>
        {status === "saved" ? (
          <span className="text-sm text-[var(--accent)]">{labels.saved}</span>
        ) : null}
        {status === "error" ? (
          <span className="text-sm text-[#9f1239]">{labels.error}</span>
        ) : null}
      </div>
    </section>
  );
}
