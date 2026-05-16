"use client";

import { Container } from "@/components/ui/container";
import { useLocale } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/lib/motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const REVEAL_SELECTOR = "[data-purpose-reveal]";
const THREAD_SELECTOR = "[data-purpose-thread]";
const UNDERLINE_SELECTOR = "[data-purpose-underline]";

export function PurposeMessage() {
  const { t } = useLocale();
  const reduce = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const revealItems = Array.from(
        section.querySelectorAll<HTMLElement>(REVEAL_SELECTOR),
      );
      const thread = section.querySelector<HTMLElement>(THREAD_SELECTOR);
      const underline =
        section.querySelector<SVGPathElement>(UNDERLINE_SELECTOR);

      if (underline) {
        const length = underline.getTotalLength();
        underline.style.strokeDasharray = `${length}`;
        underline.style.strokeDashoffset = `${length}`;
      }

      if (reduce) {
        gsap.set(revealItems, { opacity: 1, y: 0 });
        if (thread) gsap.set(thread, { scaleY: 1 });
        if (underline) underline.style.strokeDashoffset = "0";
        return;
      }

      gsap.set(revealItems, { opacity: 0, y: 28 });
      if (thread) {
        gsap.set(thread, { scaleY: 0, transformOrigin: "top center" });
      }

      const triggers: ScrollTrigger[] = [];

      const revealTween = gsap.to(revealItems, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          once: true,
        },
      });

      if (revealTween.scrollTrigger) triggers.push(revealTween.scrollTrigger);

      if (thread) {
        const threadTween = gsap.to(thread, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            end: "bottom 58%",
            scrub: 1,
          },
        });

        if (threadTween.scrollTrigger) triggers.push(threadTween.scrollTrigger);
      }

      if (underline) {
        const underlineTween = gsap.to(underline, {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: underline,
            start: "top 86%",
            once: true,
          },
        });

        if (underlineTween.scrollTrigger) {
          triggers.push(underlineTween.scrollTrigger);
        }
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
      id="purpose"
      aria-label={t("purpose.aria.section")}
      className="relative overflow-hidden scroll-mt-24 py-20 md:py-28 lg:py-32"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-primary-200 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-b from-white/0 via-primary-50/80 to-white/0"
      />

      <Container className="relative z-10">
        <div className="grid gap-10 md:gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-center lg:gap-16">
          <PurposeIntro
            eyebrow={t("purpose.aria.section")}
            lead={t("purpose.lead.line1")}
            discovery={t("purpose.lead.line2")}
          />

          <div className="relative">
            <div
              aria-hidden
              className="absolute left-0 top-0 hidden h-full w-px bg-primary-200 md:block"
            />
            <div
              aria-hidden
              data-purpose-thread
              className="absolute left-0 top-0 hidden h-full w-px origin-top bg-secondary-500 md:block"
            />

            <div className="flex flex-col gap-10 md:pl-10 lg:gap-12">
              <PurposeInsight>{t("purpose.insight")}</PurposeInsight>
              <PurposeClosing
                prefix={t("purpose.outro.prefix")}
                punchline={t("purpose.punchline")}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function PurposeIntro({
  eyebrow,
  lead,
  discovery,
}: {
  eyebrow: string;
  lead: string;
  discovery: string;
}) {
  return (
    <header
      data-purpose-reveal
      className="flex max-w-xl flex-col gap-6 text-left"
    >
      <span className="w-fit border-b border-secondary-500 pb-2 font-heading text-xs italic uppercase tracking-[0.3em] text-primary-700/80 sm:tracking-[0.35em] sm:text-sm">
        {eyebrow}
      </span>

      <div className="flex flex-col gap-5">
        <p className="font-sans text-base font-medium leading-relaxed text-primary-700/90 sm:text-lg md:text-xl">
          {lead}
        </p>
        <p className="font-heading text-3xl italic leading-tight text-primary-950 sm:text-4xl md:text-5xl">
          {discovery}
        </p>
      </div>
    </header>
  );
}

function PurposeInsight({ children }: { children: string }) {
  return (
    <article
      data-purpose-reveal
      className="relative border-b border-primary-200 py-8 sm:py-10"
    >
      <span
        aria-hidden
        className="absolute left-[-46px] bg-white top-10 hidden size-3 rounded-full border-2 border-secondary-500 md:block"
      />
      <h2 className="max-w-4xl font-heading text-3xl leading-[1.08] text-primary-950 sm:text-4xl md:text-5xl">
        {children}
      </h2>
    </article>
  );
}

function PurposeClosing({
  prefix,
  punchline,
}: {
  prefix: string;
  punchline: string;
}) {
  return (
    <div data-purpose-reveal className="relative max-w-3xl">
      <span
        aria-hidden
        className="absolute left-[-46px] bg-white top-3 hidden size-3 rounded-full border-2 border-primary-400 md:block"
      />
      <p className="font-sans text-sm font-medium leading-relaxed text-primary-700/90 sm:text-base md:text-lg">
        {prefix}
      </p>
      <div className="relative mt-3 inline-block pr-3">
        <p className="font-heading text-2xl italic leading-tight text-secondary-700 sm:text-3xl md:text-4xl">
          {punchline}
        </p>
        <PurposeUnderline />
      </div>
    </div>
  );
}

function PurposeUnderline() {
  return (
    <svg
      viewBox="0 0 520 34"
      preserveAspectRatio="none"
      className="absolute -bottom-4 left-0 h-8 w-full text-secondary-600"
      fill="none"
      aria-hidden
    >
      <path
        data-purpose-underline
        className="stroke-current"
        strokeWidth="3"
        strokeLinecap="round"
        d="M6 20 C88 6 166 28 252 17 C338 6 422 11 514 15"
      />
    </svg>
  );
}
