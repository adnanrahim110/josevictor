"use client";

import { Container } from "@/components/ui/container";
import { Title } from "@/components/ui/title";
import { useLocale } from "@/lib/i18n";
import { Quote } from "lucide-react";

export function BookExcerpt() {
  const { t } = useLocale();

  return (
    <section className="relative py-24 md:py-32 bg-secondary-50 overflow-hidden">
      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <div className="mb-10 text-secondary-300">
            <Quote className="w-16 h-16 md:w-24 md:h-24 opacity-50" />
          </div>
          
          <Title as="h2" className="mb-12">
            {t("book.excerpt.title")}
          </Title>
          
          <div className="space-y-8 font-heading italic text-xl sm:text-2xl md:text-3xl leading-relaxed text-primary-900">
            <p className="transition-all hover:text-primary-950">{t("book.excerpt.body1")}</p>
            <p className="transition-all hover:text-primary-950">{t("book.excerpt.body2")}</p>
            <p className="transition-all hover:text-primary-950">{t("book.excerpt.body3")}</p>
          </div>
        </div>
      </Container>
      
      {/* Decorative background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary-100 rounded-full blur-[120px] opacity-50 pointer-events-none" />
    </section>
  );
}
