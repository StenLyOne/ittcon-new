import { Button } from "@/components/ui/Button";
import { Hero as HeroModel } from "../../lib/models/hero";

type Props = { data: HeroModel };

export default function Hero({ data }: Props) {
  return (
    <section className="relative h-[100vh] w-full overflow-hidden">
      {/* background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${data.media.formats.large?.url})` }}
        aria-hidden
      />
      {/* overlay */}
      <div className="absolute inset-0 bg-black/35" aria-hidden />
      {/* content */}
      <div className="relative z-10 h-full  mx-auto px-4 md:px-12 flex flex-col gap-8 items-center justify-center text-center text-white">
        <div className="space-y-5 w-full md:w-max">
          <h1>{data.title}</h1>
          {data.subtitle && (
            <p className="md:w-[60%] text-center mx-auto">{data.text}</p>
          )}
        </div>
        <div className="flex gap-5">
          {data.ctas?.length
            ? data.ctas.map((cta, index) => (
                <Button
                  key={index}
                  label={cta.label}
                  href={cta.href}
                  variant={
                    cta.variant === "arrow"
                      ? "arrow"
                      : cta.variant === "default"
                      ? "default"
                      : "border"
                  }
                  color={cta.color === "blue" ? "blue" : "white"}
                />
              ))
            : null}
        </div>
      </div>
    </section>
  );
}
