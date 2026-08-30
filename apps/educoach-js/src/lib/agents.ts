import { appendCoachAlert } from "@/lib/coachAlerts";
import { exercises } from "@/lib/exercises";
import { getLearnerProgress } from "@/lib/progress";
import { formatContext, retrieveLessonContext } from "@/lib/retrieveLesson";

export type ChatRoute = "tutor" | "helper" | "blocked";

export type ChatResult = {
  reply: string;
  route: ChatRoute;
  blocked: boolean;
  blockReason: string | null;
  /** Coach-only; never show in learner chat bubbles. */
  coach_alert: string | null;
  at_risk: boolean;
  sources: { lessonTitle: string; heading: string }[];
};

const INJECTION =
  /\b(ignore (all )?(previous|prior) (instructions|prompts)|system prompt|jailbreak|reveal (your )?prompt)\b/i;

const WANT_SOLUTION =
  /\b(give me (the )?(full |complete )?(answer|solution|code)|write (the |my )?code for me|paste (the )?solution|cheat)\b/i;

function stripForSnippet(text: string, max = 220): string {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length <= max ? clean : `${clean.slice(0, max)}…`;
}

/** Concept Tutor — answers from lesson MDX retrieval only (no coach_alert in reply). */
export function runConceptTutor(input: {
  message: string;
  lessonSlug: string;
  lessonTitle?: string;
}): Pick<ChatResult, "reply" | "route" | "sources"> {
  const chunks = retrieveLessonContext(input.message, [input.lessonSlug], 3);
  const sources = chunks.map((c) => ({
    lessonTitle: c.lessonTitle,
    heading: c.heading,
  }));
  const context = formatContext(chunks);
  const title = input.lessonTitle ?? chunks[0]?.lessonTitle ?? input.lessonSlug;

  if (!context.trim()) {
    return {
      route: "tutor",
      sources: [],
      reply: `I don't have lesson text for “${title}” yet. Open the lesson page and try again.`,
    };
  }

  const best = chunks[0];
  const grounded =
    best && best.score > 0
      ? `From **${best.lessonTitle}** (${best.heading}):\n\n${stripForSnippet(best.text, 320)}`
      : `Here is the closest material from **${title}**:\n\n${stripForSnippet(chunks[0]?.text ?? context, 320)}`;

  const extra =
    chunks.length > 1 && chunks[1].score > 0
      ? `\n\nAlso related (${chunks[1].heading}): ${stripForSnippet(chunks[1].text, 160)}`
      : "";

  const tip =
    best && best.score === 0
      ? `\n\nI couldn't match your wording tightly — try asking about a heading from this lesson (e.g. let vs const, console.log).`
      : `\n\nAsk a follow-up if you want another part of this lesson explained.`;

  return {
    route: "tutor",
    sources,
    reply: `${grounded}${extra}${tip}`,
  };
}

/** Code Helper — hints only; never dumps a full solution. */
export function runCodeHelper(input: {
  message: string;
  exerciseId: string;
  code?: string;
  failingLabels?: string[];
}): Pick<ChatResult, "reply" | "route" | "sources"> {
  const exercise = exercises.find((e) => e.id === input.exerciseId);
  if (!exercise) {
    return {
      route: "helper",
      sources: [],
      reply: `Unknown exercise ${input.exerciseId}.`,
    };
  }

  if (WANT_SOLUTION.test(input.message)) {
    return {
      route: "helper",
      sources: [],
      reply:
        "I can't paste a full solution — that would skip the learning. Try a narrower question (e.g. “why does my console line not match?”) or use the Hint button on the solve page.",
    };
  }

  const fails = input.failingLabels?.filter(Boolean) ?? [];
  const hints = exercise.hints ?? [];
  const codeLen = (input.code ?? "").trim().length;

  const parts: string[] = [];
  parts.push(`**Hints only** for ${exercise.id} · ${exercise.title}.`);

  if (fails.length > 0) {
    parts.push(
      `Failing checks: ${fails.map((f) => `“${f}”`).join("; ")}. Focus on the first failing test before worrying about the rest.`,
    );
  } else {
    parts.push(`Prompt reminder: ${exercise.prompt}`);
  }

  if (codeLen === 0) {
    parts.push("Your draft area looks empty — work the prompt on paper or start typing a draft.");
  } else if (hints[0]) {
    parts.push(`Hint: ${hints[0].text}`);
  }

  if (fails.some((f) => /exact|string|print|console/i.test(f)) && hints[1]) {
    parts.push(`Next nudge: ${hints[1].text}`);
  } else if (hints[1] && /hint|stuck|error|fail/i.test(input.message)) {
    parts.push(`Next nudge: ${hints[1].text}`);
  }

  if (exercise.constraints && exercise.constraints.length > 0) {
    parts.push(`Constraints to double-check: ${exercise.constraints.slice(0, 2).join("; ")}.`);
  }

  parts.push("I won't write the finished answer for you — try one small step, then ask again.");

  return {
    route: "helper",
    sources: exercise.lessonSlug
      ? [{ lessonTitle: exercise.lessonSlug, heading: "linked lesson" }]
      : [],
    reply: parts.join("\n\n"),
  };
}

/** Silent analyzer — fills coach_alert only; never touches reply. */
export async function runPerformanceAnalyzer(input: {
  userId: string;
  username: string;
  displayName?: string;
  route: "tutor" | "helper";
}): Promise<{ coach_alert: string | null; at_risk: boolean }> {
  const progress = await getLearnerProgress(input.userId);
  if (!progress.atRisk) {
    return { coach_alert: null, at_risk: false };
  }

  const label = input.displayName ?? input.username;
  const text = `COACH ALERT — ${label} (${input.username}) predicted at-risk during ${input.route} chat. Reason: ${progress.riskReason ?? "heuristic"}. Consider tutoring or a check-in.`;

  appendCoachAlert({
    text,
    studentId: input.userId,
    studentLabel: label,
    route: "analyzer",
  });

  return { coach_alert: text, at_risk: true };
}

export function guardMessage(message: string): { blocked: true; reason: string } | { blocked: false } {
  const trimmed = message.trim();
  if (!trimmed) return { blocked: true, reason: "Empty message" };
  if (trimmed.length > 2000) return { blocked: true, reason: "Message too long" };
  if (INJECTION.test(trimmed)) {
    return { blocked: true, reason: "Blocked by safety guardrails" };
  }
  return { blocked: false };
}
