import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    let flaskRes: Response;

    try {
      // This fails if Flask is down
      flaskRes = await fetch(`${process.env.FLASK_API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: body.username,
          password: body.password,
        }),
      });
    } catch (err) {
      // Flask server unreachable
      return NextResponse.json(
        { message: "Authentication service is currently unavailable." },
        { status: 503 },
      );
    }

    let data: any;
    try {
      data = await flaskRes.json();
    } catch {
      data = null;
    }

    // Forward backend error (401, 403, etc.)
    if (!flaskRes.ok) {
      return NextResponse.json(
        { message: data?.error || "Login failed." },
        { status: flaskRes.status },
      );
    }

    // Success
    const res = NextResponse.json(
      { message: "Login successful" },
      { status: 200 },
    );

    const expire = 4 * 60 * 60; // 4 hours

    res.cookies.set("token", data.token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: expire,
    });

    // Debug only
    console.log(data.token);

    return res;
  } catch (error) {
    // Invalid JSON / unexpected server error
    return NextResponse.json(
      { message: "Invalid request or server error." },
      { status: 500 },
    );
  }
}
