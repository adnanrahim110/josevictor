"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { RevealText } from "@/components/ui/reveal-text";
import { LINKS } from "@/constants/content/links";
import { useLocale } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/lib/motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, BookOpen } from "lucide-react";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const REVEAL_SELECTOR = "[data-final-reveal]";
const PETAL_SELECTOR = "[data-final-petal]";

export function FinalCta() {
  const { t } = useLocale();
  const reduce = usePrefersReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const primaryWrapRef = useRef<HTMLDivElement>(null);
  const secondaryWrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const revealItems = Array.from(
        section.querySelectorAll<HTMLElement>(REVEAL_SELECTOR),
      );
      const petals = Array.from(
        section.querySelectorAll<HTMLElement>(PETAL_SELECTOR),
      );
      const cleanups: (() => void)[] = [];

      if (reduce) {
        if (revealItems.length > 0) gsap.set(revealItems, { opacity: 1, y: 0 });
        if (petals.length > 0) gsap.set(petals, { opacity: 1, y: 0, rotate: 0, scale: 1 });
        return;
      }

      if (revealItems.length > 0) gsap.set(revealItems, { opacity: 0, y: 28 });
      if (petals.length > 0) gsap.set(petals, { opacity: 0, y: 28, rotate: -3, scale: 0.96 });

      let revealTween: gsap.core.Tween | null = null;
      if (revealItems.length > 0) {
        revealTween = gsap.to(revealItems, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 72%", once: true },
        });
      }

      let petalTween: gsap.core.Tween | null = null;
      if (petals.length > 0) {
        petalTween = gsap.to(petals, {
          opacity: 1,
          y: 0,
          rotate: 0,
          scale: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 78%", once: true },
        });
      }

      const setupMagnetic = (
        wrapper: HTMLDivElement | null,
        strength = 0.16,
      ) => {
        if (!wrapper) return;

        const xTo = gsap.quickTo(wrapper, "x", {
          duration: 0.45,
          ease: "power3.out",
        });
        const yTo = gsap.quickTo(wrapper, "y", {
          duration: 0.45,
          ease: "power3.out",
        });

        const onMove = (e: MouseEvent) => {
          const rect = wrapper.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          xTo((e.clientX - cx) * strength);
          yTo((e.clientY - cy) * strength);
        };
        const onLeave = () => {
          xTo(0);
          yTo(0);
        };

        wrapper.addEventListener("mousemove", onMove);
        wrapper.addEventListener("mouseleave", onLeave);

        cleanups.push(() => {
          wrapper.removeEventListener("mousemove", onMove);
          wrapper.removeEventListener("mouseleave", onLeave);
        });
      };

      if (window.matchMedia("(pointer: fine)").matches) {
        setupMagnetic(primaryWrapRef.current, 0.18);
        setupMagnetic(secondaryWrapRef.current, 0.14);
      }

      return () => {
        if (revealTween) {
          revealTween.scrollTrigger?.kill();
          revealTween.kill();
        }
        if (petalTween) {
          petalTween.scrollTrigger?.kill();
          petalTween.kill();
        }
        cleanups.forEach((fn) => fn());
      };
    },
    { scope: sectionRef, dependencies: [reduce] },
  );

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-label={t("finalCta.aria.section")}
      className="relative overflow-hidden scroll-mt-24 bg-[linear-gradient(135deg,var(--color-secondary-50)_0%,var(--color-primary-50)_48%,white_100%)] py-20 text-primary-950 md:py-28 lg:py-32"
    >
      <Container className="relative z-10">
        <div className="grid min-h-[440px] md:min-h-[540px] items-center gap-10 md:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.78fr)] lg:gap-16">
          <div className="relative flex flex-col items-center text-center lg:items-start lg:text-left">
            <span
              data-final-reveal
              className="font-heading text-xs italic uppercase tracking-[0.3em] sm:tracking-[0.35em] text-primary-700/80 sm:text-sm"
            >
              {t("finalCta.eyebrow")}
            </span>

            <RevealText
              as="h2"
              splitBy="word"
              stagger={0.045}
              duration={0.9}
              start="top 85%"
              className="mt-6 sm:mt-7 max-w-3xl font-heading text-4xl leading-[1.04] text-primary-950 sm:text-5xl md:text-6xl"
            >
              {t("finalCta.heading")}
            </RevealText>

            <div
              data-final-reveal
              className="mt-8 md:mt-10 flex flex-col gap-4 sm:flex-row w-full sm:w-auto"
            >
              <div
                ref={primaryWrapRef}
                className="inline-flex will-change-transform"
              >
                <Button
                  href={LINKS.contact}
                  size="lg"
                  variant="secondary"
                  icon={<ArrowRight className="w-5 h-5" />}
                  iconPosition="end"
                  className="h-14 sm:h-16 px-6 sm:px-8 text-sm sm:text-base shadow-2xl shadow-secondary-300/45 justify-center w-full sm:w-auto"
                >
                  {t("finalCta.cta.work")}
                </Button>
              </div>

              <div
                ref={secondaryWrapRef}
                className="inline-flex will-change-transform"
              >
                <Button
                  href="#book"
                  size="lg"
                  variant="outline"
                  icon={<BookOpen className="w-5 h-5" />}
                  iconPosition="start"
                  className="h-14 sm:h-16 border-primary-500 bg-white/45 px-6 sm:px-8 text-sm sm:text-base backdrop-blur-sm justify-center w-full sm:w-auto"
                >
                  {t("finalCta.cta.book")}
                </Button>
              </div>
            </div>
          </div>

          <div
            aria-hidden
            className="relative min-h-[280px] sm:min-h-[360px] lg:min-h-[500px]"
          >
            <div
              data-final-petal
              className="absolute left-1/2 top-1/2 h-64 w-40 -translate-x-1/2 -translate-y-1/2 rounded-[999px_999px_180px_180px] bg-white/70 shadow-2xl shadow-primary-900/10 backdrop-blur-sm sm:h-80 sm:w-52"
            />
            <div
              data-final-petal
              className="absolute left-[18%] top-[21%] h-52 w-32 rotate-[-18deg] rounded-[999px_999px_160px_160px] bg-primary-100/80 shadow-xl shadow-primary-900/5 sm:h-64 sm:w-40"
            />
            <div
              data-final-petal
              className="absolute right-[14%] top-[28%] h-56 w-36 rotate-[17deg] rounded-[999px_999px_160px_160px] bg-secondary-100/90 shadow-xl shadow-secondary-900/5 sm:h-72 sm:w-44"
            />
            <div
              data-final-petal
              className="absolute bottom-[10%] left-[26%] h-40 w-28 rotate-[28deg] rounded-[999px_999px_140px_140px] bg-primary-200/55 shadow-lg shadow-primary-900/5 sm:h-48 sm:w-32"
            />

            <div
              data-final-reveal
              className="absolute inset-0 flex items-center justify-center"
            >
              <span className="select-none font-heading text-[7rem] italic leading-none text-primary-950/10 sm:text-[9rem] md:text-[11rem]">
                {t("header.brand")}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
