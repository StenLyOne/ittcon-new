interface Prop {
  media: string;
  title: string;
  description: string;
}

export function CardSimple({ media, title, description }: Prop) {
  return (
    <div className="flex-1 w-full p-6 space-y-8 rounded-[20px] border border-green-dark">
      <div className="w-15 h-15 flex items-center justify-center bg-green-dark rounded-full p-3">
        <img src={media} alt="" />
      </div>
      <div className="space-y-3">
        <h3 className="text-title">{title}</h3>
        <p className="text-body-text">{description}</p>
      </div>
    </div>
  );
}
