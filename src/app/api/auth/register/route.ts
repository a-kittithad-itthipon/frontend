import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, email, password, createDb } = await req.json();

    const flaskRes = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        email,
        password,
        create_db: createDb,
      }),
    });

    const flaskData = await flaskRes.json();

    return NextResponse.json(flaskData, {
      status: flaskRes.status,
    });
  } catch (error) {
    return NextResponse.json(error);
  }
}
