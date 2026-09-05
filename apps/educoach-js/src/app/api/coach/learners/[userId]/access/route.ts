import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { MAX_CURRICULUM_DAY, setLearnerMaxUnlockedDay } from "@/lib/dayAccess";
import { prisma } from "@/lib/db";

type RouteContext = { params: Promise<{ userId: string }> };

export async function PATCH(request: Request, context: RouteContext) {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Login required" }, { status: 401 });
  }
  if (user.role !== "coach") {
    return NextResponse.json({ error: "Coach only" }, { status: 403 });
  }

  const { userId } = await context.params;
  const learner = await prisma.user.findFirst({
    where: { id: userId, role: "learner" },
    select: { id: true },
  });
  if (!learner) {
    return NextResponse.json({ error: "Learner not found" }, { status: 404 });
  }

  const body = (await request.json().catch(() => null)) as {
    maxUnlockedDay?: number | null;
  } | null;

  if (body?.maxUnlockedDay === null) {
    await setLearnerMaxUnlockedDay(userId, null);
    return NextResponse.json({ maxUnlockedDay: null });
  }

  const day = Number(body?.maxUnlockedDay);
  if (Number.isNaN(day) || day < 1 || day > MAX_CURRICULUM_DAY) {
    return NextResponse.json({ error: "Invalid maxUnlockedDay" }, { status: 400 });
  }

  const maxUnlockedDay = await setLearnerMaxUnlockedDay(userId, day);
  return NextResponse.json({ maxUnlockedDay });
}
