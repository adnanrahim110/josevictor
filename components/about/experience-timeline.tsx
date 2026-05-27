"use client";

import { Container } from "@/components/ui/container";
import { Title } from "@/components/ui/title";
import { useLocale } from "@/lib/i18n";
import { motion, useScroll, useTransform } from "framer-motion";
import { Award, BookOpen, FileBadge, GraduationCap } from "lucide-react";
import { useRef } from "react";

export function ExperienceTimeline() {
  const { t } = useLocale();
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-55%"]);

  const experiences = [
    {
      title: t("aboutPage.credentials.psychology.title"),
      description: t("aboutPage.credentialDetails.psychology.body"),
      icon: <GraduationCap className="w-6 h-6" />,
      color: "bg-primary-950",
      textColor: "text-white",
      subTextColor: "text-primary-300",
    },
    {
      title: t("aboutPage.credentials.sixSigma.title"),
      description: t("aboutPage.credentialDetails.sixSigma.body"),
      icon: <FileBadge className="w-6 h-6" />,
      color: "bg-primary-800",
      textColor: "text-white",
      subTextColor: "text-primary-200",
    },
    {
      title: t("aboutPage.credentials.socialWork.title"),
      description: t("aboutPage.credentialDetails.socialWork.body"),
      icon: <BookOpen className="w-6 h-6" />,
      color: "bg-secondary-100",
      textColor: "text-primary-950",
      subTextColor: "text-primary-700",
    },
    {
      title: t("aboutPage.credentials.dba.title"),
      description: t("aboutPage.credentialDetails.dba.body"),
      icon: <Award className="w-6 h-6" />,
      color: "bg-primary-50",
      textColor: "text-primary-950",
      subTextColor: "text-primary-700",
    },
  ];

  return (
    <section
      ref={targetRef}
      aria-label={t("aboutPage.credentialDetails.aria.section")}
      className="relative h-[260vh] bg-primary-50"
    >
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden pt-24 pb-12">
        <Container className="mb-12 shrink-0 lg:px-2">
          <div className="flex flex-col md:flex-row items-end justify-between gap-6">
            <div>
              <span className="text-sm font-semibold tracking-[0.2em] text-primary-500 uppercase mb-4 block">
                {t("aboutPage.credentials.heading")}
              </span>
              <Title className="max-w-3xl text-5xl">
                {t("aboutPage.credentials.heading")}
              </Title>
            </div>
            <p className="text-primary-600 max-w-lg text-lg md:text-right">
              {t("aboutPage.credentials.body")}
            </p>
          </div>
        </Container>

        <div className="flex-1 relative flex items-center">
          <motion.div
            style={{ x }}
            className="flex gap-8 px-4 md:px-8 xl:px-[10vw]"
          >
            {experiences.map((exp, index) => (
              <article
                key={exp.title}
                className={`group relative flex flex-col justify-between w-[85vw] md:w-150 min-h-110 shrink-0 rounded-3xl p-10 md:p-10 overflow-hidden border border-primary-100 shadow-xl ${exp.color} ${exp.textColor}`}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-linear-to-br from-white/10 to-transparent pointer-events-none" />

                <div className="relative z-10 flex justify-between items-start mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
                    {exp.icon}
                  </div>
                  <span
                    className={`text-sm font-bold tracking-widest uppercase block ${exp.textColor === "text-white" ? "text-secondary-400" : "text-primary-600"}`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="relative z-10">
                  <h4 className="text-3xl md:text-[32px] font-heading font-semibold leading-[1.1] mb-6">
                    {exp.title}
                  </h4>
                  <div className="w-full h-px bg-current opacity-20 mb-6" />
                  <p
                    className={`text-base leading-relaxed ${exp.subTextColor}`}
                  >
                    {exp.description}
                  </p>
                </div>
              </article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
