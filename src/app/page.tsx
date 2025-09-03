import { getHomeData } from "./api/getApi";
import { StrapiGetHomePage } from "../lib/repositories/home.repo";
import About from "./sections/About";
import { Choose } from "./sections/Choose";
import Cta from "./sections/Cta";
import { Faq } from "./sections/Faq";
import Hero from "./sections/Hero";
import { Service } from "./sections/Service";
import Solutions from "./sections/Solutions";
import { Partners } from "./sections/Partners";

export const revalidate = false; 

export default async function Home() {
  const homeRepo = new StrapiGetHomePage();
  const hero = await homeRepo.getHero();
  const about = await homeRepo.getAbout();
  const service = await homeRepo.getService();
  const solutions = await homeRepo.getSolutions();
  const cta = await homeRepo.getCTA();
  const choose = await homeRepo.getChoose();
  const faq = await homeRepo.getFaq();
  const partners = await homeRepo.getPartners();
  getHomeData();
  return (
    <>
      <Hero data={hero} />
      <About data={about} />
      <Partners data={partners} />
      <Service data={service} />
      <Solutions data={solutions} />
      <Cta data={cta} />
      <Choose data={choose} />
      <Faq data={faq} allowManyOpen={false} />
    </>
  );
}
