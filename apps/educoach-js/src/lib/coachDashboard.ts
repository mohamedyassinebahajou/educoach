import type { LearnerStatus } from "@/lib/progress";

export type ProgressFilter = "all" | "none" | "low" | "mid" | "high";

export type CoachSort =
  | "status"
  | "progress_asc"
  | "progress_desc"
  | "lessons_asc"
  | "lessons_desc"
  | "exercises_asc"
  | "exercises_desc"
  | "name_asc"
  | "name_desc"
  | "activity_desc"
  | "activity_asc";

export type CoachRow = {
  userId: string;
  displayName: string;
  username: string;
  docsPercent: number;
  exercisesPercent: number;
  lastActivityAt: Date | null;
  status: LearnerStatus;
};

export function combinedProgress(row: Pick<CoachRow, "docsPercent" | "exercisesPercent">) {
  return Math.round((row.docsPercent + row.exercisesPercent) / 2);
}

export function matchesProgressFilter(
  row: Pick<CoachRow, "docsPercent" | "exercisesPercent">,
  filter: ProgressFilter,
) {
  const combined = combinedProgress(row);
  switch (filter) {
    case "all":
      return true;
    case "none":
      return combined === 0;
    case "low":
      return combined >= 1 && combined <= 24;
    case "mid":
      return combined >= 25 && combined <= 74;
    case "high":
      return combined >= 75;
    default:
      return true;
  }
}

export function countByProgressFilter(rows: CoachRow[]): Record<ProgressFilter, number> {
  const counts: Record<ProgressFilter, number> = {
    all: rows.length,
    none: 0,
    low: 0,
    mid: 0,
    high: 0,
  };
  for (const row of rows) {
    if (matchesProgressFilter(row, "none")) counts.none += 1;
    if (matchesProgressFilter(row, "low")) counts.low += 1;
    if (matchesProgressFilter(row, "mid")) counts.mid += 1;
    if (matchesProgressFilter(row, "high")) counts.high += 1;
  }
  return counts;
}

export function sortCoachRows<T extends CoachRow>(rows: T[], sort: CoachSort): T[] {
  const copy = [...rows];
  switch (sort) {
    case "progress_asc":
      return copy.sort((a, b) => combinedProgress(a) - combinedProgress(b));
    case "progress_desc":
      return copy.sort((a, b) => combinedProgress(b) - combinedProgress(a));
    case "lessons_asc":
      return copy.sort((a, b) => a.docsPercent - b.docsPercent || a.displayName.localeCompare(b.displayName));
    case "lessons_desc":
      return copy.sort((a, b) => b.docsPercent - a.docsPercent || a.displayName.localeCompare(b.displayName));
    case "exercises_asc":
      return copy.sort(
        (a, b) => a.exercisesPercent - b.exercisesPercent || a.displayName.localeCompare(b.displayName),
      );
    case "exercises_desc":
      return copy.sort(
        (a, b) => b.exercisesPercent - a.exercisesPercent || a.displayName.localeCompare(b.displayName),
      );
    case "name_asc":
      return copy.sort((a, b) => a.displayName.localeCompare(b.displayName));
    case "name_desc":
      return copy.sort((a, b) => b.displayName.localeCompare(a.displayName));
    case "activity_desc":
      return copy.sort(
        (a, b) =>
          (b.lastActivityAt?.getTime() ?? 0) - (a.lastActivityAt?.getTime() ?? 0) ||
          a.displayName.localeCompare(b.displayName),
      );
    case "activity_asc":
      return copy.sort((a, b) => {
        const aTime = a.lastActivityAt?.getTime() ?? 0;
        const bTime = b.lastActivityAt?.getTime() ?? 0;
        if (aTime === 0 && bTime === 0) return a.displayName.localeCompare(b.displayName);
        if (aTime === 0) return 1;
        if (bTime === 0) return -1;
        return aTime - bTime;
      });
    case "status":
    default:
      return copy;
  }
}

export function coachDashboardUrl(params: {
  status?: LearnerStatus;
  progress?: ProgressFilter;
  sort?: CoachSort;
  day?: number;
}) {
  const q = new URLSearchParams();
  if (params.status) q.set("status", params.status);
  if (params.progress && params.progress !== "all") q.set("progress", params.progress);
  if (params.sort && params.sort !== "status") q.set("sort", params.sort);
  if (params.day != null && !Number.isNaN(params.day)) q.set("day", String(params.day));
  const query = q.toString();
  return query ? `/coach?${query}` : "/coach";
}

export function parseDayFilter(value: string | undefined): number | undefined {
  if (!value) return undefined;
  const day = Number(value);
  if (Number.isNaN(day) || day < 1 || day > 10) return undefined;
  return day;
}

export function parseProgressFilter(value: string | undefined): ProgressFilter {
  if (value === "none" || value === "low" || value === "mid" || value === "high") return value;
  return "all";
}

export function parseCoachSort(value: string | undefined): CoachSort {
  const allowed: CoachSort[] = [
    "status",
    "progress_asc",
    "progress_desc",
    "lessons_asc",
    "lessons_desc",
    "exercises_asc",
    "exercises_desc",
    "name_asc",
    "name_desc",
    "activity_desc",
    "activity_asc",
  ];
  if (value && allowed.includes(value as CoachSort)) return value as CoachSort;
  return "status";
}
