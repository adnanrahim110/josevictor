"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { en, type Dict, type TranslationKey } from "@/constants/i18n/en/index";
import { es } from "@/constants/i18n/es/index";

export type Locale = "en" | "es";
export type { TranslationKey };

const dictionaries: Record<Locale, Dict> = { en, es };

interface LocaleContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: TranslationKey) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  children,
  initial = "en",
}: {
  children: ReactNode;
  initial?: Locale;
}) {
  const [locale, setLocale] = useState<Locale>(initial);
  const t = (key: TranslationKey): string => dictionaries[locale][key] ?? key;

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return ctx;
}
