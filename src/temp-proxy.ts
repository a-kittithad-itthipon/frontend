import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

/* --------------------------------------------------
 * Route definitions
 * -------------------------------------------------- */
const PUBLIC_ROUTES = ["/", "/contact", "/active-site"];
const AUTH_ROUTES = ["/login", "/forgot-password", "/register"];

const ROLE_DASHBOARD: Record<string, string> = {
  admin: "/admin/dashboard",
  user: "/user/dashboard",
};

/* --------------------------------------------------
 * JWT config
 * -------------------------------------------------- */
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

/* --------------------------------------------------
 * Middleware
 * -------------------------------------------------- */
export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("token")?.value;
  const tokenForgot = req.cookies.get("token_forgot")?.value;

  /* --------------------------------------------------
   * Public routes
   * -------------------------------------------------- */
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  /* --------------------------------------------------
   * Forgot-password forced flow
   * -------------------------------------------------- */
  if (tokenForgot) {
    if (pathname === "/change-password") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/change-password", req.url));
  }

  /* --------------------------------------------------
   * Unauthenticated users
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
   * Verify JWT & extract role
   * -------------------------------------------------- */
  let role: string | undefined;

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    role = payload.role as string;
  } catch (err) {
    // Invalid / expired / tampered token
    const res = NextResponse.redirect(new URL("/login", req.url));
    res.cookies.delete("token");
    return res;
  }

  /* --------------------------------------------------
   * Role-based access control
   * -------------------------------------------------- */

  // Admin-only routes
  if (pathname.startsWith("/admin")) {
    return role === "admin"
      ? NextResponse.next()
      : NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  // User-only routes
  if (pathname.startsWith("/user")) {
    return role === "user"
      ? NextResponse.next()
      : NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  /* --------------------------------------------------
   * Prevent logged-in users from auth pages
   * -------------------------------------------------- */
  if (AUTH_ROUTES.includes(pathname)) {
    const redirectTo = ROLE_DASHBOARD[role];
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
