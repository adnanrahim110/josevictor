import type { TranslationKey } from "@/constants/i18n/en";

export interface NavLink {
  labelKey: TranslationKey;
  href: string;
  external?: boolean;
}

export const HEADER_NAV: readonly NavLink[] = [
  { labelKey: "header.nav.home", href: "/" },
  { labelKey: "header.nav.services", href: "/#services" },
  { labelKey: "header.nav.about", href: "/about-me" },
  { labelKey: "header.nav.team", href: "/our-team" },
  { labelKey: "header.nav.blog", href: "/blog" },
];

export const FOOTER_EXPLORE: readonly NavLink[] = [
  { labelKey: "header.nav.home", href: "/" },
  { labelKey: "header.nav.services", href: "/#services" },
  { labelKey: "header.nav.about", href: "/about-me" },
  { labelKey: "header.nav.team", href: "/our-team" },
  { labelKey: "header.nav.blog", href: "/blog" },
  { labelKey: "header.nav.contact", href: "/contact" },
];

export const FOOTER_LEGAL: readonly NavLink[] = [
  { labelKey: "footer.legal.privacy", href: "/privacy-policy" },
  {
    labelKey: "footer.legal.payment",
    href: "https://www.paypal.com/ncp/payment/A8K393DV97PUU",
    external: true,
  },
];
