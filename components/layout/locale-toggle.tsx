"use client";

import { useLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LocaleToggle({
  dark,
  className,
}: {
  dark?: boolean;
  className?: string;
}) {
  const { locale, setLocale, t } = useLocale();

  return (
    <div
      role="group"
      aria-label={t("common.locale.switch")}
      className={cn(
        "relative inline-flex items-center rounded-full p-[3px] transition-colors duration-500",
        dark ? "bg-white/[0.08]" : "bg-primary-200/50",
        className,
      )}
    >
      <div
        aria-hidden
        className={cn(
          "absolute top-[3px] bottom-[3px] w-[calc(50%-3px)] rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-sm",
          locale === "en" ? "left-[3px]" : "left-[calc(50%)]",
          dark ? "bg-secondary-500" : "bg-primary-800",
        )}
      />
      {(["en", "es"] as const).map((lang) => {
        const isActive = locale === lang;
        return (
          <button
            key={lang}
            type="button"
            onClick={() => setLocale(lang)}
            aria-pressed={isActive}
            className={cn(
              "relative z-10 px-3.5 py-1 text-[11px] font-bold font-sans tracking-[0.15em] uppercase rounded-full transition-colors duration-300",
              isActive
                ? dark
                  ? "text-primary-950"
                  : "text-white"
                : dark
                  ? "text-primary-400 hover:text-primary-200"
                  : "text-primary-500 hover:text-primary-800",
            )}
          >
            {lang.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
