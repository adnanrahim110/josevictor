"use client";

import { Container } from "@/components/ui/container";
import { Title } from "@/components/ui/title";
import { useLocale } from "@/lib/i18n";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Philosophy() {
  const { t } = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section
      ref={containerRef}
      aria-label={t("aboutPage.framework.aria.section")}
      className="relative overflow-hidden bg-primary-50 py-24 lg:py-32"
    >
      <motion.div
        style={{ y: y1 }}
        className="absolute top-[20%] left-[5%] w-64 h-64 border border-secondary-200 rounded-full opacity-50"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-[20%] right-[5%] w-96 h-96 border border-primary-200 rounded-full opacity-50"
      />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm font-semibold tracking-[0.2em] text-primary-500 uppercase mb-6 block">
              {t("aboutPage.framework.eyebrow")}
            </span>
            <Title className="text-3xl md:text-4xl lg:text-5xl leading-tight mb-8 text-primary-950">
              {t("aboutPage.framework.heading")}
            </Title>
            <p className="font-heading text-2xl md:text-3xl italic text-secondary-700 leading-snug">
              {t("aboutPage.framework.quote")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left mt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-heading font-semibold text-primary-900">
                {t("aboutPage.framework.holistic.title")}
              </h3>
              <p className="text-primary-700 leading-relaxed">
                {t("aboutPage.framework.holistic.body")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-heading font-semibold text-primary-900">
                {t("aboutPage.framework.growth.title")}
              </h3>
              <p className="text-primary-700 leading-relaxed">
                {t("aboutPage.framework.growth.body")}
              </p>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
