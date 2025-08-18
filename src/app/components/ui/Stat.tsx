interface Prop {
  label: string;
  value: string;
}

export function Stat({ label, value }: Prop) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-[40px] leading-[46px] font-semibold text-green-dark">{value}</span>
      <span className="text-[14px] leading-[24px] font-normal text-green-dark">{label}</span>
    </div>
  );
}
