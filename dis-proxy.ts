import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

/* --------------------------------------------------
 * Route definitions
 * -------------------------------------------------- */
const PUBLIC_PREFIXES = ["/contact", "/site"];
const AUTH_ROUTES = ["/login", "/register", "/reset-password"];

const ROLE_DASHBOARD: Record<string, string> = {
  admin: "/admin/dashboard",
  user: "/user/dashboard",
};

/* --------------------------------------------------
 * JWT config
 * -------------------------------------------------- */
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

/* --------------------------------------------------
 * Proxy (Middleware)
 * -------------------------------------------------- */
export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const sessionToken = req.cookies.get("session_token")?.value;
  const passwordResetToken = req.cookies.get("password_reset_token")?.value;
  const verifyToken = req.cookies.get("verify_token")?.value;

  /* --------------------------------------------------
   * Public routes
   * -------------------------------------------------- */
  if (pathname === "/" || PUBLIC_PREFIXES.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  /* --------------------------------------------------
   * Forced password reset flow
   * -------------------------------------------------- */
  if (passwordResetToken) {
    if (
      pathname === "/reset-password/verify" ||
      AUTH_ROUTES.includes(pathname)
    ) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/reset-password/verify", req.url));
  }

  if (verifyToken) {
    if (pathname === "/reset-password/new" || AUTH_ROUTES.includes(pathname)) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/reset-password/new", req.url));
  }

  /* --------------------------------------------------
   * Unauthenticated users
   * -------------------------------------------------- */
  if (!sessionToken) {
    if (!AUTH_ROUTES.includes(pathname)) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  /* --------------------------------------------------
   * Verify JWT & extract role
   * -------------------------------------------------- */
  let role: "admin" | "user";

  try {
    const { payload } = await jwtVerify(sessionToken, JWT_SECRET);

    const rawRole = String(payload.role).toLowerCase();

    if (rawRole !== "admin" && rawRole !== "user") {
      throw new Error("Invalid role");
    }

    role = rawRole;
  } catch {
    const res = NextResponse.redirect(new URL("/login", req.url));
    res.cookies.delete("session_token");
    return res;
  }

  /* --------------------------------------------------
   * Prevent logged-in users from auth pages
   * -------------------------------------------------- */
  if (AUTH_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL(ROLE_DASHBOARD[role], req.url));
  }

  /* --------------------------------------------------
   * Role-based access control
   * -------------------------------------------------- */
  if (pathname.startsWith("/admin")) {
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/forbidden", req.url));
    }
  }

  if (pathname.startsWith("/user")) {
    if (role !== "user") {
      return NextResponse.redirect(new URL("/forbidden", req.url));
    }
  }

  return NextResponse.next();
}

/* --------------------------------------------------
 * Matcher
 * -------------------------------------------------- */
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
