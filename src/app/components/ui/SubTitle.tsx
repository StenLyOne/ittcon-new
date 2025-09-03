interface Prop {
  label: string;
  color: string;
}

export function SubTitle({ label, color }: Prop) {
  return (
    <p
      className={`text-[14px] leading-[24px] md:text-[18px] md:leading-[30px] uppercase ${color}`}
    >
      {label}
    </p>
  );
}
