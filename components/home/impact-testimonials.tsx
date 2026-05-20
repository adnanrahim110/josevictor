"use client";

import { Container } from "@/components/ui/container";
import { Parallax } from "@/components/ui/parallax";
import { RevealText } from "@/components/ui/reveal-text";
import { TESTIMONIALS, type Testimonial } from "@/constants/content/impact";
import { useLocale } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote } from "lucide-react";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CARD_PALETTE = {
  sage: {
    bg: "bg-primary-100",
    border: "border-primary-200",
    quote: "text-primary-600/60",
    leaf: "text-primary-600/35",
    avatar: "bg-primary-700 text-secondary-100",
    name: "text-primary-950",
    role: "text-primary-700",
  },
  warm: {
    bg: "bg-secondary-100",
    border: "border-secondary-300/60",
    quote: "text-secondary-700/55",
    leaf: "text-secondary-700/35",
    avatar: "bg-secondary-600 text-secondary-50",
    name: "text-primary-950",
    role: "text-primary-700",
  },
  deep: {
    bg: "bg-primary-800",
    border: "border-primary-700",
    quote: "text-secondary-300/55",
    leaf: "text-secondary-300/30",
    avatar: "bg-secondary-300 text-primary-900",
    name: "text-secondary-50",
    role: "text-secondary-200/80",
  },
} as const;

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function ImpactTestimonials() {
  const { t } = useLocale();
  const reduce = usePrefersReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const cards = Array.from(
        cardsRef.current?.querySelectorAll<HTMLElement>(".testimonial-card") || [],
      );
      if (reduce) {
        if (eyebrowRef.current) gsap.set(eyebrowRef.current, { opacity: 1, y: 0 });
        if (cards.length > 0) gsap.set(cards, { opacity: 1, y: 0, scale: 1 });
        return;
      }

      if (cards.length > 0) gsap.set(cards, { opacity: 0, y: 40, scale: 0.95 });

      const triggers: ScrollTrigger[] = [];

      if (eyebrowRef.current) {
        gsap.set(eyebrowRef.current, { opacity: 0, y: 12 });
        const tween = gsap.to(eyebrowRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: eyebrowRef.current,
            start: "top 88%",
            once: true,
          },
        });
        if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
      }

      if (cards.length > 0) {
        const tween = gsap.to(cards, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: cardsRef.current, start: "top 75%", once: true },
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
      id="impact"
      aria-label={t("impact.aria.section")}
      className="relative py-20 md:py-28 lg:py-32 overflow-hidden scroll-mt-24"
    >
      <Parallax
        speed={-0.18}
        className="pointer-events-none absolute top-0 left-0 right-0 w-full h-40 sm:h-65 md:h-85 z-0"
      >
        <Grove />
      </Parallax>

      <Container className="relative z-10 flex flex-col items-center text-center gap-6 md:gap-10">
        <span
          ref={eyebrowRef}
          className="font-heading italic text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.35em] uppercase text-primary-700/80 mt-16 sm:mt-32 md:mt-40"
        >
          {t("impact.eyebrow")}
        </span>

        <RevealText
          as="p"
          splitBy="word"
          stagger={0.03}
          duration={0.8}
          start="top 80%"
          className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary-950 leading-snug max-w-4xl"
        >
          {t("impact.lead")}
        </RevealText>

        <span className="font-heading italic text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.35em] uppercase text-primary-700/70 mt-2 md:mt-4">
          {t("impact.voices.label")}
        </span>

        <div
          ref={cardsRef}
          className="w-full mt-2 flex md:grid md:grid-cols-3 gap-5 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none px-1 -mx-1 pb-4 md:pb-0 scrollbar-thin"
        >
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { t } = useLocale();
  const palette = CARD_PALETTE[testimonial.palette];
  const name = t(testimonial.nameKey);
  const initials = getInitials(name);

  return (
    <article
      className={cn(
        "testimonial-card relative flex flex-col gap-6 p-6 sm:p-8 rounded-2xl border shadow-md min-w-[85%] sm:min-w-[60%] md:min-w-0 snap-center md:snap-align-none shrink-0 md:shrink",
        palette.bg,
        palette.border,
      )}
    >
      <Leaf
        shape={testimonial.leaf}
        className={cn("absolute top-4 right-4 w-12 h-12", palette.leaf)}
      />

      <Quote
        className={cn("w-9 h-9 -mb-2", palette.quote)}
        aria-hidden
        strokeWidth={1.4}
      />

      <p
        className={cn(
          "font-heading italic text-lg sm:text-xl leading-relaxed text-left",
          palette.name,
        )}
      >
        {t(testimonial.quoteKey)}
      </p>

      <div className="flex items-center gap-3 mt-auto pt-2">
        <div
          aria-hidden
          className={cn(
            "size-11 rounded-full flex items-center justify-center font-heading text-sm font-semibold shrink-0",
            palette.avatar,
          )}
        >
          {initials}
        </div>
        <div className="flex flex-col text-left leading-tight">
          <span
            className={cn("font-heading text-base sm:text-lg", palette.name)}
          >
            {name}
          </span>
          <span className={cn("font-sans text-xs sm:text-sm", palette.role)}>
            {t(testimonial.roleKey)}
          </span>
        </div>
      </div>
    </article>
  );
}

function Leaf({
  shape,
  className,
}: {
  shape: "a" | "b" | "c";
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      {shape === "a" && (
        <path d="M24 4 C 14 14, 8 26, 12 40 C 22 36, 32 28, 38 14 C 32 10, 28 8, 24 4 Z" />
      )}
      {shape === "b" && (
        <path d="M40 8 C 28 10, 16 18, 10 32 C 16 38, 26 40, 38 34 C 42 24, 42 16, 40 8 Z" />
      )}
      {shape === "c" && (
        <path d="M8 8 C 12 22, 22 34, 36 38 C 38 30, 34 18, 24 10 C 18 6, 12 6, 8 8 Z" />
      )}
    </svg>
  );
}

function Grove() {
  return (
    <svg
      viewBox="0 0 1200 200"
      preserveAspectRatio="none"
      fill="none"
      className="w-full h-full opacity-30"
      aria-hidden
    >
      {GROVE_TREES.map((tree, i) => (
        <g
          key={i}
          transform={`translate(${tree.x}, ${tree.y}) scale(${tree.scale})`}
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="-22"
            stroke="var(--color-primary-700)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <ellipse
            cx="0"
            cy="-34"
            rx="14"
            ry="18"
            fill="var(--color-primary-600)"
            opacity="0.55"
          />
          <ellipse
            cx="-9"
            cy="-30"
            rx="10"
            ry="13"
            fill="var(--color-primary-700)"
            opacity="0.45"
          />
          <ellipse
            cx="8"
            cy="-32"
            rx="11"
            ry="14"
            fill="var(--color-primary-500)"
            opacity="0.5"
          />
        </g>
      ))}
    </svg>
  );
}

const GROVE_TREES = [
  { x: 60, y: 175, scale: 0.95 },
  { x: 150, y: 170, scale: 1.2 },
  { x: 240, y: 178, scale: 0.85 },
  { x: 330, y: 172, scale: 1.05 },
  { x: 430, y: 175, scale: 1.1 },
  { x: 520, y: 178, scale: 0.9 },
  { x: 620, y: 170, scale: 1.25 },
  { x: 720, y: 174, scale: 1.0 },
  { x: 810, y: 178, scale: 0.85 },
  { x: 900, y: 172, scale: 1.15 },
  { x: 1000, y: 176, scale: 0.95 },
  { x: 1090, y: 174, scale: 1.05 },
];
