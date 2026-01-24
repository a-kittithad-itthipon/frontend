import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(body);

    // 1. Forward the request to Flask
    const flaskRes = await fetch(
      `${process.env.FLASK_API_URL}/api/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: body.username,
          email: body.email,
          password: body.password,
          create_db: body.database,
        }),
      },
    );

    // 2. Parse the JSON once
    const data = await flaskRes.json();

    // 3. Check if Flask returned an error (4xx or 5xx)
    if (!flaskRes.ok) {
      return NextResponse.json(data, {
        status: flaskRes.status,
      });
    }

    const response = NextResponse.json({ success: true });

    // 4. Success response
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error || "Internal server error" },
      { status: 500 },
    );
  }
}
