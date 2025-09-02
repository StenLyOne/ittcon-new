// lib/repositories/home.repo.ts
import { About } from "../models/about";
import { CtaSection } from "../models/cta";
import { Hero } from "../models/hero";
import { Service } from "../models/services";
import { Solutions } from "../models/solutions";
import { Cta } from "../models/ui";
import { Choose } from "../models/choose";
import { Faq } from "../models/faq";
import { Partners } from "../models/partners";

import type { HomePayload } from "../models/strapi";
import { mapCta, mapMedia } from "../mappers/strapi";

export class StrapiGetHomePage {
  constructor(private baseUrl: string, private token?: string) {}

  private cached: HomePayload | null = null;

  private async fetchHome(): Promise<HomePayload> {
    if (this.cached) return this.cached;

    const url =
      `${this.baseUrl}/api/home` +
      `?populate[hero][populate]=ctas` +
      `&populate[hero][populate]=media` +
      `&populate[about][populate]=stats` +
      `&populate[about][populate]=ctas` +
      `&populate[about][populate]=media` +
      `&populate[services][populate][cards][populate]=image` +
      `&populate[solutions][populate]=image` +
      `&populate[solutions][populate]=cta` +
      `&populate[cta][populate]=image` +
      `&populate[cta][populate]=cta` +
      `&populate[choose][populate][cards][populate]=image` +
      `&populate[faq][populate]=questions` +
      `&populate[partners][populate]=image`;

    const res = await fetch(url, {
      headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(
        `Strapi ${res.status} ${res.statusText}\nURL: ${res.url}\nBody: ${body}`
      );
    }

    // типизируем ответ
    const json: { data: HomePayload } = await res.json();
    this.cached = json.data;
    return this.cached;
  }

  async getHero(): Promise<Hero> {
    const { hero: h } = await this.fetchHome();
    return {
      title: h.title,
      subtitle: h.subtitle ?? "",
      text: h.text ?? "",
      media: mapMedia(h.media),
      ctas: (h.ctas ?? []).map(mapCta).filter(Boolean) as Cta[],
    };
  }

  async getPartners(): Promise<Partners> {
    const { partners } = await this.fetchHome();
    return {
      images: partners?.image?.map((p) => mapMedia(p)) ?? [],
    };
  }

  async getAbout(): Promise<About> {
    const { about } = await this.fetchHome();
    return {
      title: about.title,
      subtitle: about.subtitle ?? "",
      text: about.text ?? "",
      media: mapMedia(about.media),
      stats: (about.stats ?? []).map((s) => ({
        value: s.value,
        label: s.label,
      })),
      ctas: (about.ctas ?? []).map(mapCta).filter(Boolean) as Cta[],
    };
  }

  async getService(): Promise<Service> {
    const { services: s } = await this.fetchHome();
    return {
      title: s.title,
      subtitle: s.subtitle ?? "",
      text: s.text ?? "",
      cards:
        s.cards?.map((c) => ({
          title: c.title,
          description: c.description,
          image: mapMedia(c.image),
        })) ?? [],
    };
  }

  async getSolutions(): Promise<Solutions> {
    const { solutions } = await this.fetchHome();
    return {
      blocks: solutions.map((s) => ({
        title: s.title,
        description: s.description,
        cta: mapCta(s.cta),
        isImage: !!s.is_image,
        isFullWidth: !!s.is_full_width,
        image: s.is_image ? mapMedia(s.image ?? null) : undefined,
      })),
    };
  }

  async getCTA(): Promise<CtaSection> {
    const { cta } = await this.fetchHome();
    return {
      title: cta.title,
      text: cta.text ?? "",
      cta: mapCta(cta.cta)!,
      image: mapMedia(cta.image),
    };
  }

  async getChoose(): Promise<Choose> {
    const { choose } = await this.fetchHome();
    return {
      title: choose.title,
      subtitle: choose.subtitle ?? "",
      text: choose.text ?? "",
      cards:
        choose.cards?.map((c) => ({
          title: c.title,
          description: c.description,
          image: mapMedia(c.image),
        })) ?? [],
    };
  }

  async getFaq(): Promise<Faq> {
    const { faq } = await this.fetchHome();
    return {
      title: faq.title,
      subtitle: faq.subtitle ?? "",
      text: faq.text ?? "",
      questions: faq.questions.map((q) => ({
        question: q.question,
        answer: q.answer,
      })),
    };
  }
}
