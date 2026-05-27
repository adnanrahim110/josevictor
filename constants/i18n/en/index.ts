import { common } from "./common";
import { header } from "./header";
import { footer } from "./footer";
import { hero } from "./hero";
import { purpose } from "./purpose";
import { book } from "./book";
import { differentiation } from "./differentiation";
import { services } from "./services";
import { impact } from "./impact";
import { about } from "./about";
import { aboutPage } from "./about-page";
import { finalCta } from "./final-cta";
import { contact } from "./contact";

export const en = {
  ...common,
  ...header,
  ...footer,
  ...hero,
  ...purpose,
  ...book,
  ...differentiation,
  ...services,
  ...impact,
  ...about,
  ...aboutPage,
  ...finalCta,
  ...contact,
} as const;

export type TranslationKey = keyof typeof en;
export type Dict = Record<TranslationKey, string>;
