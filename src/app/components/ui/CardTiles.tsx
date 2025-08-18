import Image from "next/image";
import { Cta, Media } from "../../../lib/models/ui";
import { Button } from "./Button";

interface Props {
  title: string;
  description: string;
  image?: Media;
  isFullWidth: boolean;
  cta: Cta;
}

export function CardTiles({
  title,
  description,
  image,
  isFullWidth,
  cta,
}: Props) {
  return (
    <div
      className={`flex w-full max-h-[600px] rounded-[20px] overflow-hidden  ${
        image && isFullWidth ? "" : "border border-green-black"
      } ${isFullWidth ? " bg-white-second col-span-2" : "h-[440px] col-span-1"}`}
      style={{
        backgroundImage: `url(${image && !isFullWidth ? image.url : ""})`,
      }}
    >
      <div
        className={`flex flex-col space-y-8 ${
          !isFullWidth ? "justify-between w-2/3 " : "w-1/3 my-auto"
        } p-10`}
      >
        <div
          className={`space-y-3 ${image && !isFullWidth ? "text-white" : ""}`}
        >
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <Button
          href={cta.href}
          label={cta.label}
          color={cta.color}
          variant={cta.variant}
        />
      </div>

      {/* {isFullWidth && (
        <div className="w-2/3 relative h-full">
          <Image
            className="absolte shrink-1"
            src={image?.url}
            alt={cta.label}
            fill
          />
        </div>
      )} */}
      {isFullWidth && (
        <Image
          className="w-2/3 h-full max-h-[600px] object-cover relative rounded-[20px]"
          src={image?.url}
          alt={cta.label}
          width={1212}
          height={600}
        />
      )}
    </div>
  );
}
