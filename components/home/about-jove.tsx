"use client";

import { Container } from "@/components/ui/container";
import { DrawSVG } from "@/components/ui/draw-svg";
import { RevealText } from "@/components/ui/reveal-text";
import { ABOUT } from "@/constants/content/about";
import { useLocale } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/lib/motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";

export function AboutJove() {
  const { t } = useLocale();
  const reduce = usePrefersReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const portraitZoomRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const captionRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (reduce) return;

      if (portraitZoomRef.current) {
        gsap.fromTo(
          portraitZoomRef.current,
          { scale: 1 },
          {
            scale: 1.06,
            duration: 9,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          },
        );
      }

      const fadeUp = (el: Element | null, start = "top 85%") => {
        if (!el) return;
        gsap.set(el, { opacity: 0, y: 20 });
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start, once: true },
        });
      };

      fadeUp(eyebrowRef.current);
      fadeUp(headingRef.current, "top 82%");
      fadeUp(captionRef.current, "top 90%");
    },
    { scope: sectionRef, dependencies: [reduce] },
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-label={t("about.aria.section")}
      className="relative py-20 md:py-28 lg:py-32 overflow-hidden scroll-mt-24"
    >
      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[0.7fr_1.3fr] gap-10 md:gap-16 lg:gap-12 items-center">
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-10 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, var(--color-primary-200) 0%, transparent 60%)",
                filter: "blur(50px)",
                opacity: 0.6,
              }}
            />
            <div
              aria-hidden
              className="absolute -bottom-6 -left-6 w-28 h-28 sm:w-32 sm:h-32 border border-secondary-500/40 rounded-full pointer-events-none"
            />
            <div
              aria-hidden
              className="absolute -top-4 -right-4 w-20 h-20 bg-secondary-200/50 rounded-full blur-2xl pointer-events-none"
            />

            <div className="relative aspect-4/5 max-w-xs sm:max-w-sm md:max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-primary-950/20">
              <div
                ref={portraitZoomRef}
                className="absolute inset-0 will-change-transform"
              >
                <Image
                  src={ABOUT.portrait}
                  alt={t("about.aria.portrait")}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 38vw, (min-width: 768px) 45vw, 90vw"
                />
              </div>
              <div
                aria-hidden
                className="absolute inset-0 bg-primary-700/10 mix-blend-multiply pointer-events-none"
              />
            </div>
          </div>

          <div className="flex flex-col items-start gap-6 md:gap-8 text-left">
            <span
              ref={eyebrowRef}
              className="font-heading italic text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.35em] uppercase text-primary-700/80"
            >
              {t("about.eyebrow")}
            </span>

            <h2
              ref={headingRef}
              className="font-heading text-primary-950 leading-[1.05]"
            >
              <span className="inline text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                {t("about.intro.iam")}
                {t("about.intro.fullname")}
                {t("about.intro.dash")}
              </span>
              <span className="inline italic text-secondary-700 text-2xl sm:text-3xl md:text-4xl lg:text-6xl mt-2 ml-0 sm:ml-1 leading-[0.9]">
                {t("about.intro.brandname")}
                {t("about.intro.suffix")}
              </span>
            </h2>

            <RevealText
              as="p"
              splitBy="word"
              stagger={0.04}
              duration={0.7}
              start="top 85%"
              className="font-heading italic text-lg sm:text-2xl md:text-3xl text-primary-700"
            >
              {t("about.role")}
            </RevealText>

            <RevealText
              as="p"
              splitBy="word"
              stagger={0.025}
              duration={0.6}
              start="top 88%"
              className="font-sans text-base sm:text-lg md:text-xl text-primary-700/90 leading-relaxed max-w-2xl"
            >
              {t("about.work")}
            </RevealText>

            <div className="mt-4 flex flex-col items-start gap-2">
              <DrawSVG
                trigger="scroll"
                duration={1.5}
                ease="power2.inOut"
                stagger={0.18}
                start="top 85%"
                className="w-52 sm:w-64 md:w-72"
              >
                <svg
                  viewBox="0 0 320 90"
                  fill="none"
                  stroke="var(--color-primary-700)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  role="img"
                  aria-label={t("about.aria.signature")}
                  className="w-full h-auto"
                >
                  {ABOUT.signaturePaths.map((d, i) => (
                    <path key={i} d={d} />
                  ))}
                </svg>
              </DrawSVG>
              <span
                ref={captionRef}
                className="font-heading italic text-xs sm:text-sm text-primary-700/70 tracking-wider"
              >
                {t("about.signature.caption")}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
