import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    let response: Response;

    try {
      response = await fetch(
        `${process.env.FLASK_API_URL}/api/auth/reset-password/request`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: body.username }),
        },
      );
    } catch {
      // server is offline / timeout / DNS error
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

    // set new cookie
    const cookieStore = await cookies();
    cookieStore.set("request_token", result.data?.request_token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 5 * 60, // 5 minutes
    });

    return NextResponse.json(
      { message: result?.message },
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
