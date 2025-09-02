// lib/repositories/strapi.mappers.ts
import type { StrapiFormats, StrapiMedia, StrapiCta } from "../models/strapi";
import type { Media } from "../models/ui";
import type { Cta } from "../models/ui";

const BASE = process.env.NEXT_PUBLIC_STRAPI_URL ?? "";

export function mapFormats(f?: StrapiFormats): Media["formats"] {
  if (!f) return {};
  return Object.fromEntries(
    Object.entries(f).map(([k, v]) => [
      k,
      { ...v!, url: `${BASE}${v!.url}` },
    ])
  );
}

export function mapMedia(m: StrapiMedia | undefined | null): Media {
  return {
    url: `${BASE}${m?.url ?? ""}`,
    alt: m?.alt ?? "",
    formats: mapFormats(m?.formats),
  };
}

export function mapCta(c?: StrapiCta): Cta | undefined {
  if (!c) return undefined;
  return {
    label: c.label,
    href: c.href,
    variant: c.variant ?? "default",
    color: c.color ?? "blue",
  };
}
