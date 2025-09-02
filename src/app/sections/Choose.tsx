"use client";

import { SubTitle } from "@/components/ui/SubTitle";
import { Choose as ChooseModel } from "../../lib/models/choose";
import { CardHorizontal } from "../components/ui/CardHorizontal";
import { useState } from "react";
import { Card } from "../../lib/models/ui";

type Props = { data: ChooseModel };

export function Choose({ data }: Props) {
  const [active, setActive] = useState(0);
  return (
    <section className="containerSection space-y-15">
      <div className="space-y-2 md:w-1/2">
        <SubTitle color="text-green-dark" label={data.subtitle} />
        <div className="space-y-6">
          <h2 className="text-title">{data.title}</h2>
          <p className="text-body-text">{data.text}</p>
        </div>
      </div>
      <div>
        <div className="group relative flex flex-col md:flex-row gap-4 overflow-hidden">
          {data.cards.length !== 0 &&
            data.cards?.map((card: Card, i: number) => (
              <CardHorizontal
                key={i}
                data={card}
                active={i === active}
                onHover={() => setActive(i)}
              />
            ))}
        </div>
      </div>
    </section>
  );
}
