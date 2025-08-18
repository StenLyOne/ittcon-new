interface Prop {
  label: string;
  color: string;
}

export function SubTitle({ label, color }: Prop) {
  return (
    <h5
      className={`text-[14px] leading-[24] md:text-[18px] md:leading-[30px] uppercase ${color}`}
    >
      {label}
    </h5>
  );
}
