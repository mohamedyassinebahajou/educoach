import Link from "next/link";
import { redirect } from "next/navigation";
import { CoachDashboardControls } from "@/components/coach/CoachDashboardControls";
import { CoachDayAccessControl } from "@/components/coach/CoachDayAccessControl";
import { CoachProgressBar } from "@/components/coach/CoachProgressBar";
import { CoachStatusBadge } from "@/components/coach/CoachStatusBadge";
import { PageShell } from "@/components/PageShell";
import { getSession } from "@/lib/auth";
import { listCoachAlerts } from "@/lib/coachAlerts";
import {
  combinedProgress,
  countByProgressFilter,
  matchesProgressFilter,
  parseCoachSort,
  parseDayFilter,
  parseProgressFilter,
  sortCoachRows,
} from "@/lib/coachDashboard";
import { curriculum } from "@/lib/curriculum";
import { getCohortMaxUnlockedDay } from "@/lib/dayAccess";
import { prisma } from "@/lib/db";
import { getExercise } from "@/lib/exercises";
import { formatMessage } from "@/lib/i18n/messages";
import { getI18n } from "@/lib/i18n/server";
import { getClassProgress, type LearnerStatus } from "@/lib/progress";

type PageProps = {
  searchParams: Promise<{ status?: string; progress?: string; sort?: string; day?: string }>;
};

function formatWhen(date: Date | null, neverLabel: string) {
  if (!date) return neverLabel;
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function CoachPage({ searchParams }: PageProps) {
  const user = await getSession();
  if (!user) redirect("/login?next=/coach");
  if (user.role !== "coach") redirect("/?error=coach-only");

  const { t } = await getI18n();
  const params = await searchParams;
  const statusFilter = params.status as LearnerStatus | undefined;
  const progressFilter = parseProgressFilter(params.progress);
  const sortKey = parseCoachSort(params.sort);
  const dayFilter = parseDayFilter(params.day);

  const [classRows, maxUnlockedDay] = await Promise.all([
    getClassProgress(dayFilter == null ? undefined : { day: dayFilter }),
    getCohortMaxUnlockedDay(),
  ]);
  const dayOptions = curriculum.map((d) => ({
    day: d.day,
    label: formatMessage(t.coach.dayFilterOption, {
      n: String(d.day),
      title: d.title,
    }),
  }));
  const statusLabels: Record<LearnerStatus, string> = {
    not_started: t.coach.statusNotStarted,
    active: t.coach.statusActive,
    on_track: t.coach.statusOnTrack,
    inactive: t.coach.statusInactive,
    at_risk: t.coach.statusAtRisk,
  };
  const filterLabels: Record<LearnerStatus | "all", string> = {
    all: t.coach.filterAll,
    ...statusLabels,
  };
  const progressLabels = {
    all: t.coach.progressAll,
    none: t.coach.progressNone,
    low: t.coach.progressLow,
    mid: t.coach.progressMid,
    high: t.coach.progressHigh,
  };
  const progressCounts = countByProgressFilter(classRows);
  const sortOptions = [
    { value: "status" as const, label: t.coach.sortStatus },
    { value: "progress_asc" as const, label: t.coach.sortProgressAsc },
    { value: "progress_desc" as const, label: t.coach.sortProgressDesc },
    { value: "lessons_asc" as const, label: t.coach.sortLessonsAsc },
    { value: "lessons_desc" as const, label: t.coach.sortLessonsDesc },
    { value: "exercises_asc" as const, label: t.coach.sortExercisesAsc },
    { value: "exercises_desc" as const, label: t.coach.sortExercisesDesc },
    { value: "name_asc" as const, label: t.coach.sortNameAsc },
    { value: "name_desc" as const, label: t.coach.sortNameDesc },
    { value: "activity_desc" as const, label: t.coach.sortActivityDesc },
    { value: "activity_asc" as const, label: t.coach.sortActivityAsc },
  ];

  const counts: Record<LearnerStatus | "all", number> = {
    all: classRows.length,
    not_started: 0,
    active: 0,
    on_track: 0,
    inactive: 0,
    at_risk: 0,
  };
  for (const row of classRows) {
    counts[row.status] += 1;
  }

  let filtered = statusFilter
    ? classRows.filter((row) => row.status === statusFilter)
    : classRows;
  if (progressFilter !== "all") {
    filtered = filtered.filter((row) => matchesProgressFilter(row, progressFilter));
  }
  filtered = sortKey === "status" ? filtered : sortCoachRows(filtered, sortKey);

  const atRiskCount = counts.at_risk;
  const activeCount = counts.active;
  const avgExercises =
    classRows.length > 0
      ? Math.round(classRows.reduce((s, r) => s + r.exercisesPercent, 0) / classRows.length)
      : 0;
  const avgLessons =
    classRows.length > 0
      ? Math.round(classRows.reduce((s, r) => s + r.docsPercent, 0) / classRows.length)
      : 0;

  const recentFails = await prisma.attempt.findMany({
    where: { passed: false, user: { role: "learner" } },
    orderBy: { createdAt: "desc" },
    take: dayFilter == null ? 8 : 20,
    include: { user: true },
  });
  const scopedFails =
    dayFilter == null
      ? recentFails
      : recentFails.filter((a) => getExercise(a.exerciseId)?.day === dayFilter);

  const chatAlerts = listCoachAlerts(12);
  const alerts = [
    ...chatAlerts.map((a) => ({
      id: a.id,
      text: a.text,
      at: a.at,
      kind: "chat" as const,
    })),
    ...classRows
      .filter((r) => r.atRisk)
      .map((r) => ({
        id: `risk-${r.userId}`,
        text: `${r.displayName} — ${r.riskReason ?? t.coach.atRiskLabel}`,
        at: new Date().toISOString(),
        kind: "risk" as const,
      })),
    ...scopedFails.slice(0, 5).map((a) => ({
      id: a.id,
      text: `${a.user.displayName} · ${a.exerciseId} (${a.passedCount}/${a.totalCount})`,
      at: a.createdAt.toISOString(),
      kind: "fail" as const,
    })),
  ].slice(0, 15);

  return (
    <PageShell
      title={t.coach.title}
      subtitle={
        dayFilter == null
          ? formatMessage(t.coach.subtitle, {
              count: String(classRows.length),
              atRisk: String(atRiskCount),
              active: String(activeCount),
            })
          : formatMessage(t.coach.subtitleDay, {
              count: String(classRows.length),
              atRisk: String(atRiskCount),
              active: String(activeCount),
              day: String(dayFilter),
            })
      }
    >
      <div className="space-y-8">
        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <Stat label={t.coach.learners} value={String(classRows.length)} />
          <Stat label={t.coach.atRisk} value={String(atRiskCount)} accent={atRiskCount > 0} />
          <Stat label={t.coach.notStarted} value={String(counts.not_started)} />
          <Stat label={t.coach.activeToday} value={String(activeCount)} />
          <Stat
            label={`${t.coach.avgLessons} / ${t.coach.avgExercises}`}
            value={`${avgLessons}% · ${avgExercises}%`}
          />
        </section>

        <CoachDayAccessControl
          maxUnlockedDay={maxUnlockedDay}
          dayOptions={curriculum.map((d) => ({
            value: d.day,
            label: formatMessage(t.coach.accessControlDayOption, { n: String(d.day) }),
          }))}
          labels={{
            title: t.coach.accessControlTitle,
            hint: t.coach.accessControlHint,
            save: t.coach.accessControlSave,
            saving: t.coach.accessControlSaving,
            saved: t.coach.accessControlSaved,
            error: t.coach.accessControlError,
          }}
        />

        <CoachDashboardControls
          status={statusFilter}
          progress={progressFilter}
          sort={sortKey}
          day={dayFilter}
          dayOptions={dayOptions}
          statusCounts={counts}
          progressCounts={progressCounts}
          statusLabels={filterLabels}
          progressLabels={progressLabels}
          statusSectionLabel={t.coach.filterByStatus}
          progressSectionLabel={t.coach.filterByProgress}
          daySectionLabel={t.coach.filterByDay}
          dayAllLabel={t.coach.dayFilterAll}
          sortLabel={t.coach.sortBy}
          sortOptions={sortOptions}
        />

        <section>
          <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--ink)]">
            {t.coach.riskBoard}
          </h2>
          <div className="mt-3 overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--surface)]">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-[var(--border)] bg-[var(--paper)] text-xs uppercase tracking-wide text-[var(--muted)]">
                <tr>
                  <th className="px-4 py-3">{t.coach.learner}</th>
                  <th className="px-4 py-3">{t.coach.status}</th>
                  <th className="px-4 py-3">{t.coach.currentDay}</th>
                  <th className="px-4 py-3">{t.coach.docs}</th>
                  <th className="px-4 py-3">{t.coach.exercises}</th>
                  <th className="px-4 py-3">{t.coach.overallProgress}</th>
                  <th className="px-4 py-3">{t.coach.attempts}</th>
                  <th className="px-4 py-3">{t.coach.lastActivity}</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-8 text-center text-[var(--muted)]">
                      {t.coach.noActivity}
                    </td>
                  </tr>
                ) : (
                  filtered.map((row) => (
                    <tr key={row.userId} className="border-b border-[var(--border)] last:border-0">
                      <td className="px-4 py-3">
                        <p className="font-medium text-[var(--ink)]">{row.displayName}</p>
                        <p className="font-mono text-xs text-[var(--muted)]">{row.username}</p>
                      </td>
                      <td className="px-4 py-3">
                        <CoachStatusBadge status={row.status} labels={statusLabels} />
                      </td>
                      <td className="px-4 py-3 text-[var(--muted)]">
                        {row.currentDayLabel ?? "—"}
                      </td>
                      <td className="px-4 py-3">
                        <CoachProgressBar
                          percent={row.docsPercent}
                          compact
                          label={`${row.docsCompleted}/${row.docsTotal}`}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <CoachProgressBar
                          percent={row.exercisesPercent}
                          compact
                          label={`${row.exercisesPassed}/${row.exercisesTotal}`}
                        />
                      </td>
                      <td className="px-4 py-3 font-mono text-sm text-[var(--muted)]">
                        {combinedProgress(row)}%
                      </td>
                      <td className="px-4 py-3 text-[var(--muted)]">
                        {row.totalAttempts}
                        {row.failedAttempts > 0 ? (
                          <span className="ml-1 text-xs text-[#9f1239]">
                            ({row.failedAttempts} ✗)
                          </span>
                        ) : null}
                      </td>
                      <td className="px-4 py-3 text-xs text-[var(--muted)]">
                        {formatWhen(row.lastActivityAt, t.coach.never)}
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/coach/learner/${row.userId}`}
                          className="text-[var(--accent)] hover:underline"
                        >
                          {t.coach.viewProgress}
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--ink)]">
            {t.coach.alerts}
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            {alerts.length === 0 ? (
              <li className="text-[var(--muted)]">{t.coach.noAlerts}</li>
            ) : (
              alerts.map((a) => (
                <li
                  key={a.id}
                  className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-2"
                >
                  <span
                    className={
                      a.kind === "risk" || a.kind === "chat"
                        ? "mr-2 text-xs font-semibold text-[#9f1239]"
                        : "mr-2 text-xs font-semibold text-[var(--muted)]"
                    }
                  >
                    {a.kind === "risk" ? "RISK" : a.kind === "chat" ? "CHAT" : "FAIL"}
                  </span>
                  {a.text}
                  <span className="mt-0.5 block text-xs text-[var(--muted)]">
                    {new Date(a.at).toLocaleString()}
                  </span>
                </li>
              ))
            )}
          </ul>
        </section>
      </div>
    </PageShell>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
      <p className="text-xs uppercase tracking-wide text-[var(--muted)]">{label}</p>
      <p
        className={`mt-1 font-[family-name:var(--font-display)] text-2xl ${
          accent ? "text-[#9f1239]" : "text-[var(--ink)]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
