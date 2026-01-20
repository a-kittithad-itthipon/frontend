import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const flaskRes = await fetch(`${process.env.FLASK_API_URL}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: body.username,
        email: body.email,
        password: body.password,
        create_db: body.database,
      }),
    });

    const data = await flaskRes.json().catch(() => ({
      message: "Invalid response from backend",
    }));

    return NextResponse.json(data, {
      status: flaskRes.status,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
