import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { MAX_CURRICULUM_DAY, setCohortMaxUnlockedDay } from "@/lib/dayAccess";

export async function PATCH(request: Request) {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Login required" }, { status: 401 });
  }
  if (user.role !== "coach") {
    return NextResponse.json({ error: "Coach only" }, { status: 403 });
  }

  const body = (await request.json().catch(() => null)) as { maxUnlockedDay?: number } | null;
  const day = Number(body?.maxUnlockedDay);
  if (Number.isNaN(day) || day < 1 || day > MAX_CURRICULUM_DAY) {
    return NextResponse.json({ error: "Invalid maxUnlockedDay" }, { status: 400 });
  }

  const maxUnlockedDay = await setCohortMaxUnlockedDay(day);
  return NextResponse.json({ maxUnlockedDay });
}

export async function GET() {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Login required" }, { status: 401 });
  }
  if (user.role !== "coach") {
    return NextResponse.json({ error: "Coach only" }, { status: 403 });
  }

  const { getCohortMaxUnlockedDay } = await import("@/lib/dayAccess");
  const maxUnlockedDay = await getCohortMaxUnlockedDay();
  return NextResponse.json({ maxUnlockedDay });
}
