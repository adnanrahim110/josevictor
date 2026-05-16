"use client";

import { Container } from "@/components/ui/container";
import { CONTACT, SOCIAL_LINKS } from "@/constants";
import { LINKS } from "@/constants/content/links";
import { FOOTER_EXPLORE, FOOTER_LEGAL } from "@/constants/content/nav";
import { useLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useLenis } from "lenis/react";
import { ArrowUp, ArrowUpRight, Calendar, Mail, Phone } from "lucide-react";
import Link from "next/link";

const socialIcons: Record<string, React.ReactNode> = {
  Facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 1.09.044 1.613.115v3.252c-.514-.053-.87-.074-1.297-.074-1.327 0-1.84.503-1.84 1.81v2.455h3.072l-.477 3.667h-2.595v8.196A12.003 12.003 0 0 0 12 24a12.01 12.01 0 0 0-2.899-.309z" />
    </svg>
  ),
  Instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  X: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  YouTube: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
};

const socialBrandColors: Record<string, string> = {
  Facebook:
    "hover:border-[#1877F2]/60 hover:shadow-[0_0_20px_rgba(24,119,242,0.25)]",
  Instagram:
    "hover:border-[#E4405F]/60 hover:shadow-[0_0_20px_rgba(228,64,95,0.25)]",
  LinkedIn:
    "hover:border-[#0A66C2]/60 hover:shadow-[0_0_20px_rgba(10,102,194,0.25)]",
  X: "hover:border-white/40 hover:shadow-[0_0_20px_rgba(255,255,255,0.12)]",
  YouTube:
    "hover:border-[#FF0000]/60 hover:shadow-[0_0_20px_rgba(255,0,0,0.25)]",
};

function FooterNavLink({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  const props = external
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};
  return (
    <li>
      <Link
        href={href}
        {...props}
        className="group inline-flex items-center gap-1 text-primary-300 transition-colors duration-300 hover:text-white"
      >
        <span className="relative overflow-hidden">
          <span className="block">{children}</span>
          <span className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-0 bg-white transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:origin-left group-hover:scale-x-100" />
        </span>
        {external && (
          <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 -translate-x-0.5 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" />
        )}
      </Link>
    </li>
  );
}

export function Footer() {
  const { t } = useLocale();
  const lenis = useLenis();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0);
    } else if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative overflow-hidden bg-primary-950 text-primary-50">
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-linear-to-r from-transparent via-secondary-500/40 to-transparent"
      />

      <Container className="pt-20 pb-12 lg:pt-24 lg:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-10">
          <div className="md:col-span-5 lg:col-span-5 space-y-6">
            <Link href="/" className="inline-block group">
              <span className="font-heading italic text-5xl sm:text-6xl text-secondary-200 tracking-tight leading-none">
                {t("header.brand")}
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-primary-300 font-sans">
              {t("footer.tagline")}
            </p>
          </div>

          <nav
            aria-label={t("footer.section.explore")}
            className="md:col-span-3 lg:col-span-3"
          >
            <h4 className="mb-5 text-[10px] font-semibold tracking-[0.3em] text-secondary-200 uppercase font-sans">
              {t("footer.section.explore")}
            </h4>
            <ul className="space-y-3 text-sm">
              {FOOTER_EXPLORE.map((link) => (
                <FooterNavLink key={link.labelKey} href={link.href}>
                  {t(link.labelKey)}
                </FooterNavLink>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4 lg:col-span-4">
            <h4 className="mb-5 text-[10px] font-semibold tracking-[0.3em] text-secondary-200 uppercase font-sans">
              {t("footer.section.connect")}
            </h4>

            <div className="space-y-3 mb-6">
              <a
                href={`tel:${CONTACT.phoneRaw}`}
                aria-label={t("footer.aria.phone")}
                className="group flex items-center gap-3 text-sm text-primary-300 transition-colors duration-300 hover:text-white"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-800/60 transition-all duration-300 group-hover:bg-primary-700/80">
                  <Phone className="h-4 w-4" strokeWidth={1.6} />
                </span>
                <span className="relative overflow-hidden">
                  <span className="block">{CONTACT.phone}</span>
                  <span className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-0 bg-white transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:origin-left group-hover:scale-x-100" />
                </span>
              </a>

              <a
                href={`mailto:${CONTACT.email}`}
                aria-label={t("footer.aria.email")}
                className="group flex items-center gap-3 text-sm text-primary-300 transition-colors duration-300 hover:text-white"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-800/60 transition-all duration-300 group-hover:bg-primary-700/80">
                  <Mail className="h-4 w-4" strokeWidth={1.6} />
                </span>
                <span className="relative overflow-hidden">
                  <span className="block">{CONTACT.email}</span>
                  <span className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-0 bg-white transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:origin-left group-hover:scale-x-100" />
                </span>
              </a>

              <a
                href={LINKS.scheduling}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 text-sm text-secondary-200 transition-colors duration-300 hover:text-white"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary-500/15 transition-all duration-300 group-hover:bg-secondary-500/30">
                  <Calendar className="h-4 w-4" strokeWidth={1.6} />
                </span>
                <span className="relative overflow-hidden">
                  <span className="block">{t("footer.cta.schedule")}</span>
                  <span className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-0 bg-white transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:origin-left group-hover:scale-x-100" />
                </span>
              </a>
            </div>

            <div>
              <h5 className="mb-3 text-[10px] font-semibold tracking-[0.3em] text-primary-400 uppercase font-sans">
                {t("footer.section.follow")}
              </h5>
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t("footer.aria.follow_on")} ${social.name}`}
                    className={cn(
                      "group/social relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-primary-800/60 bg-primary-900/40 text-primary-300 transition-all duration-500 hover:text-white",
                      socialBrandColors[social.name],
                    )}
                  >
                    {socialIcons[social.name]}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div className="border-t border-primary-800/50">
        <Container className="flex flex-col items-center gap-4 py-7 lg:flex-row lg:justify-between">
          <p className="text-xs text-primary-400 font-sans text-center lg:text-left">
            © {currentYear} {CONTACT.companyName}. {t("footer.copyright")}
          </p>

          <p className="hidden lg:block text-[11px] text-primary-500 font-sans">
            {t("footer.entity")} {CONTACT.entityId}
          </p>

          <div className="flex items-center gap-5 flex-wrap justify-center">
            {FOOTER_LEGAL.map((link) => {
              const props = link.external
                ? { target: "_blank" as const, rel: "noopener noreferrer" }
                : {};
              return (
                <Link
                  key={link.labelKey}
                  href={link.href}
                  {...props}
                  className="text-xs text-primary-400 hover:text-white transition-colors duration-300 font-sans"
                >
                  {t(link.labelKey)}
                </Link>
              );
            })}

            <button
              type="button"
              onClick={scrollToTop}
              aria-label={t("footer.aria.back_to_top")}
              className="group flex items-center gap-2 text-xs font-medium text-primary-400 hover:text-white transition-colors duration-300 font-sans"
            >
              {t("footer.back_to_top")}
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-primary-700 transition-all duration-300 group-hover:border-secondary-500 group-hover:-translate-y-0.5">
                <ArrowUp className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5" />
              </span>
            </button>
          </div>
        </Container>
      </div>
    </footer>
  );
}
