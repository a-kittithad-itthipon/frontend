import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/* --------------------------------------------------
 * Route definitions
 * -------------------------------------------------- */
const PUBLIC_ROUTES = ["/", "/contact", "/active-site"];
const AUTH_ROUTES = ["/login", "/forgot-password", "/register"];
const ROLE_DASHBOARD: Record<string, string> = {
  admin: "/admin/dashboard",
  user: "/user/dashboard",
};

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("token")?.value;
  const role = req.cookies.get("role")?.value;
  const tokenForgot = req.cookies.get("token_forgot")?.value;

  /* --------------------------------------------------
   * Allow public routes always
   * -------------------------------------------------- */
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  /* --------------------------------------------------
   * Forgot-password flow (forced)
   * -------------------------------------------------- */
  if (tokenForgot) {
    if (pathname === "/change-password") {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/change-password", req.url));
  }

  /* --------------------------------------------------
   * Unauthenticated user
   * -------------------------------------------------- */
  if (!token) {
    if (pathname === "/change-password") {
      return NextResponse.redirect(new URL("/forgot-password", req.url));
    }

    if (!AUTH_ROUTES.includes(pathname)) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  }

  /* --------------------------------------------------
   * Authenticated user – role-based protection
   * -------------------------------------------------- */

  // Admin-only routes
  if (pathname.startsWith("/admin")) {
    return role === "admin"
      ? NextResponse.next()
      : NextResponse.redirect(new URL("/login", req.url));
  }

  // User-only routes
  if (pathname.startsWith("/user")) {
    return role === "user"
      ? NextResponse.next()
      : NextResponse.redirect(new URL("/login", req.url));
  }

  // Prevent logged-in users from visiting auth pages
  if (AUTH_ROUTES.includes(pathname)) {
    const redirectTo = ROLE_DASHBOARD[role ?? ""];
    if (redirectTo) {
      return NextResponse.redirect(new URL(redirectTo, req.url));
    }
  }

  return NextResponse.next();
}

/* --------------------------------------------------
 * Optimized matcher
 * -------------------------------------------------- */
export const config = {
  matcher: [
    "/admin/:path*",
    "/user/:path*",
    "/login",
    "/forgot-password",
    "/register",
    "/change-password",
    "/",
    "/contact",
    "/active-site",
  ],
};
