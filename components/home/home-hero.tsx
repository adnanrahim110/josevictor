"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useLocale } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/lib/motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight, BookOpen } from "lucide-react";
import { useRef } from "react";

export function HomeHero() {
  const { t } = useLocale();
  const reduce = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const textWrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const eyebrow = section.querySelector<HTMLElement>(".hero-eyebrow");
      const words = section.querySelectorAll<HTMLElement>(".hero-word");
      const tagline = section.querySelector<HTMLElement>(".hero-tagline");
      const desc = section.querySelector<HTMLElement>(".hero-desc");
      const ctas = section.querySelector<HTMLElement>(".hero-ctas");
      const scrollHint = section.querySelector<HTMLElement>(".hero-scroll");
      const scrollLine =
        section.querySelector<HTMLElement>(".hero-scroll-line");
      const divider = section.querySelector<HTMLElement>(".hero-divider");

      if (reduce) {
        gsap.set(
          [eyebrow, ...Array.from(words), tagline, desc, ctas, divider].filter(Boolean),
          { opacity: 1, y: 0, scale: 1, scaleX: 1 },
        );
        return;
      }

      if (eyebrow) gsap.set(eyebrow, { opacity: 0, y: 15 });
      if (words.length) gsap.set(words, { opacity: 0, y: 80, rotateX: 30 });
      if (tagline) gsap.set(tagline, { opacity: 0, y: 20 });
      if (desc) gsap.set(desc, { opacity: 0, y: 20 });
      if (ctas) gsap.set(ctas, { opacity: 0, y: 20 });
      if (divider) gsap.set(divider, { scaleX: 0, transformOrigin: "center" });

      const tl = gsap.timeline();

      if (eyebrow) tl.to(eyebrow, { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" }, 0.4);
      if (words.length) tl.to(words, { opacity: 1, y: 0, rotateX: 0, duration: 1.2, stagger: 0.15, ease: "power3.out" }, 0.6);
      if (divider) tl.to(divider, { scaleX: 1, duration: 1.2, ease: "power3.inOut" }, 1.4);
      if (tagline) tl.to(tagline, { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" }, 1.6);
      if (desc) tl.to(desc, { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" }, 1.9);
      if (ctas) tl.to(ctas, { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" }, 2.2);

      if (scrollLine) {
        gsap.to(scrollLine, {
          scaleY: 0.3,
          transformOrigin: "top",
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 3.2,
        });
      }
    },
    { scope: sectionRef, dependencies: [reduce] },
  );

  const headline = [
    t("hero.headline.live"),
    t("hero.headline.love"),
    t("hero.headline.learn"),
  ];

  return (
    <section
      ref={sectionRef}
      aria-label={t("hero.aria.section")}
      className="relative flex items-center justify-center min-h-svh overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 w-full h-full z-0"
        style={{
          background:
            "radial-gradient(circle at top, var(--color-secondary-200) 0%, transparent 60%)",
          opacity: 0.4,
        }}
      />

      <Container className="relative z-10 flex flex-col items-center justify-center pt-28 pb-20 sm:pt-32 sm:pb-24 min-h-svh text-center pointer-events-none">
        <div
          ref={textWrapRef}
          className="flex flex-col items-center gap-6 sm:gap-8 max-w-4xl w-full pointer-events-auto"
        >
          <span className="hero-eyebrow inline-block px-4 py-1.5 rounded-full border border-primary-200 bg-white/40 backdrop-blur-md font-heading italic text-[10px] sm:text-xs md:text-sm tracking-[0.3em] sm:tracking-[0.35em] uppercase text-primary-700/80 shadow-sm">
            {t("hero.eyebrow")}
          </span>

          <h1 className="flex flex-wrap justify-center gap-x-3 sm:gap-x-6 md:gap-x-8 lg:gap-x-12 gap-y-2 mt-2 sm:mt-4">
            {headline.map((word, i) => (
              <span
                key={i}
                className="hero-word inline-block font-heading text-5xl sm:text-7xl md:text-8xl leading-[0.9] tracking-tight text-primary-950"
                style={{ perspective: "800px" }}
              >
                {word}
              </span>
            ))}
          </h1>

          <div className="flex items-center gap-4 w-full max-w-md mt-2">
            <div className="hero-divider flex-1 h-px bg-linear-to-r from-transparent via-primary-400 to-transparent" />
          </div>

          <div className="hero-tagline font-heading italic text-xl sm:text-3xl md:text-4xl lg:text-5xl text-primary-800 leading-snug mt-2">
            <span>{t("hero.subheadline.line1")}</span>
            <span className="inline-block ml-3">
              {t("hero.subheadline.line2")}
            </span>
          </div>

          <p className="hero-desc max-w-2xl text-sm sm:text-base md:text-lg lg:text-xl text-primary-700/80 leading-relaxed font-sans mt-2 font-medium bg-white/20 backdrop-blur-xs px-4 py-3 sm:px-6 rounded-2xl">
            {t("hero.subheadline2")}
          </p>

          <div className="hero-ctas flex flex-col sm:flex-row gap-4 sm:gap-5 mt-4 sm:mt-6 w-full sm:w-auto">
            <Button
              href="#book"
              size="lg"
              icon={<BookOpen className="w-5 h-5" />}
              iconPosition="start"
              className="text-sm sm:text-base h-12 sm:h-14 px-6 sm:px-8 shadow-xl shadow-primary-900/10 justify-center"
            >
              {t("hero.cta.book")}
            </Button>
            <Button
              href="#contact"
              variant="outline"
              size="lg"
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="end"
              className="text-sm sm:text-base h-12 sm:h-14 px-6 sm:px-8 bg-white/40 backdrop-blur-sm border-primary-200 hover:bg-white/80 justify-center"
            >
              {t("hero.cta.work")}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
