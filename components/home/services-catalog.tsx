"use client";

import { Container } from "@/components/ui/container";
import { useLocale } from "@/lib/i18n";
import { motion } from "framer-motion";
import { Blocks, Brain, Heart, Network } from "lucide-react";

export function ServicesCatalog() {
  const { t } = useLocale();

  return (
    <section className="py-24 lg:py-32 bg-primary-50 border-t border-primary-100">
      <Container>
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <span className="font-heading italic text-sm tracking-[0.3em] uppercase text-primary-700/80">
            {t("services.catalog.eyebrow")}
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl text-primary-950 leading-[1.05] max-w-2xl">
            {t("services.catalog.heading")}
          </h2>
          <p className="text-primary-600 max-w-xl text-lg mt-2">
            {t("services.catalog.desc")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-3 md:col-span-2 group relative p-10 sm:p-14 rounded-[40px] bg-primary-950 text-white overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-500/20 rounded-full blur-[100px] -mr-32 -mt-32 transition-all duration-700 group-hover:bg-secondary-500/30" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-secondary-500/20 text-secondary-300 text-sm font-semibold tracking-wider uppercase mb-6 border border-secondary-500/30">
                  {t("services.catalog.lego.tag")}
                </span>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold mb-6">
                  {t("services.catalog.lego.title")}
                </h3>
                <p className="text-lg md:text-xl text-primary-200 leading-relaxed mb-8">
                  {t("services.catalog.lego.desc")}
                </p>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-[48px] bg-primary-900/50 flex items-center justify-center border border-primary-800 relative shadow-inner">
                  <div className="absolute inset-0 rounded-[48px] bg-secondary-500/5 blur-xl animate-pulse" />
                  <Blocks
                    className="w-24 h-24 sm:w-32 sm:h-32 text-secondary-400 drop-shadow-2xl transform transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <CatalogCard
            title={t("services.catalog.strategic.title")}
            desc={t("services.catalog.strategic.desc")}
            icon={<Network className="w-8 h-8" />}
            delay={0.1}
          />
          <CatalogCard
            title={t("services.catalog.leadership.title")}
            desc={t("services.catalog.leadership.desc")}
            icon={<Brain className="w-8 h-8" />}
            delay={0.2}
          />
          <CatalogCard
            title={t("services.catalog.wellness.title")}
            desc={t("services.catalog.wellness.desc")}
            icon={<Heart className="w-8 h-8" />}
            delay={0.3}
          />
        </div>
      </Container>
    </section>
  );
}

function CatalogCard({
  title,
  desc,
  icon,
  delay,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="bg-white p-8 sm:p-10 rounded-4xl border border-primary-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1 flex flex-col h-full group"
    >
      <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center text-secondary-600 mb-6 border border-primary-100 group-hover:scale-110 group-hover:bg-secondary-50 transition-all duration-500 shadow-sm">
        {icon}
      </div>
      <h4 className="text-2xl font-heading font-semibold text-primary-950 mb-4">
        {title}
      </h4>
      <p className="text-primary-600 leading-relaxed flex-1">{desc}</p>
    </motion.div>
  );
}
