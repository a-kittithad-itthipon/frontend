import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const flaskRes = await fetch(`${process.env.FLASK_API_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await flaskRes.json();

    // Forward backend error
    if (!flaskRes.ok) {
      return NextResponse.json(
        { error: data.error },
        { status: flaskRes.status },
      );
    }

    const res = NextResponse.json(
      { message: "Login successful" },
      { status: 200 },
    );

    // Token timeout expire
    const expire = 4 * 60 * 60;

    res.cookies.set("token", data.token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: expire,
    });

    res.cookies.set("role", data.role, {
      httpOnly: false,
      sameSite: "lax",
      path: "/",
      maxAge: expire,
    });

    return res;
  } catch (error) {
    return NextResponse.json(error);
  }
}
