import type { Difficulty, Exercise, ExerciseHint } from "@/lib/exercises";

/** Max points per difficulty tier. */
export const TIER_POINTS: Record<Difficulty, number> = {
  easy: 10,
  medium: 20,
  hard: 35,
  extreme: 60,
};

/** Default hint costs per tier (hint 1, 2, 3). */
export const TIER_HINT_COSTS: Record<Difficulty, [number, number, number]> = {
  easy: [2, 3, 5],
  medium: [3, 5, 8],
  hard: [5, 8, 12],
  extreme: [8, 12, 20],
};

export type ScoringRubricRow = {
  difficulty: Difficulty;
  label: string;
  emoji: string;
  points: number;
  hintCosts: [number, number, number];
};

export const SCORING_RUBRIC: ScoringRubricRow[] = [
  { difficulty: "easy", label: "Easy", emoji: "🟢", points: 10, hintCosts: [2, 3, 5] },
  { difficulty: "medium", label: "Medium", emoji: "🟡", points: 20, hintCosts: [3, 5, 8] },
  { difficulty: "hard", label: "Hard", emoji: "🟠", points: 35, hintCosts: [5, 8, 12] },
  { difficulty: "extreme", label: "Extreme", emoji: "🔴", points: 60, hintCosts: [8, 12, 20] },
];

export function pointsRemaining(
  maxPoints: number,
  revealedHints: ExerciseHint[],
): number {
  const spent = revealedHints.reduce((sum, h) => sum + h.cost, 0);
  return Math.max(0, maxPoints - spent);
}

export function totalPossiblePoints(exerciseList: Exercise[]): number {
  return exerciseList.reduce((sum, ex) => sum + ex.maxPoints, 0);
}
