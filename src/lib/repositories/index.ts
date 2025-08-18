import { StrapiGetHomePage } from "./home.repo";

const homeRepo = new StrapiGetHomePage(
  process.env.NEXT_PUBLIC_STRAPI_URL!,
  process.env.NEXT_PUBLIC_STRAPI_TOKEN
);

export const repos = {
  hero: homeRepo.getHero(),
  about: homeRepo.getAbout(),
  service: homeRepo.getService(),
  solutions: homeRepo.getSolutions(),
  cta: homeRepo.getCTA(),
};
