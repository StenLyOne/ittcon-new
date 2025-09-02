import { motion } from "framer-motion";
import Image from "next/image";
import { Card } from "../../../lib/models/ui";

interface Props {
  data: Card;
  active: boolean;
  onHover: () => void;
  key: number;
}

export function CardHorizontal({ data, active, onHover, key }: Props) {
  return (
    <motion.div
      layout
      key={key}
      onMouseEnter={onHover}
      onFocus={onHover}
      className="relative h-[520px] overflow-hidden rounded-2xl"
      animate={{
        flexGrow: active ? 4 : 1,
        filter: active ? "grayscale(0%)" : "grayscale(10%)",
      }}
      transition={{ type: "spring", stiffness: 220, damping: 28 }}
    >
      {/* фон */}
      <Image
        src={data.image.url}
        alt={data.image.alt}
        fill
        className="object-cover"
        priority
      />

      {/* затемнение для читаемости текста */}
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundColor: active ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0.15)",
        }}
        transition={{ duration: 0.2 }}
      />

      {/* вертикальный тайтл (виден только когда НЕ активно) */}
      <motion.h3
        className="absolute left-10 bottom-10 font-semibold text-white"
        style={{ writingMode: "vertical-rl" }}
        animate={{
          opacity: active ? 0 : 1,
          left: active ? 20 : 40,
        }}
        transition={{ duration: 0.25 }}
      >
        {data.title}
      </motion.h3>

      {/* горизонтальный контент (виден только когда активно) */}
      <motion.div
        className="absolute inset-0 p-10 flex flex-col justify-end text-white"
        initial={false}
        animate={{
          opacity: active ? 1 : 0,
          y: active ? 0 : -40,
        }}
        transition={{ duration: 0.25 }}
      >
        <h3 className="text-2xl font-semibold">{data.title}</h3>
        <p className="mt-2 text-sm/6 line-clamp-3">{data.description}</p>
      </motion.div>
    </motion.div>
  );
}
