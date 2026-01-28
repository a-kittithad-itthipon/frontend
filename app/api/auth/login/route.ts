import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    let flaskRes: Response;

    try {
      flaskRes = await fetch(`${process.env.FLASK_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        // optional but very useful
        signal: AbortSignal.timeout(5000),
      });
    } catch {
      // Flask server is offline / timeout / DNS error
      return NextResponse.json(
        { message: "Service unavailable" },
        { status: 503 },
      );
    }

    let authResponse: any = null;

    try {
      authResponse = await flaskRes.json();
    } catch {
      return NextResponse.json(
        { message: "Invalid response from backend server" },
        { status: 502 },
      );
    }

    if (!flaskRes.ok) {
      // Forward backend error cleanly
      return NextResponse.json(
        { message: authResponse?.message },
        { status: flaskRes.status },
      );
    }

    const cookieStore = await cookies();
    cookieStore.set("access_token", authResponse.data.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    });

    return NextResponse.json(authResponse, { status: 200 });
  } catch (error) {
    console.error("Unexpected error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
