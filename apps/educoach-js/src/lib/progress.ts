import { curriculum, getAllLessons } from "@/lib/curriculum";
import { exercises } from "@/lib/exercises";
import { getDayExerciseIds, getDayLessonSlugs } from "@/lib/dayAccess";
import { prisma } from "@/lib/db";

export type LearnerStatus = "not_started" | "active" | "on_track" | "inactive" | "at_risk";

export type LearnerProgressSummary = {
  userId: string;
  docsCompleted: number;
  docsTotal: number;
  docsPercent: number;
  exercisesPassed: number;
  exercisesTotal: number;
  exercisesPercent: number;
  failedAttempts: number;
  totalAttempts: number;
  lastExerciseId: string | null;
  lastPassed: boolean | null;
  lastActivityAt: Date | null;
  currentDay: number | null;
  currentDayLabel: string | null;
  status: LearnerStatus;
  /** Simple PoC risk flag for the coach board. */
  atRisk: boolean;
  riskReason: string | null;
};

const publishedLessons = () => getAllLessons();
const publishedExercises = () => exercises;

function currentDayFromLessons(completedSlugs: Set<string>) {
  for (const day of curriculum) {
    const done = day.lessons.every((l) => completedSlugs.has(l.slug));
    if (!done) {
      return { day: day.day, label: `Day ${day.day} · ${day.dateLabel}` };
    }
  }
  const last = curriculum[curriculum.length - 1];
  return last ? { day: last.day, label: `Day ${last.day} · ${last.dateLabel}` } : null;
}

function deriveStatus(
  summary: Pick<
    LearnerProgressSummary,
    "totalAttempts" | "docsCompleted" | "atRisk" | "lastActivityAt"
  >,
): LearnerStatus {
  if (summary.totalAttempts === 0 && summary.docsCompleted === 0) {
    return "not_started";
  }
  if (summary.atRisk) {
    return "at_risk";
  }
  if (summary.lastActivityAt) {
    const hours = (Date.now() - summary.lastActivityAt.getTime()) / (1000 * 60 * 60);
    if (hours > 24) return "inactive";
    if (hours <= 4) return "active";
  }
  return "on_track";
}

export async function markLessonSeen(userId: string, lessonSlug: string) {
  await prisma.lessonProgress.upsert({
    where: {
      userId_lessonSlug: { userId, lessonSlug },
    },
    create: {
      userId,
      lessonSlug,
      completed: true,
    },
    update: {
      completed: true,
    },
  });
}

function scopeTotals(dayFilter?: number) {
  if (dayFilter == null) {
    return {
      lessonSlugs: publishedLessons().map((l) => l.slug),
      exerciseIds: publishedExercises().map((e) => e.id),
      dayLabel: null as string | null,
    };
  }
  const dayMeta = curriculum.find((d) => d.day === dayFilter);
  return {
    lessonSlugs: getDayLessonSlugs(dayFilter),
    exerciseIds: getDayExerciseIds(dayFilter),
    dayLabel: dayMeta ? `Day ${dayMeta.day} · ${dayMeta.dateLabel}` : `Day ${dayFilter}`,
  };
}

function computeProgressFromData(
  userId: string,
  lessonRows: Array<{ lessonSlug: string; updatedAt: Date }>,
  attempts: Array<{
    exerciseId: string;
    passed: boolean;
    createdAt: Date;
  }>,
  scope: ReturnType<typeof scopeTotals>,
  dayFilter?: number,
): LearnerProgressSummary {
  const { lessonSlugs, exerciseIds, dayLabel } = scope;
  const lessonSlugSet = new Set(lessonSlugs);
  const exerciseIdSet = new Set(exerciseIds);

  const scopedLessonRows = lessonRows.filter((r) => lessonSlugSet.has(r.lessonSlug));
  const scopedAttempts = attempts.filter((a) => exerciseIdSet.has(a.exerciseId));

  const docsTotal = lessonSlugs.length;
  const exercisesTotal = exerciseIds.length;
  const lessonDone = scopedLessonRows.length;

  const passedIds = new Set(
    scopedAttempts.filter((a) => a.passed).map((a) => a.exerciseId),
  );
  const failedAttempts = scopedAttempts.filter((a) => !a.passed).length;
  const last = scopedAttempts[0] ?? null;

  const docsPercent = docsTotal === 0 ? 0 : Math.round((lessonDone / docsTotal) * 100);
  const exercisesPercent =
    exercisesTotal === 0 ? 0 : Math.round((passedIds.size / exercisesTotal) * 100);

  let atRisk = false;
  let riskReason: string | null = null;
  if (scopedAttempts.length >= 3 && passedIds.size === 0) {
    atRisk = true;
    riskReason = dayLabel
      ? `${dayLabel}: several attempts, no exercise passed yet`
      : "Several attempts, no exercise passed yet";
  } else if (scopedAttempts.length >= 2 && failedAttempts >= 2 && passedIds.size === 0) {
    atRisk = true;
    riskReason = dayLabel
      ? `${dayLabel}: repeated fails with no pass`
      : "Repeated fails with no pass";
  }

  const lastAttemptAt = scopedAttempts[0]?.createdAt ?? null;
  const lastLessonAt =
    scopedLessonRows.length > 0
      ? scopedLessonRows.reduce(
          (max, row) => (row.updatedAt > max ? row.updatedAt : max),
          scopedLessonRows[0]!.updatedAt,
        )
      : null;
  const lastActivityAt =
    lastAttemptAt && lastLessonAt
      ? lastAttemptAt > lastLessonAt
        ? lastAttemptAt
        : lastLessonAt
      : lastAttemptAt ?? lastLessonAt;

  const dayInfo =
    dayFilter == null
      ? currentDayFromLessons(new Set(lessonRows.map((r) => r.lessonSlug)))
      : dayLabel
        ? { day: dayFilter!, label: dayLabel }
        : null;

  const base = {
    userId,
    docsCompleted: lessonDone,
    docsTotal,
    docsPercent,
    exercisesPassed: passedIds.size,
    exercisesTotal,
    exercisesPercent,
    failedAttempts,
    totalAttempts: scopedAttempts.length,
    lastExerciseId: last?.exerciseId ?? null,
    lastPassed: last ? last.passed : null,
    lastActivityAt,
    currentDay: dayInfo?.day ?? null,
    currentDayLabel: dayInfo?.label ?? null,
    atRisk,
    riskReason,
  };

  return {
    ...base,
    status: deriveStatus(base),
  };
}

export async function getLearnerProgress(
  userId: string,
  options?: { day?: number },
): Promise<LearnerProgressSummary> {
  const scope = scopeTotals(options?.day);

  const [lessonRows, attempts] = await Promise.all([
    prisma.lessonProgress.findMany({
      where: { userId, completed: true },
      select: { lessonSlug: true, updatedAt: true },
    }),
    prisma.attempt.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return computeProgressFromData(userId, lessonRows, attempts, scope, options?.day);
}

export async function getClassProgress(options?: { day?: number }): Promise<
  Array<
    LearnerProgressSummary & {
      username: string;
      displayName: string;
    }
  >
> {
  const learners = await prisma.user.findMany({
    where: { role: "learner" },
    orderBy: { username: "asc" },
  });

  const rows = await Promise.all(
    learners.map(async (l) => {
      const progress = await getLearnerProgress(l.id, options);
      return {
        ...progress,
        username: l.username,
        displayName: l.displayName,
      };
    }),
  );

  return rows.sort(
    (a, b) =>
      statusRank(a.status) - statusRank(b.status) ||
      Number(b.atRisk) - Number(a.atRisk) ||
      (b.lastActivityAt?.getTime() ?? 0) - (a.lastActivityAt?.getTime() ?? 0) ||
      a.displayName.localeCompare(b.displayName),
  );
}

function statusRank(status: LearnerStatus) {
  const order: LearnerStatus[] = ["at_risk", "inactive", "not_started", "active", "on_track"];
  return order.indexOf(status);
}

export type CoachLearnerDetail = LearnerProgressSummary & {
  username: string;
  displayName: string;
  createdAt: Date;
  completedLessonSlugs: string[];
  passedExerciseIds: string[];
  recentAttempts: Array<{
    id: string;
    exerciseId: string;
    passed: boolean;
    passedCount: number;
    totalCount: number;
    createdAt: Date;
  }>;
};

export async function getCoachLearnerDetail(userId: string): Promise<CoachLearnerDetail | null> {
  const user = await prisma.user.findFirst({
    where: { id: userId, role: "learner" },
  });
  if (!user) return null;

  const exerciseIds = publishedExercises().map((e) => e.id);
  const [progress, lessonRows, attempts] = await Promise.all([
    getLearnerProgress(userId),
    prisma.lessonProgress.findMany({
      where: { userId, completed: true },
      select: { lessonSlug: true },
    }),
    prisma.attempt.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 25,
    }),
  ]);

  const passedExerciseIds = [
    ...new Set(
      attempts.filter((a) => a.passed && exerciseIds.includes(a.exerciseId)).map((a) => a.exerciseId),
    ),
  ];

  return {
    ...progress,
    username: user.username,
    displayName: user.displayName,
    createdAt: user.createdAt,
    completedLessonSlugs: lessonRows.map((r) => r.lessonSlug),
    passedExerciseIds,
    recentAttempts: attempts.map((a) => ({
      id: a.id,
      exerciseId: a.exerciseId,
      passed: a.passed,
      passedCount: a.passedCount,
      totalCount: a.totalCount,
      createdAt: a.createdAt,
    })),
  };
}
