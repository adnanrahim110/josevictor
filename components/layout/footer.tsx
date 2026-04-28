"use client";

import { Container } from "@/components/ui/container";
import {
  CONTACT,
  LEGAL_LINKS,
  NAV_LINKS,
  SERVICE_LINKS,
  SOCIAL_LINKS,
} from "@/constants";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

// Inline Social SVG Icons
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

// Brand Colors for Social Hover Glow
const socialBrandColors: Record<string, string> = {
  Facebook:
    "hover:border-[#1877F2]/50 hover:shadow-[0_0_20px_rgba(24,119,242,0.3)]",
  Instagram:
    "hover:border-[#E4405F]/50 hover:shadow-[0_0_20px_rgba(228,64,95,0.3)]",
  LinkedIn:
    "hover:border-[#0A66C2]/50 hover:shadow-[0_0_20px_rgba(10,102,194,0.3)]",
  X: "hover:border-white/40 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]",
  YouTube:
    "hover:border-[#FF0000]/50 hover:shadow-[0_0_20px_rgba(255,0,0,0.3)]",
};

const socialBrandBg: Record<string, string> = {
  Facebook: "bg-[#1877F2]",
  Instagram: "bg-[#E4405F]",
  LinkedIn: "bg-[#0A66C2]",
  X: "bg-white/20",
  YouTube: "bg-[#FF0000]",
};

function FooterLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const linkProps = external
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <li>
      <Link
        href={href}
        {...linkProps}
        className="group inline-flex items-center gap-1 text-primary-400 transition-colors duration-300 hover:text-white"
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
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-primary-950 text-primary-50">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-linear-to-r from-transparent via-primary-600/40 to-transparent" />

      <Container className="pt-20 pb-16 lg:pt-28 lg:pb-20">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/" className="inline-block">
                <span className="font-heading text-5xl font-bold tracking-tight text-white">
                  JVJ
                </span>
                <span className="ml-2 font-sans text-lg font-medium tracking-normal text-primary-300">
                  Consulting
                </span>
              </Link>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-primary-400">
                Your partner in strategic business consulting and virtual social
                services. We empower businesses and individuals with holistic
                solutions for growth, sustainability, and well-being.
              </p>
            </motion.div>
          </div>

          <div className="lg:col-span-9 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 lg:pl-12">
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              aria-label="Company navigation"
              className="col-span-2"
            >
              <h4 className="mb-6 text-xs font-semibold tracking-[0.2em] text-primary-300 uppercase">
                Company
              </h4>
              <ul className="space-y-4 text-sm">
                {NAV_LINKS.map((link) => (
                  <FooterLink key={link.name} href={link.href}>
                    {link.name}
                  </FooterLink>
                ))}
              </ul>
            </motion.nav>

            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              aria-label="Services navigation"
              className="col-span-4"
            >
              <h4 className="mb-6 text-xs font-semibold tracking-[0.2em] text-primary-300 uppercase">
                Services
              </h4>
              <ul className="space-y-4 text-sm">
                {SERVICE_LINKS.map((link) => (
                  <FooterLink key={link.name} href={link.href}>
                    {link.name}
                  </FooterLink>
                ))}
              </ul>
            </motion.nav>

            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              aria-label="Legal navigation"
              className="col-span-2"
            >
              <h4 className="mb-6 text-xs font-semibold tracking-[0.2em] text-primary-300 uppercase">
                Legal
              </h4>
              <ul className="space-y-4 text-sm">
                {LEGAL_LINKS.map((link) => (
                  <FooterLink
                    key={link.name}
                    href={link.href}
                    external={link.href.startsWith("http")}
                  >
                    {link.name}
                  </FooterLink>
                ))}
              </ul>
            </motion.nav>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="col-span-4"
            >
              <h4 className="mb-6 text-xs font-semibold tracking-[0.2em] text-primary-300 uppercase">
                Get in Touch
              </h4>

              <div className="space-y-4 mb-8">
                <a
                  href={`tel:${CONTACT.phoneRaw}`}
                  className="group flex items-center gap-3 text-sm text-primary-400 transition-colors duration-300 hover:text-white"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-800/50 transition-all duration-300 group-hover:bg-primary-700/80 group-hover:scale-110">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25z"
                      />
                    </svg>
                  </span>
                  <span className="relative overflow-hidden">
                    <span className="block">{CONTACT.phone}</span>
                    <span className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-0 bg-white transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:origin-left group-hover:scale-x-100" />
                  </span>
                </a>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="group flex items-center gap-3 text-sm text-primary-400 transition-colors duration-300 hover:text-white"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-800/50 transition-all duration-300 group-hover:bg-primary-700/80 group-hover:scale-110">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                      />
                    </svg>
                  </span>
                  <span className="relative overflow-hidden">
                    <span className="block">{CONTACT.email}</span>
                    <span className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-0 bg-white transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:origin-left group-hover:scale-x-100" />
                  </span>
                </a>
              </div>

              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className={`group/social relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-primary-800/60 bg-primary-900/40 text-primary-400 transition-all duration-500 ${socialBrandColors[social.name]}`}
                  >
                    <span
                      className={`absolute inset-0 flex items-center justify-center`}
                    >
                      <span
                        className={`h-0 w-0 rounded-full ${socialBrandBg[social.name]} opacity-20 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/social:size-30 group-hover/social:opacity-30`}
                      />
                    </span>
                    <span className="relative z-10 flex h-4 w-4 items-center justify-center overflow-hidden">
                      <span className="absolute transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/social:translate-y-[-150%] group-hover/social:opacity-0">
                        {socialIcons[social.name]}
                      </span>
                      <span className="absolute translate-y-[150%] opacity-0 text-white transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/social:translate-y-0 group-hover/social:opacity-100">
                        {socialIcons[social.name]}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </Container>

      <div className="border-t border-primary-800/50">
        <Container className="flex flex-col items-center justify-between gap-6 py-8 md:flex-row">
          <p className="text-xs text-primary-400">
            © {currentYear} {CONTACT.companyName}. All rights reserved.
          </p>

          <p className="text-center text-xs text-primary-400">
            Unique Entity ID {CONTACT.entityId} / {CONTACT.registrationId}
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-2 text-xs font-medium text-primary-400 transition-colors duration-300 hover:text-white"
            aria-label="Scroll back to top"
          >
            Back to top
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-primary-700 transition-all duration-300 group-hover:border-primary-500 group-hover:-translate-y-0.5">
              <svg
                className="h-3 w-3 rotate-180 transition-transform duration-300 group-hover:-translate-y-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </button>
        </Container>
      </div>
    </footer>
  );
}
