import { getAllLessons } from "@/lib/curriculum";
import { exercises } from "@/lib/exercises";
import { prisma } from "@/lib/db";

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
  /** Simple PoC risk flag for the coach board. */
  atRisk: boolean;
  riskReason: string | null;
};

const publishedLessons = () => getAllLessons();
const publishedExercises = () => exercises;

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

export async function getLearnerProgress(userId: string): Promise<LearnerProgressSummary> {
  const docsTotal = publishedLessons().length;
  const exercisesTotal = publishedExercises().length;
  const exerciseIds = publishedExercises().map((e) => e.id);

  const [lessonDone, attempts] = await Promise.all([
    prisma.lessonProgress.count({
      where: { userId, completed: true },
    }),
    prisma.attempt.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const passedIds = new Set(
    attempts.filter((a) => a.passed && exerciseIds.includes(a.exerciseId)).map((a) => a.exerciseId),
  );
  const failedAttempts = attempts.filter((a) => !a.passed).length;
  const last = attempts[0] ?? null;

  const docsPercent = docsTotal === 0 ? 0 : Math.round((lessonDone / docsTotal) * 100);
  const exercisesPercent =
    exercisesTotal === 0 ? 0 : Math.round((passedIds.size / exercisesTotal) * 100);

  // Heuristic (PoC): at-risk if no exercise passed yet but has failures, or fail rate high.
  let atRisk = false;
  let riskReason: string | null = null;
  if (attempts.length >= 3 && passedIds.size === 0) {
    atRisk = true;
    riskReason = "Several attempts, no exercise passed yet";
  } else if (attempts.length >= 2 && failedAttempts >= 2 && passedIds.size === 0) {
    atRisk = true;
    riskReason = "Repeated fails with no pass";
  } else if (docsPercent < 34 && attempts.length === 0) {
    // only flag if they've been inactive on both tracks after we somehow know — skip for brand new
    atRisk = false;
  }

  return {
    userId,
    docsCompleted: lessonDone,
    docsTotal,
    docsPercent,
    exercisesPassed: passedIds.size,
    exercisesTotal,
    exercisesPercent,
    failedAttempts,
    totalAttempts: attempts.length,
    lastExerciseId: last?.exerciseId ?? null,
    lastPassed: last ? last.passed : null,
    atRisk,
    riskReason,
  };
}

export async function getClassProgress(): Promise<
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
      const progress = await getLearnerProgress(l.id);
      return {
        ...progress,
        username: l.username,
        displayName: l.displayName,
      };
    }),
  );

  return rows.sort((a, b) => Number(b.atRisk) - Number(a.atRisk) || a.username.localeCompare(b.username));
}
