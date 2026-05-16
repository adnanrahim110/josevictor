import { Compass, Lightbulb, Rocket, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type TilePalette = "sage" | "warm";

export interface OutcomeTile {
  id: string;
  titleKey:
    | "differentiation.outcomes.clarify.title"
    | "differentiation.outcomes.decide.title"
    | "differentiation.outcomes.align.title"
    | "differentiation.outcomes.action.title";
  Icon: LucideIcon;
  palette: TilePalette;
  tilt: -1 | 1;
}

export const OUTCOMES: readonly OutcomeTile[] = [
  {
    id: "clarify",
    titleKey: "differentiation.outcomes.clarify.title",
    Icon: Compass,
    palette: "sage",
    tilt: -1,
  },
  {
    id: "decide",
    titleKey: "differentiation.outcomes.decide.title",
    Icon: Lightbulb,
    palette: "warm",
    tilt: 1,
  },
  {
    id: "align",
    titleKey: "differentiation.outcomes.align.title",
    Icon: Users,
    palette: "warm",
    tilt: 1,
  },
  {
    id: "action",
    titleKey: "differentiation.outcomes.action.title",
    Icon: Rocket,
    palette: "sage",
    tilt: -1,
  },
] as const;
