const BASE = (process.env.NEXT_PUBLIC_STRAPI_URL || "").replace(/\/$/, "");
const TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN!; // Read-only токен

type FetchOpts = {
  tag?: string;
  //   revalidate?: number; // сек; по умолчанию 60
};

export async function fetchStrapi(path: string, opts: FetchOpts = {}) {
  const url = `${BASE}${path}`;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  const next: Record<string, unknown> = {};
  if (opts.tag) next.tags = [opts.tag];

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    next,
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Strapi ${res.status} ${res.statusText}\n${url}\n${body}`);
  }
  return res;
}
