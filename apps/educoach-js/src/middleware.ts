import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const COOKIE = "educoach_session";

async function sessionFromRequest(request: NextRequest) {
  const token = request.cookies.get(COOKIE)?.value;
  if (!token) return null;
  try {
    const secret = new TextEncoder().encode(
      process.env.AUTH_SECRET ?? "educoach-js-dev-secret-change-me",
    );
    const { payload } = await jwtVerify(token, secret);
    if (
      typeof payload.id !== "string" ||
      typeof payload.username !== "string" ||
      (payload.role !== "learner" && payload.role !== "coach")
    ) {
      return null;
    }
    return { id: payload.id, username: payload.username, role: payload.role as "learner" | "coach" };
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = await sessionFromRequest(request);

  if (pathname.startsWith("/coach")) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
    if (user.role !== "coach") {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      url.searchParams.set("error", "coach-only");
      return NextResponse.redirect(url);
    }
  }

  if (/^\/exercises\/[^/]+\/solve\/?$/.test(pathname) || pathname === "/progress") {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/coach/:path*", "/exercises/:id/solve", "/progress"],
};
