"use client";

import type { Difficulty } from "@/lib/exercises";
import { SCORING_RUBRIC } from "@/lib/exerciseScoring";

type ScoringRubricTableProps = {
  labels: {
    tier: string;
    points: string;
    hint1: string;
    hint2: string;
    hint3: string;
  };
  difficultyLabels: Record<Difficulty, string>;
};

export function ScoringRubricTable({
  labels,
  difficultyLabels,
}: ScoringRubricTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--surface)]">
      <table className="w-full min-w-[420px] text-left text-sm">
        <thead>
          <tr className="border-b border-[var(--border)] bg-[var(--paper)]">
            <th className="px-4 py-2 font-semibold text-[var(--ink)]">{labels.tier}</th>
            <th className="px-4 py-2 font-semibold text-[var(--ink)]">{labels.points}</th>
            <th className="px-4 py-2 font-semibold text-[var(--ink)]">{labels.hint1}</th>
            <th className="px-4 py-2 font-semibold text-[var(--ink)]">{labels.hint2}</th>
            <th className="px-4 py-2 font-semibold text-[var(--ink)]">{labels.hint3}</th>
          </tr>
        </thead>
        <tbody>
          {SCORING_RUBRIC.map((row) => (
            <tr key={row.difficulty} className="border-b border-[var(--border)] last:border-0">
              <td className="px-4 py-2 text-[var(--ink)]">
                {row.emoji} {difficultyLabels[row.difficulty]}
              </td>
              <td className="px-4 py-2 font-mono text-[var(--ink)]">{row.points}</td>
              <td className="px-4 py-2 font-mono text-[var(--muted)]">−{row.hintCosts[0]}</td>
              <td className="px-4 py-2 font-mono text-[var(--muted)]">−{row.hintCosts[1]}</td>
              <td className="px-4 py-2 font-mono text-[var(--muted)]">−{row.hintCosts[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
