"use client";

import { Container } from "@/components/ui/container";
import { OUTCOMES, type OutcomeTile } from "@/constants/content/differentiation";
import { useLocale } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Blocks } from "lucide-react";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PALETTE = {
  sage: {
    bg: "bg-primary-200/70",
    border: "border-primary-300/50",
    icon: "text-primary-700",
    stud: "bg-primary-400/40",
    number: "text-primary-600",
  },
  warm: {
    bg: "bg-secondary-100/80",
    border: "border-secondary-300/50",
    icon: "text-secondary-700",
    stud: "bg-secondary-400/45",
    number: "text-secondary-700",
  },
} as const;

export function Differentiation() {
  const { t } = useLocale();
  const reduce = usePrefersReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const tintRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const tint = tintRef.current;
      if (!section) return;

      if (reduce) {
        if (tint) gsap.set(tint, { opacity: 0.45 });
        return;
      }

      const triggers: ScrollTrigger[] = [];

      if (tint) {
        gsap.set(tint, { opacity: 0 });
        const fadeIn = gsap.to(tint, {
          opacity: 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 30%",
            scrub: true,
          },
        });
        if (fadeIn.scrollTrigger) triggers.push(fadeIn.scrollTrigger);

        const fadeOut = gsap.to(tint, {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "bottom 65%",
            end: "bottom top",
            scrub: true,
          },
        });
        if (fadeOut.scrollTrigger) triggers.push(fadeOut.scrollTrigger);
      }

      const elementsFadeUp: { el: Element | null; start: string; delay?: number }[] = [
        { el: titleRef.current, start: "top 80%" },
        { el: introRef.current, start: "top 82%" },
        { el: badgeRef.current, start: "top 85%" },
        { el: closingRef.current, start: "top 80%" },
      ];

      elementsFadeUp.forEach(({ el, start, delay = 0 }) => {
        if (!el) return;
        gsap.set(el, { opacity: 0, y: 28 });
        const tween = gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.85,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start, once: true },
        });
        if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
      });

      const tiles = gridRef.current?.querySelectorAll<HTMLElement>(".tile");
      if (tiles && tiles.length > 0) {
        gsap.set(tiles, { opacity: 0, scale: 0.7, y: 32 });
        const tilesTween = gsap.to(tiles, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 78%",
            once: true,
          },
        });
        if (tilesTween.scrollTrigger) triggers.push(tilesTween.scrollTrigger);
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
      id="how-i-work"
      aria-label={t("differentiation.aria.section")}
      className="relative py-20 md:py-28 lg:py-32 overflow-hidden scroll-mt-24"
    >
      <div
        ref={tintRef}
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--color-secondary-100)" }}
      />

      <Container className="relative z-10 flex flex-col items-center text-center gap-6 md:gap-8">
        <span className="font-heading italic text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.35em] uppercase text-primary-700/80">
          {t("differentiation.eyebrow")}
        </span>

        <h2
          ref={titleRef}
          className="font-heading text-4xl sm:text-5xl md:text-6xl text-primary-950 leading-[1.05] max-w-3xl"
        >
          {t("differentiation.title.prefix")}
          <span className="italic text-secondary-700 font-medium">
            {t("differentiation.title.highlight")}
          </span>
          {t("differentiation.title.suffix")}
        </h2>

        <p
          ref={introRef}
          className="font-sans text-base sm:text-lg md:text-xl text-primary-800/90 leading-relaxed max-w-2xl"
        >
          {t("differentiation.intro")}
        </p>

        <div ref={badgeRef}>
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-950 px-4 py-2 shadow-md">
            <Blocks className="w-4 h-4 text-secondary-300" />
            <span className="text-xs sm:text-sm font-sans font-medium text-white tracking-wider">
              {t("differentiation.lsp.label")}
            </span>
          </div>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 w-full max-w-4xl mt-2 md:mt-4"
        >
          {OUTCOMES.map((tile, index) => (
            <Tile key={tile.id} tile={tile} index={index} />
          ))}
        </div>

        <div
          ref={closingRef}
          className="flex flex-col items-center gap-2 mt-6 md:mt-10 max-w-3xl"
        >
          <p className="font-heading text-xl sm:text-2xl md:text-3xl text-primary-800 leading-snug">
            {t("differentiation.closing.line1")}
          </p>
          <p className="font-heading text-xl sm:text-2xl md:text-3xl text-primary-950 leading-snug">
            {t("differentiation.closing.line2.prefix")}
            <span className="italic text-secondary-700 font-medium">
              {t("differentiation.closing.line2.clarity")}
            </span>
            {t("differentiation.closing.line2.connector")}
            <span className="italic text-secondary-700 font-medium">
              {t("differentiation.closing.line2.execution")}
            </span>
            {t("differentiation.closing.line2.suffix")}
          </p>
        </div>
      </Container>
    </section>
  );
}

function Tile({ tile, index }: { tile: OutcomeTile; index: number }) {
  const { t } = useLocale();
  const palette = PALETTE[tile.palette];
  const hoverRotate = tile.tilt === -1 ? "hover:-rotate-1" : "hover:rotate-1";
  const Icon = tile.Icon;

  return (
    <div
      className={cn(
        "tile group relative flex flex-col gap-6 p-6 sm:p-8 rounded-2xl border shadow-md cursor-default transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl",
        palette.bg,
        palette.border,
        hoverRotate,
      )}
    >
      <div
        aria-hidden
        className="absolute top-3 left-6 flex gap-2"
      >
        <span className={cn("size-2 rounded-full", palette.stud)} />
        <span className={cn("size-2 rounded-full", palette.stud)} />
      </div>
      <span
        className={cn(
          "absolute top-5 right-6 text-[10px] font-sans tracking-[0.3em] uppercase font-medium",
          palette.number,
        )}
      >
        {`0${index + 1}`}
      </span>

      <Icon className={cn("w-9 h-9 mt-4", palette.icon)} aria-hidden />

      <p className="font-heading text-lg sm:text-xl md:text-2xl text-primary-950 leading-snug">
        {t(tile.titleKey)}
      </p>
    </div>
  );
}
