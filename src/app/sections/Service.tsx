import { SubTitle } from "@/components/ui/SubTitle";
import { Service as ServiceModel } from "../../lib/models/services";
import { CardSimple } from "@/components/ui/CardSimple";
import { Card } from "../../lib/models/ui";

type Prop = { data: ServiceModel };

export function Service({ data }: Prop) {
  return (
    <section className="containerSection">
      <div>
        <SubTitle color="text-green-dark" label={data.subtitle} />
        <h2 className="text-title">{data.title}</h2>
        <p className="text-body-text">{data.text}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4 md:gap-5">
        {data.cards.map((card: Card, i: number) => (
          <CardSimple
            key={i}
            description={card.description}
            title={card.title}
            media={card.image.url}
          />
        ))}
      </div>
    </section>
  );
}
