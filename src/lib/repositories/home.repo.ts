import { fetchStrapi } from "../strapi-fetch";
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
import { HOME_TAG } from "../cache-tags";

export class StrapiGetHomePage {

  async fetch(): Promise<HomePayload> {
    const q =
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
      `&populate[choose][populate]=cards.image` +
      `&populate[faq][populate]=questions` +
      `&populate[partners][populate]=image`;

    const json: { data: HomePayload } = await (
      await fetchStrapi(`/api/home${q}`, { tag: HOME_TAG, revalidate: 600 })
    ).json();
    return json.data;
  }

  async getHero(): Promise<Hero> {
    const { hero: h } = await this.fetch();
    return {
      title: h.title,
      subtitle: h.subtitle ?? "",
      text: h.text ?? "",
      media: mapMedia(h.media),
      ctas: (h.ctas ?? []).map(mapCta).filter(Boolean) as Cta[],
    };
  }

  async getPartners(): Promise<Partners> {
    const { partners } = await this.fetch();
    return {
      images: partners?.image?.map((p) => mapMedia(p)) ?? [],
    };
  }

  async getAbout(): Promise<About> {
    const { about } = await this.fetch();
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
    const { services: s } = await this.fetch();
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
    const { solutions } = await this.fetch();
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
    const { cta } = await this.fetch();
    return {
      title: cta.title,
      text: cta.text ?? "",
      cta: mapCta(cta.cta)!,
      image: mapMedia(cta.image),
    };
  }

  async getChoose(): Promise<Choose> {
    const { choose } = await this.fetch();
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
    const { faq } = await this.fetch();
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
