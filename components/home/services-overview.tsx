"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { LINKS } from "@/constants/content/links";
import { SERVICES, type Service } from "@/constants/content/services";
import { useLocale } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar } from "lucide-react";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CARD_PALETTE = {
  sage: {
    bg: "bg-primary-100",
    border: "border-primary-200",
    icon: "text-primary-700",
    accent: "bg-primary-300/60",
  },
  warm: {
    bg: "bg-secondary-100",
    border: "border-secondary-300/60",
    icon: "text-secondary-700",
    accent: "bg-secondary-300/70",
  },
} as const;

const ROOT_DRAW_SELECTOR = "[data-services-root-draw]";

export function ServicesOverview() {
  const { t } = useLocale();
  const reduce = usePrefersReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const cards = gridRef.current?.querySelectorAll<HTMLElement>(".service-card");

      if (reduce) {
        if (cards) gsap.set(cards, { opacity: 1, scale: 1, y: 0 });
        if (eyebrowRef.current) gsap.set(eyebrowRef.current, { opacity: 1, y: 0 });
        if (headingRef.current) gsap.set(headingRef.current, { opacity: 1, y: 0 });
        if (ctaRef.current) gsap.set(ctaRef.current, { opacity: 1, y: 0 });
        return;
      }

      const triggers: ScrollTrigger[] = [];

      [eyebrowRef.current, headingRef.current].forEach((el) => {
        if (!el) return;
        gsap.set(el, { opacity: 0, y: 24 });
        const tween = gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
        if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
      });

      if (cards && cards.length) {
        gsap.set(cards, { opacity: 0, scale: 0.94, y: 28 });
        const tilesTween = gsap.to(cards, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.2,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 78%",
            once: true,
          },
        });
        if (tilesTween.scrollTrigger) triggers.push(tilesTween.scrollTrigger);
      }

      if (ctaRef.current) {
        gsap.set(ctaRef.current, { opacity: 0, y: 24 });
        const tween = gsap.to(ctaRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 90%",
            once: true,
          },
        });
        if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
      }

      return () => {
        triggers.forEach((trigger) => trigger.kill());
      };
    },
    { scope: sectionRef, dependencies: [reduce] },
  );

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-label={t("services.aria.section")}
      className="relative py-20 md:py-28 lg:py-32 overflow-hidden scroll-mt-24"
    >
      <Container className="relative z-10 flex flex-col items-center text-center gap-6 md:gap-8">
        <span
          ref={eyebrowRef}
          className="font-heading italic text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.35em] uppercase text-primary-700/80"
        >
          {t("services.eyebrow")}
        </span>

        <h2
          ref={headingRef}
          className="font-heading text-4xl sm:text-5xl md:text-6xl text-primary-950 leading-[1.05] max-w-3xl"
        >
          {t("services.heading")}
        </h2>

        <div className="relative w-full max-w-6xl mt-2 md:mt-6">
          <ServicesRootConnectors />

          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 md:pt-[380px] relative z-10"
          >
            {SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>

        <div ref={ctaRef} className="mt-8 md:mt-12">
          <Button
            href={LINKS.scheduling}
            size="lg"
            variant="secondary"
            icon={<Calendar className="w-5 h-5" />}
            iconPosition="start"
            className="text-base shadow-xl shadow-secondary-300/40"
          >
            {t("services.cta")}
          </Button>
        </div>
      </Container>
    </section>
  );
}

function ServicesRootConnectors() {
  const reduce = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const paths = Array.from(
        root.querySelectorAll<SVGPathElement>(ROOT_DRAW_SELECTOR),
      );

      paths.forEach((path) => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = reduce ? "0" : `${length}`;
      });

      if (reduce) return;

      const tween = gsap.to(paths, {
        strokeDashoffset: 0,
        duration: 1,
        stagger: 0.08,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top 90%",
          end: "top 42%",
          scrub: 1.2,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: rootRef, dependencies: [reduce] },
  );

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none absolute left-0 top-0 z-0 hidden w-full md:block"
    >
      <svg
        viewBox="0 0 1000 400"
        fill="none"
        className="h-auto w-full overflow-visible"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="services-root-main" x1="500" y1="0" x2="500" y2="360" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#7f6a50" />
            <stop offset="0.5" stopColor="#9a8263" />
            <stop offset="1" stopColor="#c0a17a" />
          </linearGradient>
          <linearGradient id="services-root-fine" x1="500" y1="40" x2="500" y2="370" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#8e785b" stopOpacity="0.72" />
            <stop offset="1" stopColor="#c9ad86" stopOpacity="0.34" />
          </linearGradient>
          <filter id="services-root-texture" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.018 0.09"
              numOctaves="2"
              seed="8"
            />
            <feDisplacementMap in="SourceGraphic" scale="2.5" />
          </filter>
        </defs>

        <g filter="url(#services-root-texture)" strokeLinecap="round" strokeLinejoin="round">
          <path
            data-services-root-draw
            d="M500 0 C490 58 452 102 410 134 C352 178 302 213 260 260 C222 301 190 326 175 352"
            stroke="#5f4d39"
            strokeOpacity="0.16"
            strokeWidth="16"
          />
          <path
            data-services-root-draw
            d="M500 0 C506 70 492 120 504 173 C516 230 506 286 500 352"
            stroke="#5f4d39"
            strokeOpacity="0.14"
            strokeWidth="15"
          />
          <path
            data-services-root-draw
            d="M500 0 C516 58 552 102 596 137 C650 180 700 215 744 262 C783 304 812 329 825 352"
            stroke="#5f4d39"
            strokeOpacity="0.16"
            strokeWidth="16"
          />

          <path
            data-services-root-draw
            d="M500 0 C490 58 452 102 410 134 C352 178 302 213 260 260 C222 301 190 326 175 352"
            stroke="url(#services-root-main)"
            strokeWidth="9"
          />
          <path
            data-services-root-draw
            d="M500 0 C506 70 492 120 504 173 C516 230 506 286 500 352"
            stroke="url(#services-root-main)"
            strokeWidth="8"
          />
          <path
            data-services-root-draw
            d="M500 0 C516 58 552 102 596 137 C650 180 700 215 744 262 C783 304 812 329 825 352"
            stroke="url(#services-root-main)"
            strokeWidth="9"
          />

          <path
            data-services-root-draw
            d="M502 4 C492 61 454 104 412 136 C356 178 304 213 262 260 C226 300 194 326 179 349"
            stroke="#d6c0a0"
            strokeOpacity="0.42"
            strokeWidth="2"
          />
          <path
            data-services-root-draw
            d="M503 6 C509 72 495 121 507 172 C519 230 510 286 504 348"
            stroke="#d6c0a0"
            strokeOpacity="0.36"
            strokeWidth="2"
          />
          <path
            data-services-root-draw
            d="M498 4 C516 58 552 101 594 135 C646 178 697 214 741 261 C779 302 809 327 821 349"
            stroke="#d6c0a0"
            strokeOpacity="0.42"
            strokeWidth="2"
          />

          <g stroke="url(#services-root-fine)" strokeWidth="3">
            <path data-services-root-draw d="M446 106 C418 105 390 88 368 64" />
            <path data-services-root-draw d="M392 147 C366 154 340 146 315 126" />
            <path data-services-root-draw d="M302 214 C274 211 252 194 232 170" />
            <path data-services-root-draw d="M218 306 C190 298 169 278 153 250" />
            <path data-services-root-draw d="M493 139 C470 160 450 184 437 212" />
            <path data-services-root-draw d="M508 202 C534 220 553 248 563 282" />
            <path data-services-root-draw d="M503 296 C480 314 462 338 454 366" />
            <path data-services-root-draw d="M554 105 C582 103 609 86 632 62" />
            <path data-services-root-draw d="M608 148 C636 156 662 148 686 126" />
            <path data-services-root-draw d="M700 214 C728 210 750 192 770 168" />
            <path data-services-root-draw d="M782 306 C812 298 832 276 848 250" />
          </g>

          <g stroke="#b89c77" strokeOpacity="0.5" strokeWidth="2">
            <path data-services-root-draw d="M166 350 C158 339 154 326 158 314 C167 322 173 336 176 350" />
            <path data-services-root-draw d="M187 350 C194 338 202 330 212 323 C207 337 198 346 187 350" />
            <path data-services-root-draw d="M490 350 C481 338 478 326 482 313 C491 323 497 337 501 351" />
            <path data-services-root-draw d="M512 350 C520 338 529 330 540 323 C535 337 524 346 512 350" />
            <path data-services-root-draw d="M814 350 C806 338 802 326 806 314 C816 323 822 337 826 350" />
            <path data-services-root-draw d="M836 350 C844 338 852 330 863 323 C858 337 848 346 836 350" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const { t } = useLocale();
  const palette = CARD_PALETTE[service.palette];
  const Icon = service.Icon;

  return (
    <article
      className={cn(
        "service-card group relative flex flex-col gap-5 p-6 sm:p-8 rounded-2xl border shadow-md transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl",
        palette.bg,
        palette.border,
      )}
    >
      <div
        aria-hidden
        className={cn(
          "absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-3 rounded-full transition-transform duration-500 group-hover:scale-110",
          palette.accent,
        )}
      />

      <div className="flex items-center justify-between pt-2">
        <div
          className={cn(
            "size-14 rounded-xl flex items-center justify-center bg-white/60 shadow-sm",
            palette.icon,
          )}
        >
          <Icon className="w-7 h-7" aria-hidden />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <h3 className="font-heading text-xl sm:text-2xl md:text-3xl text-primary-950 leading-tight">
          {t(service.titleKey)}
        </h3>
        {service.subtitleKey && (
          <p className="font-heading italic text-sm sm:text-base text-secondary-700">
            {t(service.subtitleKey)}
          </p>
        )}
      </div>

      <p className="font-sans text-sm sm:text-base text-primary-700/90 leading-relaxed">
        {t(service.descKey)}
      </p>
    </article>
  );
}
