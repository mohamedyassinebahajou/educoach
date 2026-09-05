export type Difficulty = "easy" | "medium" | "hard" | "extreme";

export type ExerciseHint = {
  text: string;
  cost: number;
};

export type ExerciseOutputExample = {
  medium: "console" | "terminal" | "text";
  body: string;
};

export type ExerciseCheck =
  | {
      id: string;
      label: string;
      kind: "consoleLine";
      index: number;
      equals: string;
    }
  | {
      id: string;
      label: string;
      kind: "consoleLinesExact";
      lines: string[];
    }
  | {
      id: string;
      label: string;
      kind: "sourceIncludes";
      pattern: string;
      flags?: string;
    }
  | {
      id: string;
      label: string;
      kind: "consoleLogMinCount";
      min: number;
    }
  | {
      id: string;
      label: string;
      kind: "consoleIncludesLine";
      equals: string;
    };

export type Exercise = {
  id: string;
  day: number;
  lessonSlug: string;
  title: string;
  difficulty: Difficulty;
  /** Max points if solved with no hints. */
  maxPoints: number;
  /** Full exercise prompt (no solution). */
  prompt: string;
  hints: ExerciseHint[];
  kind: "reflect" | "code";
  starterCode?: string;
  visibleTests?: string[];
  outputExamples?: ExerciseOutputExample[];
  checks?: ExerciseCheck[];
  /** Legacy fields (optional). */
  summary?: string;
  goal?: string;
  constraints?: string[];
};

import { exerciseDays } from "@/lib/exerciseBank/days";

export const exercises: Exercise[] = exerciseDays as unknown as Exercise[];

export function getExercise(id: string): Exercise | undefined {
  return exercises.find((e) => e.id === id);
}

/** Next exercise in bank order (day → lesson → difficulty). */
export function getNextExercise(id: string): Exercise | undefined {
  const index = exercises.findIndex((e) => e.id === id);
  if (index < 0 || index >= exercises.length - 1) return undefined;
  return exercises[index + 1];
}

export function getPreviousExercise(id: string): Exercise | undefined {
  const index = exercises.findIndex((e) => e.id === id);
  if (index <= 0) return undefined;
  return exercises[index - 1];
}

export function getExercisesByDay(day?: number): Exercise[] {
  if (day == null) return exercises;
  return exercises.filter((e) => e.day === day);
}

export function getExercisesByLesson(lessonSlug: string): Exercise[] {
  return exercises.filter((e) => e.lessonSlug === lessonSlug);
}

export function listExerciseDays(): number[] {
  return Array.from(new Set(exercises.map((e) => e.day))).sort((a, b) => a - b);
}

/** Expected mix per lesson: 4 easy, 4 medium, 3 hard, 1 extreme. */
export function countDifficulties(day: number): Record<Difficulty, number> {
  const counts: Record<Difficulty, number> = {
    easy: 0,
    medium: 0,
    hard: 0,
    extreme: 0,
  };
  for (const e of getExercisesByDay(day)) {
    counts[e.difficulty] += 1;
  }
  return counts;
}
