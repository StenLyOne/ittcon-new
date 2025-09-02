import { Cta, Media, Stat } from "./ui";

export type About = {
  title: string;
  subtitle: string;
  text: string;
  media: Media;
  stats: Stat[];
  ctas: Cta[];
};
