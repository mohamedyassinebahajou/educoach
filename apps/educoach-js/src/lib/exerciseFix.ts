import type { Exercise } from "@/lib/exercises";

/** Exercises where the learner edits broken starter code (hide revealing auto-checks). */
export function isFixCodeExercise(exercise: Exercise): boolean {
  const text = `${exercise.title} ${exercise.prompt}`;

  if (
    /git |commit message|checkpoint \d|describe all three|which topic a bug|push failure/i.test(
      text,
    )
  ) {
    return false;
  }

  return /\b(fix the|fix a syntax|fix a silent|debug silently|fix the const|fix the fallthrough|reorder broken|spot every bug|spot the assignment|fix the condition|find and fix all bugs|broken statement|throws an error:|student wrote .+ and got an error|accidental global)\b/i.test(
    text,
  );
}
