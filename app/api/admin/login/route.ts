export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json(
      { error: "Missing credentials" },
      { status: 400 }
    );
  }

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }

  return NextResponse.json({ success: true });
}
