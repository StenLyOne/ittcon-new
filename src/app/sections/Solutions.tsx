import { CardTiles } from "@/components/ui/CardTiles";
import { Solutions as SolutionModel } from "../../lib/models/solutions";
import { CardTile } from "../../lib/models/ui";

type Props = { data: SolutionModel[] };

export default function Solutions({ data }: Props) {
  console.log(data);
  return (
    <section className="containerSection">
      <div className="grid grid-cols-2 gap-5">
        {data.blocks.map((tile: CardTile, i: number) => (
          <CardTiles key={i} {...tile} />
        ))}
      </div>
    </section>
  );
}
