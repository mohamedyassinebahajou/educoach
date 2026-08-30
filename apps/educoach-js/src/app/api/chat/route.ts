import { NextResponse } from "next/server";
import {
  guardMessage,
  runCodeHelper,
  runConceptTutor,
  runPerformanceAnalyzer,
  type ChatResult,
} from "@/lib/agents";
import { getSession } from "@/lib/auth";
import { appendCoachAlert } from "@/lib/coachAlerts";
import { findLesson } from "@/lib/curriculum";
import { exercises } from "@/lib/exercises";
import { pythonApiBaseUrl, pythonChat, type PythonChatResponse } from "@/lib/pythonApi";

export type ChatRequestBody = {
  mode: "tutor" | "helper";
  message: string;
  lessonSlug?: string;
  exerciseId?: string;
  code?: string;
  failingLabels?: string[];
};

type SessionUser = NonNullable<Awaited<ReturnType<typeof getSession>>>;

function truncate(text: string, max: number): string {
  const t = text.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max)}\n…(truncated)`;
}

async function mergeCoachAlert(
  rag: PythonChatResponse,
  user: SessionUser | null,
  route: "tutor" | "helper",
): Promise<{ coach_alert: string | null; at_risk: boolean }> {
  const coachAlert = (rag.coach_alert || "").trim() || null;
  if (coachAlert && user) {
    appendCoachAlert({
      text: coachAlert,
      studentId: user.id,
      studentLabel: user.displayName || user.username,
      route: "analyzer",
    });
  }

  let at_risk = Boolean(rag.at_risk);
  let coach_alert = coachAlert;
  if (!coach_alert && user?.role === "learner") {
    const analysis = await runPerformanceAnalyzer({
      userId: user.id,
      username: user.username,
      displayName: user.displayName,
      route,
    });
    coach_alert = analysis.coach_alert;
    at_risk = analysis.at_risk;
  }
  return { coach_alert, at_risk };
}

function apiUnreachableResult(detail: string): ChatResult {
  return {
    reply:
      `The EduCoach AI API is not reachable (${pythonApiBaseUrl()}).\n\n` +
      `${detail}\n\n` +
      `From the repo root, start it with:\n` +
      `  uvicorn src.api.main:app --reload --port 8000\n\n` +
      `Or set EDUCOACH_API_URL / EDUCOACH_API_FALLBACK=local in apps/educoach-js/.env`,
    route: "blocked",
    blocked: true,
    blockReason: "api_unreachable",
    coach_alert: null,
    at_risk: false,
    sources: [],
  };
}

/**
 * POST /api/chat
 * Tutor (lesson): Python RAG Concept Tutor.
 * Helper (exercise): Python Code Helper (hints only).
 * Learner UI must never render `coach_alert` as a chat bubble.
 */
export async function POST(request: Request) {
  const user = await getSession();

  let body: ChatRequestBody;
  try {
    body = (await request.json()) as ChatRequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (body.mode !== "tutor" && body.mode !== "helper") {
    return NextResponse.json({ error: "mode must be tutor or helper" }, { status: 400 });
  }

  const guard = guardMessage(body.message ?? "");
  if (guard.blocked) {
    const result: ChatResult = {
      reply: "I can't help with that request. Ask a question about the lesson or exercise.",
      route: "blocked",
      blocked: true,
      blockReason: guard.reason,
      coach_alert: null,
      at_risk: false,
      sources: [],
    };
    return NextResponse.json(result);
  }

  const studentId = user?.username ?? "guest";
  const allowFallback = process.env.EDUCOACH_API_FALLBACK === "local";

  // --- Tutor: Python RAG Concept Tutor ---
  if (body.mode === "tutor") {
    if (!body.lessonSlug) {
      return NextResponse.json({ error: "lessonSlug required for tutor" }, { status: 400 });
    }

    const found = findLesson(body.lessonSlug);
    const lessonTitle = found?.lesson.title ?? body.lessonSlug;

    const ragMessage =
      `I'm on the EduCoach JS lesson “${lessonTitle}” (${body.lessonSlug}). ` +
      `Please explain using our SAS training lesson materials (RAG).\n\n` +
      `Question: ${body.message.trim()}`;

    try {
      const rag = await pythonChat({ studentId, message: ragMessage });
      const { coach_alert, at_risk } = await mergeCoachAlert(rag, user, "tutor");
      const result: ChatResult = {
        reply: rag.blocked
          ? rag.reply || "That question was blocked by the tutor guardrails."
          : rag.reply,
        route: rag.blocked ? "blocked" : rag.route === "helper" ? "helper" : "tutor",
        blocked: Boolean(rag.blocked),
        blockReason: rag.block_reason || null,
        coach_alert,
        at_risk,
        sources: [{ lessonTitle, heading: "RAG · Concept Tutor API" }],
      };
      return NextResponse.json(result);
    } catch (err) {
      const detail = err instanceof Error ? err.message : String(err);
      if (allowFallback) {
        const local = runConceptTutor({
          message: body.message,
          lessonSlug: body.lessonSlug,
          lessonTitle,
        });
        return NextResponse.json({
          reply:
            `(API unreachable — local lesson stub)\n\n${local.reply}\n\n` +
            `Start: uvicorn src.api.main:app --reload --port 8000`,
          route: local.route,
          blocked: false,
          blockReason: null,
          coach_alert: null,
          at_risk: false,
          sources: local.sources,
        } satisfies ChatResult);
      }
      return NextResponse.json(apiUnreachableResult(detail));
    }
  }

  // --- Helper: Python Code Helper (hints only) ---
  if (!body.exerciseId) {
    return NextResponse.json({ error: "exerciseId required for helper" }, { status: 400 });
  }

  const exercise = exercises.find((e) => e.id === body.exerciseId);
  if (!exercise) {
    return NextResponse.json({ error: `Unknown exercise ${body.exerciseId}` }, { status: 404 });
  }

  const fails = (body.failingLabels ?? []).filter(Boolean);
  const codeBlock = truncate(body.code ?? "", 2500);

  // Bias supervisor toward Code Helper (debug/code/error keywords).
  const helperMessage = [
    "I need a debug hint for my JavaScript code / bug / error.",
    "Mode: Code Helper — hints only, NEVER paste a full solution.",
    "",
    `Exercise: ${exercise.id} — ${exercise.title}`,
    `Prompt: ${exercise.prompt}`,
    `Max points: ${exercise.maxPoints} (hints reduce score — do not reveal full solutions)`,
    fails.length > 0
      ? `Failing tests: ${fails.map((f) => `“${f}”`).join("; ")}`
      : "Failing tests: (none yet — student may not have run tests)",
    "",
    "Current code:",
    "```js",
    codeBlock || "// (empty editor)",
    "```",
    "",
    `Student message: ${body.message.trim()}`,
  ].join("\n");

  try {
    const rag = await pythonChat({ studentId, message: helperMessage });
    const { coach_alert, at_risk } = await mergeCoachAlert(rag, user, "helper");
    const result: ChatResult = {
      reply: rag.blocked
        ? rag.reply || "That question was blocked by the helper guardrails."
        : rag.reply,
      route: rag.blocked ? "blocked" : rag.route === "tutor" ? "tutor" : "helper",
      blocked: Boolean(rag.blocked),
      blockReason: rag.block_reason || null,
      coach_alert,
      at_risk,
      sources: [
        {
          lessonTitle: exercise.lessonSlug ?? exercise.id,
          heading: "Code Helper API",
        },
      ],
    };
    return NextResponse.json(result);
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    if (allowFallback) {
      const local = runCodeHelper({
        message: body.message,
        exerciseId: exercise.id,
        code: body.code,
        failingLabels: body.failingLabels,
      });
      return NextResponse.json({
        reply:
          `(API unreachable — local helper stub)\n\n${local.reply}\n\n` +
          `Start: uvicorn src.api.main:app --reload --port 8000`,
        route: local.route,
        blocked: false,
        blockReason: null,
        coach_alert: null,
        at_risk: false,
        sources: local.sources,
      } satisfies ChatResult);
    }
    return NextResponse.json(apiUnreachableResult(detail));
  }
}
