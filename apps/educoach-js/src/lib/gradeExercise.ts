import { runConsoleSandbox } from "@/lib/runSandbox";
import type { ExerciseCheck } from "@/lib/exercises";

export type CheckResult = {
  id: string;
  label: string;
  passed: boolean;
  detail?: string;
};

export type GradeResult = {
  passed: boolean;
  checks: CheckResult[];
  consoleLines: string[];
  runtimeError?: string;
};

export function gradeExercise(code: string, checks: ExerciseCheck[]): GradeResult {
  const run = runConsoleSandbox(code);
  if (!run.ok) {
    return {
      passed: false,
      consoleLines: run.lines,
      runtimeError: run.error,
      checks: checks.map((c) => ({
        id: c.id,
        label: c.label,
        passed: false,
        detail: "Code threw before tests could finish",
      })),
    };
  }

  const results: CheckResult[] = checks.map((check) => {
    if (check.kind === "consoleLine") {
      const actual = run.lines[check.index];
      const passed = actual === check.equals;
      return {
        id: check.id,
        label: check.label,
        passed,
        detail: passed
          ? undefined
          : `Expected console line ${check.index + 1} to be "${check.equals}", got ${
              actual === undefined ? "(nothing)" : `"${actual}"`
            }`,
      };
    }

    if (check.kind === "consoleLinesExact") {
      const passed =
        run.lines.length === check.lines.length &&
        check.lines.every((line, i) => run.lines[i] === line);
      return {
        id: check.id,
        label: check.label,
        passed,
        detail: passed
          ? undefined
          : `Expected output:\n${check.lines.join("\n")}\nGot:\n${
              run.lines.length ? run.lines.join("\n") : "(empty)"
            }`,
      };
    }

    if (check.kind === "consoleLogMinCount") {
      const count = (code.match(/console\.log\s*\(/g) ?? []).length;
      const passed = count >= check.min;
      return {
        id: check.id,
        label: check.label,
        passed,
        detail: passed
          ? undefined
          : `Expected at least ${check.min} console.log(...) calls, found ${count}`,
      };
    }

    if (check.kind === "consoleIncludesLine") {
      const passed = run.lines.some(
        (line) => line === check.equals || line.includes(check.equals),
      );
      return {
        id: check.id,
        label: check.label,
        passed,
        detail: passed
          ? undefined
          : `Expected console output to include "${check.equals}"`,
      };
    }

    // sourceIncludes
    const re = new RegExp(check.pattern, check.flags);
    const passed = re.test(code);
    return {
      id: check.id,
      label: check.label,
      passed,
      detail: passed ? undefined : "Required code pattern not found in your editor",
    };
  });

  return {
    passed: results.every((r) => r.passed),
    checks: results,
    consoleLines: run.lines,
  };
}
