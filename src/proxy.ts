import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

/* --------------------------------------------------
 * Route definitions
 * -------------------------------------------------- */
const PUBLIC_ROUTES = ["/", "/contact", "/site"];
const AUTH_ROUTES = ["/login", "/forgot-password", "/register"];

const ROLE_DASHBOARD: Record<string, string> = {
  admin: "/admin/dashboard",
  user: "/user/dashboard",
};

/* --------------------------------------------------
 * JWT config
 * -------------------------------------------------- */
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

/* --------------------------------------------------
 * Middleware (proxy)
 * -------------------------------------------------- */
export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const sessionToken = req.cookies.get("session_token")?.value;
  const passwordResetToken = req.cookies.get("password_reset_token")?.value;

  /* --------------------------------------------------
   * Public routes (prefix match)
   * -------------------------------------------------- */
  if (
    PUBLIC_ROUTES.some(
      (route) => pathname === route || pathname.startsWith(route + "/"),
    )
  ) {
    return NextResponse.next();
  }

  /* --------------------------------------------------
   * Forced forgot-password flow
   * -------------------------------------------------- */
  if (passwordResetToken) {
    if (pathname === "/change-password") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/change-password", req.url));
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
  let role: string;

  try {
    const { payload } = await jwtVerify(sessionToken, JWT_SECRET);

    if (!payload.role) {
      throw new Error("Role missing in token");
    }

    role = String(payload.role).toLowerCase();
  } catch {
    const res = NextResponse.redirect(new URL("/login", req.url));
    res.cookies.delete("token");
    return res;
  }

  /* --------------------------------------------------
   * Prevent logged-in users from auth pages
   * -------------------------------------------------- */
  if (AUTH_ROUTES.includes(pathname)) {
    return NextResponse.redirect(
      new URL(ROLE_DASHBOARD[role] ?? "/unauthorized", req.url),
    );
  }

  /* --------------------------------------------------
   * Role-based access control
   * -------------------------------------------------- */
  if (pathname.startsWith("/admin")) {
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/user")) {
    if (role !== "user") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

/* --------------------------------------------------
 * Matcher
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
    "/contact/:path*",
    "/site/:path*",
  ],
};
