import { SubTitle } from "@/components/ui/SubTitle";
import { About as AboutModel } from "../../lib/models/about";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { Stat } from "@/components/ui/Stat";

type Prop = { data: AboutModel };

export default function About({ data }: Prop) {

  return (
    <section className="w-full pl-4 pr-4 md:pl-10 md:pr-0 my-25 flex justify-between gap-10">
      <div className="w-1/2">
        <SubTitle label={data.subtitle} color="text-green-dark" />
        <div className="space-y-8 md:space-y-10">
          <div className="space-y-5 md:space-y-6">
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
          <div className="flex gap-10">
            {data.stats.map((stat, index) => (
              <Stat key={index} label={stat.label} value={stat.value} />
            ))}
          </div>
        </div>
        <Button
          href={data.cta.href}
          label={data.cta.label}
          color={data.cta.color}
          variant={data.cta.variant}
        />
      </div>
      <Image
        src={data.media.url}
        width={950}
        height={641}
        alt={data.media.alt}
        className="w-1/2 object-cover translate-y-[40px]"
      />
    </section>
  );
}
