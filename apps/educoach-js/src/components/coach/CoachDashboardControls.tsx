"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  coachDashboardUrl,
  type CoachSort,
  type ProgressFilter,
} from "@/lib/coachDashboard";
import type { LearnerStatus } from "@/lib/progress";

type CoachDashboardControlsProps = {
  status: LearnerStatus | undefined;
  progress: ProgressFilter;
  sort: CoachSort;
  day?: number;
  dayOptions: Array<{ day: number; label: string }>;
  statusCounts: Record<LearnerStatus | "all", number>;
  progressCounts: Record<ProgressFilter, number>;
  statusLabels: Record<LearnerStatus | "all", string>;
  progressLabels: Record<ProgressFilter, string>;
  statusSectionLabel: string;
  progressSectionLabel: string;
  daySectionLabel: string;
  dayAllLabel: string;
  sortLabel: string;
  sortOptions: Array<{ value: CoachSort; label: string }>;
};

const statusFilters: Array<LearnerStatus | "all"> = [
  "all",
  "at_risk",
  "inactive",
  "not_started",
  "active",
  "on_track",
];

const progressFilters: ProgressFilter[] = ["all", "none", "low", "mid", "high"];

export function CoachDashboardControls({
  status,
  progress,
  sort,
  day,
  dayOptions,
  statusCounts,
  progressCounts,
  statusLabels,
  progressLabels,
  statusSectionLabel,
  progressSectionLabel,
  daySectionLabel,
  dayAllLabel,
  sortLabel,
  sortOptions,
}: CoachDashboardControlsProps) {
  const router = useRouter();

  function linkFor(next: {
    status?: LearnerStatus | "all";
    progress?: ProgressFilter;
    sort?: CoachSort;
    day?: number | "all";
  }) {
    return coachDashboardUrl({
      status: next.status === "all" || next.status === undefined ? undefined : next.status,
      progress: next.progress ?? progress,
      sort: next.sort ?? sort,
      day: next.day === "all" ? undefined : (next.day ?? day),
    });
  }

  return (
    <div className="space-y-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
          {statusSectionLabel}
        </p>
        <div className="flex flex-wrap gap-2">
          {statusFilters.map((key) => {
            const active = (status ?? "all") === key || (key === "all" && !status);
            return (
              <Link
                key={key}
                href={linkFor({ status: key, progress, sort })}
                className={pillClass(active)}
              >
                {statusLabels[key]} ({statusCounts[key]})
              </Link>
            );
          })}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
          {progressSectionLabel}
        </p>
        <div className="flex flex-wrap gap-2">
          {progressFilters.map((key) => {
            const active = progress === key;
            return (
              <Link
                key={key}
                href={linkFor({ status: status ?? "all", progress: key, sort })}
                className={pillClass(active)}
              >
                {progressLabels[key]} ({progressCounts[key]})
              </Link>
            );
          })}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
          {daySectionLabel}
        </p>
        <div className="flex flex-wrap gap-2">
          <Link
            href={linkFor({ status: status ?? "all", progress, sort, day: "all" })}
            className={pillClass(day == null)}
          >
            {dayAllLabel}
          </Link>
          {dayOptions.map(({ day: d, label }) => (
            <Link
              key={d}
              href={linkFor({ status: status ?? "all", progress, sort, day: d })}
              className={pillClass(day === d)}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <label htmlFor="coach-sort" className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
          {sortLabel}
        </label>
        <select
          id="coach-sort"
          value={sort}
          onChange={(e) => router.push(linkFor({ status: status ?? "all", progress, sort: e.target.value as CoachSort }))}
          className="rounded-md border border-[var(--border)] bg-white px-3 py-1.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)]"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function pillClass(active: boolean) {
  return `rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
    active
      ? "border-[var(--accent)] bg-[var(--accent)] text-white"
      : "border-[var(--border)] bg-[var(--paper)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--ink)]"
  }`;
}
