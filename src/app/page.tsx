import { getHomeData } from "../api/getApi";
import { repos } from "../lib/repositories";
import About from "./sections/About";
import Cta from "./sections/Cta";
import Hero from "./sections/Hero";
import { Service } from "./sections/Service";
import Solutions from "./sections/Solutions";

export default async function Home() {
  const hero = await repos.hero;
  const about = await repos.about;
  const service = await repos.service;
  const solutions = await repos.solutions;
  const cta = await repos.cta;
  getHomeData();
  return (
    <>
      <Hero data={hero} />
      <About data={about} />
      <Service data={service} />
      <Solutions data={solutions} />
      <Cta data={cta} />
    </>
  );
}
