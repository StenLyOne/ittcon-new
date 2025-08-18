interface Prop {
  media: string;
  title: string;
  description: string;
}

export function CardSimple({ media, title, description }: Prop) {
  return (
    <div className="flex-1 min-w-[400px] max-w-[450px] p-6 space-y-8 rounded-[20px] border border-green-dark">
      <div className="w-15 h-15 flex items-center justify-center bg-green-dark rounded-full p-3">
        <img src={media} alt="" />
      </div>
      <div className="space-y-3">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}
