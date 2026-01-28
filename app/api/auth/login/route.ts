import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const cookieStore = await cookies();

  try {
    const body = await req.json();

    let response: Response;

    try {
      response = await fetch(`${process.env.FLASK_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        // optional but very useful
        signal: AbortSignal.timeout(5000),
      });
    } catch {
      return NextResponse.json(
        { message: "Service unavailable" },
        { status: 503 },
      );
    }

    const result = await response.json();

    if (!response.ok) {
      // Forward backend error cleanly
      return NextResponse.json(
        { message: result?.message },
        { status: response.status },
      );
    }

    cookieStore.set("access_token", result.data.access_token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 10 * 60, // 10 minutes
    });

    return NextResponse.json(
      { message: result.message },
      { status: response.status },
    );
  } catch (error) {
    console.error("Unexpected error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
