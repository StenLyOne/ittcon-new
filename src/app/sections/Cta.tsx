import { Button } from "@/components/ui/Button";
import { CtaSection as CtaModel } from "../../lib/models/cta";

type Props = { data: CtaModel };

export default function Cta({ data }: Props) {
  return (
    <section className="containerSection ">
      <div className="relative px-4 md:px-10 py-30 md:py-45 rounded-[20px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center "
          style={{
            backgroundImage: `url(${data.image.formats?.large?.url})`,
          }}
        ></div>{" "}
        <div className="absolute inset-0 bg-black/20 " aria-hidden />
        <div className="relative space-y-8 z-[10]">
          <div className="space-y-3 md:w-1/2 ">
            <h2 className="text-white font-semibold">{data.title}</h2>
            <p className="text-white font-semibold">{data.text}</p>
          </div>
          <Button
            href={data.cta.href}
            label={data.cta.label}
            color={data.cta.color}
            variant={data.cta.variant}
          ></Button>
        </div>
      </div>
    </section>
  );
}
