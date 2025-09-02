"use client";

import { SubTitle } from "@/components/ui/SubTitle";
import { Faq as Faqmodel } from "../../lib/models/faq";
import { Question } from "@/components/ui/Question";
import { useState } from "react";

type Props = { data: Faqmodel; allowManyOpen: boolean };

export function Faq({ data, allowManyOpen = false }: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(1);
  const [openMany, setOpenMany] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    if (!allowManyOpen) {
      setOpenIdx((prev) => (prev === i ? null : i));
    } else {
      setOpenMany((prev) => {
        const next = new Set(prev);
        next.has(i) ? next.delete(i) : next.add(i);
        return next;
      });
    }
  };

  return (
    <section className="containerSection flex flex-col md:flex-row gap-10 lg:gap-[200px]">
      <div className="space-y-2 w-full md:w-1/3">
        <SubTitle label={data.subtitle} color="text-green-dark" />
        <div className="space-y-6">
          <h2 className="text-title">{data.title}</h2>
        </div>
      </div>
      <div className="w-full md:w-2/3">
        {data.questions.map((ele, index) => {
          const isOpen = allowManyOpen
            ? openMany.has(index)
            : openIdx === index;
          return (
            <Question
              id={index}
              question={ele.question}
              answer={ele.answer}
              isOpen={isOpen}
              onToggle={() => toggle(index)}
              key={index}
            />
          );
        })}
      </div>
    </section>
  );
}
