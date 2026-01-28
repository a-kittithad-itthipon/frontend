import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    let flaskRes: Response;

    try {
      flaskRes = await fetch(
        `${process.env.FLASK_API_URL}/api/auth/reset-password/request`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: body.username }),
        },
      );
    } catch {
      // Flask server is offline / timeout / DNS error
      return NextResponse.json(
        { message: "Service unavailable" },
        { status: 503 },
      );
    }

    let response: any = null;

    try {
      response = await flaskRes.json();
    } catch {
      return NextResponse.json(
        { message: "Invalid response from backend server" },
        { status: 502 },
      );
    }

    if (!flaskRes.ok) {
      // Forward backend error cleanly
      return NextResponse.json(
        { message: response?.message },
        { status: flaskRes.status },
      );
    }

    // set cookie
    const cookieStore = await cookies();
    cookieStore.set("request_token", response.data.request_token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    });

    return NextResponse.json(response, { status: flaskRes.status });
  } catch (error) {
    console.error("Unexpected error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
