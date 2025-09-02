import { getHomeData } from "./api/getApi";
import { repos } from "../lib/repositories";
import About from "./sections/About";
import { Choose } from "./sections/Choose";
import Cta from "./sections/Cta";
import { Faq } from "./sections/Faq";
import Hero from "./sections/Hero";
import { Service } from "./sections/Service";
import Solutions from "./sections/Solutions";
import { Partners } from "./sections/Partners";

export default async function Home() {
  const hero = await repos.hero;
  const about = await repos.about;
  const service = await repos.service;
  const solutions = await repos.solutions;
  const cta = await repos.cta;
  const choose = await repos.choose;
  const faq = await repos.faq;
  const partners = await repos.partners;
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
