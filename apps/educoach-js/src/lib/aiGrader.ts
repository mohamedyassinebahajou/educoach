import { gradeExercise, type GradeResult } from "@/lib/gradeExercise";
import type { Exercise } from "@/lib/exercises";
import { pointsRemaining } from "@/lib/exerciseScoring";
import { pythonGrade, pythonHealth } from "@/lib/pythonApi";

export type AiGradeResult = {
  passed: boolean;
  feedback: string;
  reasons: string[];
  skipped: boolean;
};

export type SubmissionGradeResult = {
  auto: GradeResult | null;
  ai: AiGradeResult;
  passed: boolean;
  points: number;
};

function buildAutoTestSummary(auto: GradeResult): string {
  const lines = auto.checks.map(
    (c) => `${c.passed ? "PASS" : "FAIL"}: ${c.label}${c.detail ? ` — ${c.detail}` : ""}`,
  );
  return lines.join("\n");
}

function localAiGrade(autoPassed: boolean): AiGradeResult {
  if (!autoPassed) {
    return {
      passed: false,
      feedback: "Fix the failing automated checks before submitting.",
      reasons: ["Automated tests did not pass."],
      skipped: true,
    };
  }
  return {
    passed: true,
    feedback: "Accepted based on automated tests (AI grader unavailable).",
    reasons: ["Auto-tests passed; AI review skipped."],
    skipped: true,
  };
}

export async function gradeSubmissionWithAi(
  exercise: Exercise,
  code: string,
  hintsRevealed: number,
): Promise<SubmissionGradeResult> {
  const hasChecks = (exercise.checks?.length ?? 0) > 0;
  const auto = hasChecks ? gradeExercise(code, exercise.checks!) : null;
  const autoPassed = auto ? auto.passed : true;
  const hints = exercise.hints.slice(0, Math.max(0, hintsRevealed));
  const points = autoPassed ? pointsRemaining(exercise.maxPoints, hints) : 0;

  if (!autoPassed && auto) {
    return {
      auto,
      ai: localAiGrade(false),
      passed: false,
      points: 0,
    };
  }

  const allowFallback = process.env.EDUCOACH_API_FALLBACK === "local";
  const apiUp = await pythonHealth();

  if (!apiUp && allowFallback) {
    return {
      auto,
      ai: localAiGrade(true),
      passed: autoPassed,
      points,
    };
  }

  if (!apiUp) {
    return {
      auto,
      ai: {
        passed: false,
        feedback:
          "The AI grader is unavailable right now. Please try submitting again in a moment.",
        reasons: ["EduCoach AI API is not reachable."],
        skipped: false,
      },
      passed: false,
      points: 0,
    };
  }

  try {
    const ai = await pythonGrade({
      exerciseId: exercise.id,
      title: exercise.title,
      prompt: exercise.prompt,
      code,
      consoleOutput: auto?.consoleLines.join("\n") ?? "",
      autoTestsPassed: autoPassed,
      autoTestSummary: auto ? buildAutoTestSummary(auto) : "No automated checks for this exercise.",
    });

    const passed = autoPassed && ai.passed;
    return {
      auto,
      ai: { ...ai, skipped: false },
      passed,
      points: passed ? points : 0,
    };
  } catch (err) {
    if (allowFallback) {
      return {
        auto,
        ai: localAiGrade(true),
        passed: autoPassed,
        points,
      };
    }
    const detail = err instanceof Error ? err.message : String(err);
    return {
      auto,
      ai: {
        passed: false,
        feedback: `AI grading failed: ${detail}`,
        reasons: ["AI grader error"],
        skipped: false,
      },
      passed: false,
      points: 0,
    };
  }
}
