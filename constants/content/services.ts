import { Blocks, Sprout, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ServicePalette = "sage" | "warm";

export interface Service {
  id: string;
  titleKey:
    | "services.consulting.title"
    | "services.workshops.title"
    | "services.development.title";
  subtitleKey?: "services.workshops.subtitle";
  descKey:
    | "services.consulting.desc"
    | "services.workshops.desc"
    | "services.development.desc";
  Icon: LucideIcon;
  palette: ServicePalette;
}

export const SERVICES: readonly Service[] = [
  {
    id: "strategic-clarity",
    titleKey: "services.consulting.title",
    descKey: "services.consulting.desc",
    Icon: Target,
    palette: "sage",
  },
  {
    id: "immersive-workshops",
    titleKey: "services.workshops.title",
    subtitleKey: "services.workshops.subtitle",
    descKey: "services.workshops.desc",
    Icon: Blocks,
    palette: "warm",
  },
  {
    id: "whole-system-development",
    titleKey: "services.development.title",
    descKey: "services.development.desc",
    Icon: Sprout,
    palette: "sage",
  },
];
