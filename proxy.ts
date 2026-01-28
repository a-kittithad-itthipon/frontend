import { type NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

/* --------------------------------------------------
 * Route definitions
 * -------------------------------------------------- */
const PUBLIC_PREFIXES = ["/contact", "/site"];
const AUTH_ROUTES = ["/login", "/register", "/reset-password"];

const ROLE_DASHBOARD = {
  admin: "/admin/dashboard",
  user: "/user/dashboard",
} as const;

/* --------------------------------------------------
 * JWT config (Edge-safe)
 * -------------------------------------------------- */
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

/* --------------------------------------------------
 * Middleware (Next.js 15+ proxy)
 * -------------------------------------------------- */
export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const accessToken = req.cookies.get("access_token")?.value;
  const requestToken = req.cookies.get("request_token")?.value;
  const verifyToken = req.cookies.get("verify_token")?.value;

  /* --------------------------------------------------
   * Allow public routes
   * -------------------------------------------------- */
  const isPublic =
    pathname === "/" ||
    pathname === "/forbidden" ||
    PUBLIC_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  if (isPublic) {
    return NextResponse.next();
  }

  /* --------------------------------------------------
   * Forced password reset flow
   * -------------------------------------------------- */

  // 1. If trying to reach /verify without a requestToken
  if (pathname === "/reset-password/verify" && !requestToken) {
    return NextResponse.redirect(new URL("/reset-password/request", req.url));
  }

  // 2. If trying to reach /new without a verifyToken
  if (pathname === "/reset-password/new" && !verifyToken) {
    return NextResponse.redirect(new URL("/reset-password/request", req.url));
  }

  /* --------------------------------------------------
   * Unauthenticated users
   * -------------------------------------------------- */
  if (!accessToken) {
    const isAuthRoute = AUTH_ROUTES.some(
      (r) => pathname === r || pathname.startsWith(`${r}/`),
    );

    if (!isAuthRoute) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  }

  /* --------------------------------------------------
   * Verify JWT & extract role
   * -------------------------------------------------- */
  let role: keyof typeof ROLE_DASHBOARD;

  try {
    const { payload } = await jwtVerify(accessToken, JWT_SECRET);

    const rawRole = String(payload.role).toLowerCase();

    if (!(rawRole in ROLE_DASHBOARD)) {
      throw new Error("Invalid role");
    }

    role = rawRole as keyof typeof ROLE_DASHBOARD;
  } catch {
    const res = NextResponse.redirect(new URL("/login", req.url));
    res.cookies.delete("access_token");
    return res;
  }

  /* --------------------------------------------------
   * Base dashboard redirect (role-based)
   * -------------------------------------------------- */
  if (pathname === "/login") {
    return NextResponse.redirect(new URL(ROLE_DASHBOARD[role], req.url));
  }

  /* --------------------------------------------------
   * Prevent logged-in users from auth pages
   * -------------------------------------------------- */
  if (AUTH_ROUTES.some((r) => pathname === r || pathname.startsWith(`${r}/`))) {
    return NextResponse.redirect(new URL(ROLE_DASHBOARD[role], req.url));
  }

  /* --------------------------------------------------
   * Role-based access control
   * -------------------------------------------------- */
  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/forbidden", req.url));
  }

  if (pathname.startsWith("/user") && role !== "user") {
    return NextResponse.redirect(new URL("/forbidden", req.url));
  }

  return NextResponse.next();
}

/* --------------------------------------------------
 * Matcher
 * -------------------------------------------------- */
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|img).*)"],
};
