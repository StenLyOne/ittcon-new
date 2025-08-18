import { SubTitle } from "@/components/ui/SubTitle";
import { Service as ServiceModel } from "../../lib/models/services";
import { CardSimple } from "@/components/ui/CardSimple";

type Prop = { data: ServiceModel };

export function Service({ data }: Prop) {
  console.log(data);
  return (
    <section className="containerSection">
      <div>
        <SubTitle color="text-green-dark" label={data.subtitle} />
        <h2>{data.title}</h2>
        <p>{data.text}</p>
      </div>
      <div className="flex flex-wrap  gap-4 md:gap-5">
        {data.cards.map((card, index) => (
          <CardSimple
            key={index}
            description={card.description}
            title={card.title}
            media={card.icon.url}
          />
        ))}
      </div>
    </section>
  );
}
