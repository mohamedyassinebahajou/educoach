import { curriculum, findLesson } from "@/lib/curriculum";
import { getExercisesByDay } from "@/lib/exercises";
import { prisma } from "@/lib/db";

export const MAX_CURRICULUM_DAY = 10;

export function isDayUnlocked(day: number, maxUnlockedDay: number): boolean {
  return day >= 1 && day <= maxUnlockedDay;
}

export async function getCohortMaxUnlockedDay(): Promise<number> {
  const settings = await prisma.cohortSettings.findUnique({ where: { id: 1 } });
  return settings?.maxUnlockedDay ?? 1;
}

export async function getMaxUnlockedDayForUser(
  userId: string,
  role: "learner" | "coach",
): Promise<number> {
  if (role === "coach") return MAX_CURRICULUM_DAY;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { maxUnlockedDay: true },
  });
  if (user?.maxUnlockedDay != null) return user.maxUnlockedDay;
  return getCohortMaxUnlockedDay();
}

export async function setCohortMaxUnlockedDay(day: number): Promise<number> {
  const clamped = Math.min(MAX_CURRICULUM_DAY, Math.max(1, Math.round(day)));
  const settings = await prisma.cohortSettings.upsert({
    where: { id: 1 },
    create: { id: 1, maxUnlockedDay: clamped },
    update: { maxUnlockedDay: clamped },
  });
  return settings.maxUnlockedDay;
}

export async function setLearnerMaxUnlockedDay(
  userId: string,
  day: number | null,
): Promise<number | null> {
  const value =
    day == null ? null : Math.min(MAX_CURRICULUM_DAY, Math.max(1, Math.round(day)));
  await prisma.user.update({
    where: { id: userId },
    data: { maxUnlockedDay: value },
  });
  return value;
}

export function getLessonDay(slug: string): number | null {
  return findLesson(slug)?.day.day ?? null;
}

export function listCurriculumDays(): number[] {
  return curriculum.map((d) => d.day);
}

export function getDayLessonSlugs(day: number): string[] {
  const meta = curriculum.find((d) => d.day === day);
  return meta?.lessons.map((l) => l.slug) ?? [];
}

export function getDayExerciseIds(day: number): string[] {
  return getExercisesByDay(day).map((e) => e.id);
}

export async function assertLearnerCanAccessLesson(
  userId: string,
  lessonSlug: string,
): Promise<boolean> {
  const day = getLessonDay(lessonSlug);
  if (day == null) return true;
  const max = await getMaxUnlockedDayForUser(userId, "learner");
  return isDayUnlocked(day, max);
}

export async function assertLearnerCanAccessExerciseDay(
  userId: string,
  exerciseDay: number,
): Promise<boolean> {
  const max = await getMaxUnlockedDayForUser(userId, "learner");
  return isDayUnlocked(exerciseDay, max);
}
