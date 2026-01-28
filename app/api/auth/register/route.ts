import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const flaskRes = await fetch(
      `${process.env.FLASK_API_URL}/api/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: body.username,
          password: body.password,
          email: body.email,
          create_db: body.database,
        }),
      },
    );

    const data = await flaskRes.json();

    return NextResponse.json(data, { status: flaskRes.status });
  } catch (error) {
    console.error("Unexpected error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
