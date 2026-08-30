import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
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
    passed?: boolean;
    passedCount?: number;
    totalCount?: number;
  } | null;

  if (!body?.exerciseId || typeof body.code !== "string") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const attempt = await prisma.attempt.create({
    data: {
      userId: user.id,
      exerciseId: body.exerciseId,
      code: body.code,
      passed: Boolean(body.passed),
      passedCount: Number(body.passedCount ?? 0),
      totalCount: Number(body.totalCount ?? 0),
    },
  });

  return NextResponse.json({
    attempt: {
      exerciseId: attempt.exerciseId,
      code: attempt.code,
      passed: attempt.passed,
      passedCount: attempt.passedCount,
      totalCount: attempt.totalCount,
      at: attempt.createdAt.toISOString(),
    },
  });
}
