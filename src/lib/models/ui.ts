export type Cta = {
  label: string;
  href: string;
  variant?: "border" | "default" | "arrow";
  color?: "white" | "blue";
};

export type Stat = {
  value: string;
  label: string;
};

export type Card = {
  id?: number;
  title: string;
  description: string;
  image: Media;
};

export type MediaFormat = {
  url: string;
  width: number;
  height: number;
};

export type Media = {
  url: string;
  alt: string;
  formats?: {
    large?: MediaFormat;
    medium?: MediaFormat;
    small?: MediaFormat;
    thumbnail?: MediaFormat;
  };
};

export type CardTile = {
  isFullWidth: boolean;
  isImage: boolean;
  title: string;
  description: string;
  cta?: Cta;
  image?: Media;
};
