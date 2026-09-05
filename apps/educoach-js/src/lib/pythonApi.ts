/**
 * Client for the Python EduCoach FastAPI (RAG Tutor / multi-agent /chat).
 * Default: http://localhost:8000 — set EDUCOACH_API_URL to override.
 */

export type PythonChatResponse = {
  reply: string;
  route: "tutor" | "helper" | null;
  blocked: boolean;
  block_reason: string;
  predicted_score: number | null;
  at_risk: boolean | null;
  coach_alert: string;
};

export type PythonGradeResponse = {
  passed: boolean;
  feedback: string;
  reasons: string[];
};

export function pythonApiBaseUrl(): string {
  return (process.env.EDUCOACH_API_URL ?? "http://localhost:8000").replace(/\/$/, "");
}

export async function pythonHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${pythonApiBaseUrl()}/health`, {
      method: "GET",
      signal: AbortSignal.timeout(3000),
      cache: "no-store",
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function pythonChat(input: {
  studentId: string;
  message: string;
}): Promise<PythonChatResponse> {
  const res = await fetch(`${pythonApiBaseUrl()}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      student_id: input.studentId,
      message: input.message,
      // No RF features from the JS app — analyzer stays silent unless features are sent.
      features: null,
    }),
    signal: AbortSignal.timeout(120_000),
    cache: "no-store",
  });

  if (!res.ok) {
    let detail = res.statusText;
    try {
      const err = (await res.json()) as { detail?: string };
      if (err.detail) detail = err.detail;
    } catch {
      /* ignore */
    }
    throw new Error(`EduCoach API ${res.status}: ${detail}`);
  }

  return (await res.json()) as PythonChatResponse;
}

export async function pythonGrade(input: {
  exerciseId: string;
  title: string;
  prompt: string;
  code: string;
  consoleOutput: string;
  autoTestsPassed: boolean;
  autoTestSummary: string;
}): Promise<PythonGradeResponse> {
  const res = await fetch(`${pythonApiBaseUrl()}/grade`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      exercise_id: input.exerciseId,
      title: input.title,
      prompt: input.prompt,
      code: input.code,
      console_output: input.consoleOutput,
      auto_tests_passed: input.autoTestsPassed,
      auto_test_summary: input.autoTestSummary,
    }),
    signal: AbortSignal.timeout(120_000),
    cache: "no-store",
  });

  if (!res.ok) {
    let detail = res.statusText;
    try {
      const err = (await res.json()) as { detail?: string };
      if (err.detail) detail = err.detail;
    } catch {
      /* ignore */
    }
    throw new Error(`EduCoach grade API ${res.status}: ${detail}`);
  }

  return (await res.json()) as PythonGradeResponse;
}
