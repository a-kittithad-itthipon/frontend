import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.delete("access_token");
  cookieStore.delete("sidebar_state");

  return NextResponse.json({ message: "Logout successful" }, { status: 200 });
}
