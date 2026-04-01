import { NextResponse } from "next/server";

export async function POST(request) {
  const { password } = await request.json();

  const sitePassword = process.env.SITE_PASSWORD || "desiaddausa2026";
  if (password === sitePassword) {
    const response = NextResponse.json({ ok: true });
    response.cookies.set("adda_access", "granted", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });
    return response;
  }

  return NextResponse.json({ error: "wrong" }, { status: 401 });
}
