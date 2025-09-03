import { StrapiGetHomePage } from "./home.repo";

const homeRepo = new StrapiGetHomePage();

export const repos = {
  hero: homeRepo.getHero(),
  about: homeRepo.getAbout(),
  service: homeRepo.getService(),
  solutions: homeRepo.getSolutions(),
  cta: homeRepo.getCTA(),
  choose: homeRepo.getChoose(),
  faq: homeRepo.getFaq(),
  partners: homeRepo.getPartners(),
};
