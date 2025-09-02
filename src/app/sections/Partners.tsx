"use client";

import { Partners as PartnersModel } from "../../lib/models/partners";
import { motion } from "framer-motion";

type Prop = { data: PartnersModel };

export function Partners({ data }: Prop) {
  const logos = [...data.images, ...data.images];

  return (
    <section className="overflow-hidden py-20">
      <motion.div
        className="flex gap-32" // лучше взять стандартный шаг
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
      >
        {logos.map((ele, index) => (
          <img
            key={index}
            src={ele.url}
            alt={ele.alt}
            className="h-20 object-contain"
          />
        ))}
      </motion.div>
    </section>
  );
}
