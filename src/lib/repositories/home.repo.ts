import { title } from "process";
import { About } from "../models/about";
import { CtaSection } from "../models/cta";
import { Hero } from "../models/hero";
import { Service } from "../models/services";
import { Solutions } from "../models/solutions";
import { Cta } from "../models/ui";
import { Choose } from "../models/choose";

// ==== Заготовка под Strapi (включим позже) ====
export class StrapiGetHomePage {
  constructor(private baseUrl: string, private token?: string) {}

  private cached: any | null = null;

  private async fetchHome() {
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
      `&populate[choose][populate][cards][populate]=image`;

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

    const json = await res.json();

    this.cached = json?.data ?? {};

    return this.cached; // 👈 обязательно возвращаем
  }

  async getHero(): Promise<Hero> {
    const data = await this.fetchHome();

    const h = data.hero ?? {};

    return {
      title: h.title,
      subtitle: h.subtitle,
      text: h.text,
      media: {
        url: `${process.env.NEXT_PUBLIC_STRAPI_URL}${h.media.url ?? ""}`,
        alt: h.media.alt ?? "",
        formats: Object.fromEntries(
          Object.entries(h.media.formats ?? {}).map(
            ([key, value]: [string, any]) => [
              key,
              {
                ...value,
                url: `${process.env.NEXT_PUBLIC_STRAPI_URL}${value.url}`,
              },
            ]
          )
        ),
      },
      ctas:
        h.ctas?.map((cta: Cta) => ({
          label: cta.label,
          href: cta.href,
          variant: cta.variant as "default" | "arrow" | "border",
          color: cta.color as "white" | "blue",
        })) ?? [],
    };
  }

  async getAbout(): Promise<About> {
    const data = await this.fetchHome();
    const about = data.about;

    return {
      title: about.title,
      subtitle: about.subtitle,
      text: about.text,
      media: {
        url: `${process.env.NEXT_PUBLIC_STRAPI_URL}${about.media.url ?? ""}`,
        alt: about.media.alt ?? "",
        formats: Object.fromEntries(
          Object.entries(about.media.formats ?? {}).map(
            ([key, value]: [string, any]) => [
              key,
              {
                ...value,
                url: `${process.env.NEXT_PUBLIC_STRAPI_URL}${value.url}`,
              },
            ]
          )
        ),
      },
      stats: about.stats?.map((stat: any) => ({
        value: stat.value,
        label: stat.label,
      })),
      cta: about.ctas,
    };
  }

  async getService(): Promise<Service> {
    const data = await this.fetchHome();
    const service = data.services;

    return {
      title: service.title,
      subtitle: service.subtitle,
      text: service.text,
      cards: service.cards?.map((card: any) => ({
        icon: {
          url: `${process.env.NEXT_PUBLIC_STRAPI_URL}${card.image.url ?? ""}`,
          alt: card.image.alt ?? "",
          formats: Object.fromEntries(
            Object.entries(card.image.formats ?? {}).map(
              ([key, value]: [string, any]) => [
                key,
                {
                  ...value,
                  url: `${process.env.NEXT_PUBLIC_STRAPI_URL}${value.url}`,
                },
              ]
            )
          ),
        },
        title: card.title,
        description: card.description,
      })),
    };
  }

  async getSolutions(): Promise<Solutions> {
    const data = await this.fetchHome();
    const solutions = data.solutions;

    return {
      blocks: solutions.map((solution: any) => {
        const isImg = solution.is_image ?? false;
        const image = isImg
          ? {
              url: `${process.env.NEXT_PUBLIC_STRAPI_URL}${
                solution.image.url ?? ""
              }`,
              alt: solution.image.alt ?? "",
              formats: Object.fromEntries(
                Object.entries(solution.image.formats ?? {}).map(
                  ([key, value]: [string, any]) => [
                    key,
                    {
                      ...value,
                      url: `${process.env.NEXT_PUBLIC_STRAPI_URL}${value.url}`,
                    },
                  ]
                )
              ),
            }
          : null;
        return {
          title: solution.title,
          description: solution.description,
          cta: solution.cta,
          isImage: solution.is_image,
          isFullWidth: solution.is_full_width,
          image,
        };
      }),
    };
  }

  async getCTA(): Promise<CtaSection> {
    const data = await this.fetchHome();
    const cta = data.cta;

    return {
      title: cta.title,
      text: cta.text,
      cta: cta.cta,
      image: {
        url: `${process.env.NEXT_PUBLIC_STRAPI_URL}${cta.image.url}`,
        alt: cta.image.alt ?? "",
        formats: Object.fromEntries(
          Object.entries(cta.image.formats ?? {}).map(
            ([key, value]: [string, any]) => [
              key,
              {
                ...value,
                url: `${process.env.NEXT_PUBLIC_STRAPI_URL}${value.url}`,
              },
            ]
          )
        ),
      },
    };
  }

  async getChoose(): Promise<Choose> {
    const data = await this.fetchHome();
    const choose = data.choose;

    return {
      title: choose.title,
      subtitle: choose.subtitle,
      text: choose.text,
      cards: choose.cards?.map((card: any) => ({
        title: card.title,
        description: card.description,
        image: {
          url: `${process.env.NEXT_PUBLIC_STRAPI_URL}${card.media.url ?? ""}`,
          alt: card.media.alt ?? "",
          formats: Object.fromEntries(
            Object.entries(card.media.formats ?? {}).map(
              ([key, value]: [string, any]) => [
                key,
                {
                  ...value,
                  url: `${process.env.NEXT_PUBLIC_STRAPI_URL}${value.url}`,
                },
              ]
            )
          ),
        },
      })),
    };
  }
}
