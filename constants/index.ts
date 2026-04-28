// ─── Navigation Links ────────────────────────────────────────────────────────
export interface NavLink {
  name: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { name: "About Me", href: "/about-me" },
  { name: "Our Team", href: "/our-team" },
  { name: "Our Services", href: "/our-services" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export const SERVICE_LINKS: NavLink[] = [
  { name: "Workshops with LEGO® SERIOUS PLAY®", href: "/lego-serious-play" },
  { name: "Business Strategy & Admin Support", href: "/business-services" },
  { name: "Virtual Social & Mental Health", href: "/social-services" },
];

export const LEGAL_LINKS: NavLink[] = [
  { name: "Payment", href: "https://www.paypal.com/ncp/payment/A8K393DV97PUU" },
  { name: "Privacy Policy", href: "/privacy-policy" },
];

// ─── Contact Details ─────────────────────────────────────────────────────────
export const CONTACT = {
  companyName: "JVJ Consulting, LLC",
  entityId: "VX64CYX89JG5",
  registrationId: "PR OGPE 2024-607685-PU-374659",
  phone: "787-470-9054",
  phoneRaw: "7874709054",
  email: "jvj@adminservicespr.com",
  website: "https://adminservicespr.com",
} as const;

// ─── Social Links ────────────────────────────────────────────────────────────
export interface SocialLink {
  name: string;
  href: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { name: "Facebook", href: "https://www.facebook.com/356361780902209" },
  { name: "Instagram", href: "https://www.instagram.com/jimenezjove" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/jose-victor-jimenez-msw-98505483/" },
  { name: "X", href: "https://www.x.com/jimenezjove" },
  { name: "YouTube", href: "https://www.youtube.com/@jimenezjove" },
];
