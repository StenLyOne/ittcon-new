import { SubTitle } from "@/components/ui/SubTitle";
import { About as AboutModel } from "../../lib/models/about";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { Stat } from "@/components/ui/Stat";
import { Cta } from "../../lib/models/ui";

type Prop = { data: AboutModel };

export default function About({ data }: Prop) {
  return (
    <section className="w-full pl-4 pr-4 md:pl-10 md:pr-0 my-25 flex flex-col-reverse md:flex-row justify-between gap-10">
      <div className="w-ful flex flex-col justify-between gap-5 md:w-1/2">
        <SubTitle label={data.subtitle} color="text-green-dark" />
        <div className="space-y-8 md:space-y-10">
          <div className="space-y-5 md:space-y-6">
            <h2 className="text-title">{data.title}</h2>
            <p className="text-body-text">{data.text}</p>
          </div>
          <div className="flex flex-wrap gap-10">
            {data.stats.map((stat, index) => (
              <Stat key={index} label={stat.label} value={stat.value} />
            ))}
          </div>
        </div>
        {data.ctas.length !== 0 &&
          data.ctas.map((cta: Cta, index: number) => (
            <Button
              key={index}
              href={cta.href}
              label={cta.label}
              color={cta.color}
              variant={cta.variant}
            />
          ))}
      </div>
      <Image
        src={data.media.url}
        width={950}
        height={641}
        alt={data.media.alt}
        className=" w-full md:max-w-1/2 object-cover"
      />
    </section>
  );
}
