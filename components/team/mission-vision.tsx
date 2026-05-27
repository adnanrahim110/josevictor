"use client";

import { Container } from "@/components/ui/container";
import { useLocale } from "@/lib/i18n";
import { motion, useScroll, useTransform } from "framer-motion";
import { Lightbulb, Target } from "lucide-react";
import { useRef } from "react";

import { Title } from "@/components/ui/title";

export function MissionVision() {
  const { t } = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#f8fafc", "#f1f5f9", "#f8fafc"],
  );

  return (
    <motion.section
      style={{ backgroundColor }}
      className="relative py-24 lg:py-32"
      ref={containerRef}
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div className="lg:sticky lg:top-32 h-fit">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            >
              <span className="text-sm font-semibold tracking-[0.2em] text-primary-500 uppercase mb-6 block">
                {t("aboutPage.foundation.eyebrow")}
              </span>
              <Title className="text-5xl md:text-6xl mb-8 text-primary-950">
                {t("aboutPage.foundation.heading")}
              </Title>
              <p className="font-heading text-2xl italic text-secondary-700 leading-snug mb-6 max-w-md">
                {t("aboutPage.foundation.quote")}
              </p>
              <p className="text-lg text-primary-600 leading-relaxed max-w-md">
                {t("aboutPage.foundation.body")}
              </p>
            </motion.div>
          </div>

          <div className="space-y-12 lg:space-y-24">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
              className="group relative p-10 md:p-14 rounded-[50px] bg-primary-950 text-white shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-500/10 rounded-full blur-[80px] -mr-32 -mt-32 group-hover:bg-secondary-500/20 transition-all duration-700" />

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-primary-800 border border-primary-700 text-secondary-400 mb-8">
                  <Target className="w-8 h-8" />
                </div>
                <h3 className="text-3xl md:text-4xl font-heading font-semibold mb-8">
                  {t("aboutPage.mission.heading")}
                </h3>
                <p className="font-heading italic text-2xl text-secondary-300 mb-6">
                  {t("aboutPage.mission.subheading")}
                </p>
                <p className="text-lg md:text-xl leading-relaxed text-primary-200">
                  {t("aboutPage.mission.body")}
                </p>
                <div className="mt-8 pt-8 border-t border-white/10">
                  <p className="text-primary-400 text-sm italic">
                    {t("aboutPage.mission.quote")}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
              className="group relative p-10 md:p-14 rounded-[50px] bg-white text-primary-950 border border-primary-100 shadow-2xl overflow-hidden"
            >
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-100 rounded-full blur-[80px] -ml-32 -mb-32 group-hover:bg-primary-200 transition-all duration-700" />

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-primary-50 border border-primary-100 text-secondary-600 mb-8">
                  <Lightbulb className="w-8 h-8" />
                </div>
                <h3 className="text-3xl md:text-4xl font-heading font-semibold mb-8">
                  {t("aboutPage.vision.heading")}
                </h3>
                <p className="font-heading italic text-2xl text-secondary-700 mb-6">
                  {t("aboutPage.vision.subheading")}
                </p>
                <p className="text-lg md:text-xl leading-relaxed text-primary-700">
                  {t("aboutPage.vision.body")}
                </p>
                <div className="mt-8 pt-8 border-t border-primary-100">
                  <p className="text-primary-500 text-sm italic">
                    {t("aboutPage.vision.quote")}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </motion.section>
  );
}
