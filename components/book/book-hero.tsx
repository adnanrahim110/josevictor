"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { RevealText } from "@/components/ui/reveal-text";
import { Title } from "@/components/ui/title";
import {
  BOOK,
  type BookEdition,
  type BookMedallion,
} from "@/constants/content/book";
import { useLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { BookOpen, Headphones } from "lucide-react";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";

const Book3D = dynamic(
  () =>
    import("@/components/home/book-3d").then((m) => ({ default: m.Book3D })),
  { ssr: false, loading: () => null },
);

const MEDALLIONS: readonly BookMedallion[] = ["en", "es", "audio"] as const;

export function BookHero() {
  const { locale, t } = useLocale();
  const [active, setActive] = useState<BookMedallion>(locale);
  const audioBadgeRef = useRef<HTMLDivElement>(null);

  const bookEdition: BookEdition = active === "audio" ? locale : active;
  const showAudioBadge = active === "audio";

  useGSAP(
    () => {
      const el = audioBadgeRef.current;
      if (!el) return;
      gsap.to(el, {
        opacity: showAudioBadge ? 1 : 0,
        y: showAudioBadge ? 0 : 8,
        duration: 0.45,
        ease: "power2.out",
      });
    },
    { dependencies: [showAudioBadge] },
  );

  return (
    <section
      aria-label={t("book.aria.section")}
      className="relative py-16 md:py-24 lg:py-32 overflow-hidden"
    >
      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <RevealText
              as="span"
              className="font-heading italic text-xs sm:text-sm tracking-[0.35em] uppercase text-primary-700/80 mb-6 block"
            >
              {t("book.eyebrow")}
            </RevealText>

            <Title as="h1" className="mb-8">
              {t("book.heading")}
            </Title>

            <div className="flex flex-col gap-3 max-w-2xl">
              <RevealText
                as="p"
                splitBy="word"
                stagger={0.025}
                duration={0.75}
                className="font-heading text-xl sm:text-2xl md:text-3xl text-primary-900 leading-snug"
              >
                {t("book.invitation.line1")}
              </RevealText>
              <RevealText
                as="p"
                splitBy="word"
                stagger={0.03}
                duration={0.75}
                className="font-heading text-xl sm:text-2xl md:text-3xl text-primary-900 leading-snug"
              >
                {t("book.invitation.line2")}
              </RevealText>
            </div>

            <div className="mt-8 flex flex-col items-center gap-2 lg:items-start">
              <p className="font-heading italic text-base sm:text-lg md:text-xl text-secondary-700">
                {t("book.tagline.line1")}
              </p>
              <p className="font-heading text-sm sm:text-base md:text-lg text-primary-700 max-w-xl">
                {t("book.tagline.line2")}
              </p>
            </div>

            <div className="mt-10 w-full sm:w-auto">
              <Button
                href={BOOK.amazonUrl}
                size="lg"
                variant="secondary"
                icon={<BookOpen className="w-5 h-5" />}
                iconPosition="start"
                className="w-full sm:w-auto"
              >
                {t("book.cta.buy")}
              </Button>
            </div>

            <div
              role="group"
              className="mt-12 flex items-center justify-center lg:justify-start gap-5 sm:gap-8"
            >
              {MEDALLIONS.map((ed) => {
                const isActive = active === ed;
                const ariaKey =
                  ed === "en"
                    ? "book.aria.medallion.en"
                    : ed === "es"
                      ? "book.aria.medallion.es"
                      : "book.aria.medallion.audio";
                const labelKey =
                  ed === "en"
                    ? "book.medallion.en.label"
                    : ed === "es"
                      ? "book.medallion.es.label"
                      : "book.medallion.audio.label";

                return (
                  <button
                    key={ed}
                    type="button"
                    onClick={() => setActive(ed)}
                    aria-pressed={isActive}
                    aria-label={t(ariaKey as any)}
                    className={cn(
                      "group flex flex-col items-center gap-2 transition-transform duration-300",
                      isActive
                        ? "scale-110"
                        : "opacity-75 hover:opacity-100 hover:scale-105",
                    )}
                  >
                    <span
                      className={cn(
                        "size-14 sm:size-16 rounded-full border-2 flex items-center justify-center font-heading font-medium text-sm sm:text-base tracking-[0.15em] transition-all duration-500",
                        isActive
                          ? "border-secondary-500 bg-secondary-100 text-primary-950 shadow-lg shadow-secondary-300/50"
                          : "border-primary-400 bg-transparent text-primary-700 group-hover:border-secondary-500",
                      )}
                    >
                      {ed === "audio" ? (
                        <Headphones className="w-5 h-5" />
                      ) : (
                        ed.toUpperCase()
                      )}
                    </span>
                    <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-primary-700 font-sans font-medium">
                      {t(labelKey as any)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="w-full max-w-lg relative">
            <div
              aria-hidden
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,var(--color-secondary-200)_0%,transparent_62%)] opacity-[0.45] blur-[60px] mix-blend-multiply pointer-events-none"
            />
            <div className="relative h-100 sm:h-125 md:h-150 lg:h-175 w-full">
              <Book3D edition={bookEdition} />

              <div
                ref={audioBadgeRef}
                aria-hidden={!showAudioBadge}
                className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 pointer-events-none opacity-0"
              >
                <div className="inline-flex items-center gap-2 rounded-full bg-primary-950/90 backdrop-blur-sm px-5 py-2.5 shadow-lg">
                  <Headphones className="w-5 h-5 text-secondary-300" />
                  <span className="text-sm font-sans text-white tracking-wide">
                    {t("book.audio.badge")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
