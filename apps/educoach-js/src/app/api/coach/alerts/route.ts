import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { listCoachAlerts } from "@/lib/coachAlerts";

/** GET /api/coach/alerts — coach-only; chat coach_alert side channel. */
export async function GET() {
  const user = await getSession();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.role !== "coach") {
    return NextResponse.json({ error: "Coach only" }, { status: 403 });
  }

  return NextResponse.json({ alerts: listCoachAlerts(30) });
}
