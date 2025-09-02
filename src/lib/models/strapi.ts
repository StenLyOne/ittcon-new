// lib/repositories/strapi.types.ts

export type StrapiFormat = {
  url: string;
  width: number;
  height: number;
};

export type StrapiFormats = Partial<{
  large: StrapiFormat;
  medium: StrapiFormat;
  small: StrapiFormat;
  thumbnail: StrapiFormat;
}>;

export type StrapiMedia = {
  url: string;
  alt?: string;
  formats?: StrapiFormats;
};

export type StrapiCta = {
  label: string;
  href: string;
  variant?: "default" | "arrow" | "border";
  color?: "white" | "blue";
};

// ---- секции home
export type StrapiHero = {
  title: string;
  subtitle?: string;
  text?: string;
  media: StrapiMedia;
  ctas?: StrapiCta[];
};

export type StrapiAbout = {
  title: string;
  subtitle?: string;
  text?: string;
  media: StrapiMedia;
  stats?: { value: string; label: string }[];
  ctas?: StrapiCta[];
};

export type StrapiService = {
  title: string;
  subtitle?: string;
  text?: string;
  cards?: {
    title: string;
    description: string;
    image: StrapiMedia;
  }[];
};

export type StrapiSolutionBlock = {
  title: string;
  description: string;
  is_image?: boolean;
  is_full_width?: boolean;
  image?: StrapiMedia | null;
  cta?: StrapiCta;
};

export type StrapiCTASection = {
  title: string;
  text?: string;
  image: StrapiMedia;
  cta?: StrapiCta;
};

export type StrapiChoose = {
  title: string;
  subtitle?: string;
  text?: string;
  cards?: { title: string; description: string; image: StrapiMedia }[];
};

export type StrapiFaq = {
  title: string;
  subtitle?: string;
  text?: string;
  questions: { question: string; answer: string }[];
};

export type StrapiPartnerItem = {
  image: StrapiMedia[];
};

// то, что лежит в data у /api/home (attributes уже «расплющены» populate'ом)
export type HomePayload = {
  hero: StrapiHero;
  about: StrapiAbout;
  services: StrapiService;
  solutions: StrapiSolutionBlock[];
  cta: StrapiCTASection;
  choose: StrapiChoose;
  faq: StrapiFaq;
  partners?: StrapiPartnerItem;
};
