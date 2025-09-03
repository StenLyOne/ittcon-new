import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  // можно добавить валидацию Zod тут

  const r = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/contact-messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
    },
    body: JSON.stringify({ data: body }),
    cache: "no-store",
  });

  if (!r.ok) {
    const err = await r.text();
    return NextResponse.json({ ok: false, error: err }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
