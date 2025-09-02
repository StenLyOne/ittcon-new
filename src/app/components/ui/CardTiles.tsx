import Image from "next/image";
import { CardTile } from "../../../lib/models/ui";
import { Button } from "./Button";

type Props = CardTile;

export function CardTiles({
  title,
  description,
  isImage,
  image,
  isFullWidth,
  cta,
}: Props) {
  return (
    <div
      className={`flex w-full max-h-[600px] rounded-[20px] overflow-hidden  ${
        image && isFullWidth ? "" : "border border-green-black"
      } ${
        isFullWidth
          ? " bg-white-second flex-col-reverse md:flex-row col-span-2"
          : "h-[440px] col-span-2 md:col-span-1"
      }`}
      style={{
        backgroundImage: `url(${image && !isFullWidth ? image.url : ""})`,
      }}
    >
      <div
        className={`flex flex-col space-y-8 ${
          !isFullWidth ? "justify-between xl:w-2/3 " : "md:w-1/3 my-auto"
        } p-4 md:p-10`}
      >
        <div
          className={`space-y-3 ${image && !isFullWidth ? "text-white" : ""}`}
        >
          <h3 className={`${image ? "" : "text-title"}`}>{title}</h3>
          <p className={`${image ? "" : "text-body-text"}`}>{description}</p>
        </div>
        {cta && (
          <Button
            href={cta?.href}
            label={cta?.label}
            color={cta?.color}
            variant={cta?.variant}
          />
        )}
      </div>
      {isFullWidth && isImage && image && (
        <Image
          className="md:w-2/3 h-full max-h-[600px] object-cover relative rounded-[20px]"
          src={image?.url}
          alt={image.alt}
          width={1212}
          height={600}
        />
      )}
    </div>
  );
}
