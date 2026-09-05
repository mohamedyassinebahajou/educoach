import { NextResponse } from "next/server";
import { gradeSubmissionWithAi } from "@/lib/aiGrader";
import { getSession } from "@/lib/auth";
import { assertLearnerCanAccessExerciseDay } from "@/lib/dayAccess";
import { getExercise } from "@/lib/exercises";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Login required" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const exerciseId = searchParams.get("exerciseId");
  if (!exerciseId) {
    return NextResponse.json({ error: "exerciseId required" }, { status: 400 });
  }

  const attempts = await prisma.attempt.findMany({
    where: { userId: user.id, exerciseId },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return NextResponse.json({
    attempts: attempts.map((a) => ({
      exerciseId: a.exerciseId,
      code: a.code,
      passed: a.passed,
      passedCount: a.passedCount,
      totalCount: a.totalCount,
      aiFeedback: a.aiFeedback,
      at: a.createdAt.toISOString(),
    })),
  });
}

export async function POST(request: Request) {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Login required" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as {
    exerciseId?: string;
    code?: string;
    hintsRevealed?: number;
  } | null;

  if (!body?.exerciseId || typeof body.code !== "string") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const exercise = getExercise(body.exerciseId);
  if (!exercise) {
    return NextResponse.json({ error: "Unknown exercise" }, { status: 404 });
  }

  if (user.role === "learner") {
    const allowed = await assertLearnerCanAccessExerciseDay(user.id, exercise.day);
    if (!allowed) {
      return NextResponse.json({ error: "Day locked" }, { status: 403 });
    }
  }

  const hintsRevealed = Number(body.hintsRevealed ?? 0);
  const grade = await gradeSubmissionWithAi(exercise, body.code, hintsRevealed);

  const attempt = await prisma.attempt.create({
    data: {
      userId: user.id,
      exerciseId: body.exerciseId,
      code: body.code,
      passed: grade.passed,
      passedCount: grade.points,
      totalCount: exercise.maxPoints,
      aiFeedback: grade.ai.feedback || null,
    },
  });

  return NextResponse.json({
    attempt: {
      exerciseId: attempt.exerciseId,
      code: attempt.code,
      passed: attempt.passed,
      passedCount: attempt.passedCount,
      totalCount: attempt.totalCount,
      aiFeedback: attempt.aiFeedback,
      at: attempt.createdAt.toISOString(),
    },
    grade: {
      auto: grade.auto,
      ai: grade.ai,
      passed: grade.passed,
      points: grade.points,
    },
  });
}
