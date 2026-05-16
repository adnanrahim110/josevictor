"use client";

import { useLocale } from "@/lib/i18n";

export function SkipLink() {
  const { t } = useLocale();
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary-950 focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:font-sans focus:text-sm focus:shadow-lg focus:outline-2 focus:outline-secondary-400 focus:outline-offset-2"
    >
      {t("common.skip")}
    </a>
  );
}
