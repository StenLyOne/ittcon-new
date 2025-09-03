// src/app/api/revalidate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { HOME_TAG, PORTFOLIO_LIST_TAG, portfolioItemTag } from '../../../lib/cache-tags';

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const model = body?.model as string | undefined; // напр. 'api::home.home', 'api::portfolio-item.portfolio-item'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const entry = body?.entry as any;

  // Главная
  if (model === 'api::home.home') {
    revalidateTag(HOME_TAG);
  }

  // Портфолио (список + конкретная)
  if (model?.startsWith('api::portfolio-item')) {
    revalidateTag(PORTFOLIO_LIST_TAG);
    if (entry?.slug) revalidateTag(portfolioItemTag(entry.slug));
  }

  return NextResponse.json({ ok: true });
}
