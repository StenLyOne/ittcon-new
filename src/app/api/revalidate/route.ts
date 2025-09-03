// src/app/api/revalidate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import {
  HOME_TAG,
  PORTFOLIO_LIST_TAG,
  portfolioItemTag,
} from "../../../lib/cache-tags";

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const model = body?.model as string | undefined; // напр. 'api::home.home', 'api::portfolio-item.portfolio-item'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const entry = body?.entry as any;

  const event = body?.event;
  const id = body?.entry?.id;

  console.log("[Revalidate] Incoming webhook", {
    model,
    event,
    id,
  });

  let tag: string | null = null;
  if (model === HOME_TAG) {
    tag = HOME_TAG;
  }

  if (model === "api::portfolio.portfolio") {
    tag = id ? `page:portfolio:${id}` : "page:portfolio";
  }

  if (!tag) {
    console.warn("[Revalidate] ❌ Unknown model, skipping", { model });
    return Response.json({ ok: false, reason: "unknown model" });
  }

  try {
    revalidateTag(tag);
    console.log("[Revalidate] ✅ Tag invalidated", { tag });
  } catch (err) {
    console.error("[Revalidate] ❌ Failed to invalidate", { tag, error: err });
    return Response.json({ ok: false, error: String(err) }, { status: 500 });
  }

  return Response.json({
    ok: true,
    model,
    event,
    id,
    tag,
  });
}
