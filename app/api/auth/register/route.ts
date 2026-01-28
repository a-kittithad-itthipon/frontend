import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    let response: Response;

    try {
      response = await fetch(`${process.env.FLASK_API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: body.username,
          password: body.password,
          email: body.email,
          create_db: body.database,
        }),
      });
    } catch (e) {
      console.error(e);

      return NextResponse.json(
        { message: "Service unavailable" },
        { status: 503 },
      );
    }

    const result = await response.json();

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
