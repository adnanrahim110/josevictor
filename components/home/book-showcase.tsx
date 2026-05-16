"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { RevealText } from "@/components/ui/reveal-text";
import {
  BOOK,
  type BookEdition,
  type BookMedallion,
} from "@/constants/content/book";
import { useLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight, BookOpen, Headphones, X } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const Book3D = dynamic(
  () => import("./book-3d").then((m) => ({ default: m.Book3D })),
  { ssr: false, loading: () => null },
);

const MEDALLIONS: readonly BookMedallion[] = ["en", "es", "audio"] as const;

export function BookShowcase() {
  const { locale, t } = useLocale();
  const [active, setActive] = useState<BookMedallion>(locale);
  const [excerptOpen, setExcerptOpen] = useState(false);
  const audioBadgeRef = useRef<HTMLDivElement>(null);

  const bookEdition: BookEdition = active === "audio" ? locale : active;
  const showAudioBadge = active === "audio";

  // Audio badge fade in/out
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
      id="book"
      aria-label={t("book.aria.section")}
      className="relative py-20 md:py-28 lg:py-32 overflow-hidden scroll-mt-24"
    >
      <Container className="relative z-10">
        <div className="grid items-center gap-12 md:gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16 xl:gap-20">
          <div className="order-2 flex flex-col items-center gap-8 lg:order-1 lg:gap-10">
            <div
              role="img"
              aria-label={t("book.aria.canvas")}
              className="relative h-[360px] w-full max-w-xl sm:h-[520px] md:h-[600px] lg:h-[640px]"
            >
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,var(--color-secondary-200)_0%,transparent_62%)] opacity-[0.55] blur-[50px] mix-blend-multiply"
              />

              <div className="absolute inset-0">
                <Book3D edition={bookEdition} />
              </div>

              <div
                ref={audioBadgeRef}
                aria-hidden={!showAudioBadge}
                className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 pointer-events-none opacity-0"
              >
                <div className="inline-flex items-center gap-2 rounded-full bg-primary-950/90 backdrop-blur-sm px-4 py-2 shadow-lg">
                  <Headphones className="w-4 h-4 text-secondary-300" />
                  <span className="text-xs sm:text-sm font-sans text-white tracking-wide">
                    {t("book.audio.badge")}
                  </span>
                </div>
              </div>
            </div>

            <div
              role="group"
              aria-label={t("book.aria.section")}
              className="flex items-center justify-center gap-5 sm:gap-8"
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
                    aria-label={t(ariaKey)}
                    className={cn(
                      "group flex flex-col items-center gap-2 transition-transform duration-300",
                      isActive ? "scale-110" : "opacity-75 hover:opacity-100 hover:scale-105",
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
                      {t(labelKey)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="order-1 flex flex-col items-center text-center lg:order-2 lg:items-start lg:text-left">
            <span className="font-heading italic text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.35em] uppercase text-primary-700/80">
              {t("book.eyebrow")}
            </span>

            <RevealText
              as="h2"
              splitBy="word"
              stagger={0.08}
              duration={0.85}
              className="mt-6 font-heading text-4xl leading-[1.02] text-primary-950 sm:text-5xl md:text-6xl"
            >
              {t("book.heading")}
            </RevealText>

            <div className="mt-6 sm:mt-8 flex max-w-3xl flex-col items-center gap-1 lg:items-start">
              <RevealText
                as="p"
                splitBy="word"
                stagger={0.025}
                duration={0.75}
                className="font-heading text-lg sm:text-2xl md:text-3xl text-primary-900 leading-snug"
              >
                {t("book.invitation.line1")}
              </RevealText>
              <RevealText
                as="p"
                splitBy="word"
                stagger={0.03}
                duration={0.75}
                className="font-heading text-lg sm:text-2xl md:text-3xl text-primary-900 leading-snug"
              >
                {t("book.invitation.line2")}
              </RevealText>
            </div>

            <div className="mt-6 sm:mt-8 flex flex-col items-center gap-1 lg:items-start">
              <p className="font-heading italic text-base sm:text-lg md:text-xl text-secondary-700">
                {t("book.tagline.line1")}
              </p>
              <p className="font-heading text-sm sm:text-base md:text-lg text-primary-700">
                {t("book.tagline.line2")}
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row w-full sm:w-auto">
              <Button
                href={BOOK.amazonUrl}
                size="lg"
                variant="secondary"
                icon={<BookOpen className="w-5 h-5" />}
                iconPosition="start"
              >
                {t("book.cta.buy")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="end"
                onClick={() => setExcerptOpen(true)}
              >
                {t("book.cta.excerpt")}
              </Button>
            </div>
          </div>
        </div>
      </Container>

      {excerptOpen && <ExcerptOverlay onClose={() => setExcerptOpen(false)} />}
    </section>
  );
}

function ExcerptOverlay({ onClose }: { onClose: () => void }) {
  const { t } = useLocale();
  const overlayRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" },
      );
      tl.fromTo(
        sheetRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.15",
      );
    },
    { scope: overlayRef },
  );

  useEffect(() => {
    const previousActive = document.activeElement as HTMLElement | null;
    const sheet = sheetRef.current;

    const focusableSelector =
      'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const getFocusable = () =>
      sheet
        ? Array.from(sheet.querySelectorAll<HTMLElement>(focusableSelector)).filter(
            (el) => !el.hasAttribute("disabled"),
          )
        : [];

    const focusables = getFocusable();
    focusables[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !sheet) return;
      const current = getFocusable();
      if (!current.length) {
        e.preventDefault();
        return;
      }
      const first = current[0];
      const last = current[current.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey && (active === first || !sheet.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !sheet.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previousActive?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="excerpt-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-primary-950/70 backdrop-blur-sm p-4 sm:p-8 opacity-0"
    >
      <div
        ref={sheetRef}
        className="relative bg-secondary-50 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl p-8 sm:p-12 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t("book.excerpt.close")}
          className="absolute top-4 right-4 p-2 text-primary-700 hover:text-primary-900 transition-colors rounded-full hover:bg-primary-100"
        >
          <X className="w-5 h-5" />
        </button>
        <h3
          id="excerpt-title"
          className="font-heading italic text-2xl sm:text-3xl text-primary-700 mb-8 tracking-wide"
        >
          {t("book.excerpt.title")}
        </h3>
        <div className="space-y-5 sm:space-y-6 font-heading text-lg sm:text-xl leading-relaxed text-primary-900">
          <p>{t("book.excerpt.body1")}</p>
          <p>{t("book.excerpt.body2")}</p>
          <p>{t("book.excerpt.body3")}</p>
        </div>
      </div>
    </div>
  );
}
