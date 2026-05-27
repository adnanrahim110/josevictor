"use client";

import { Container } from "@/components/ui/container";
import { Title } from "@/components/ui/title";
import { useLocale } from "@/lib/i18n";
import {
  motion,
  type MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Ear, Presentation, Users } from "lucide-react";
import { type ReactNode, useRef } from "react";

export function OurApproach() {
  const { t } = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.1,
  });

  const steps = [
    {
      title: t("aboutPage.approach.step1.title"),
      icon: <Ear className="w-10 h-10" />,
      description: t("aboutPage.approach.step1.body"),
    },
    {
      title: t("aboutPage.approach.step2.title"),
      icon: <Presentation className="w-10 h-10" />,
      description: t("aboutPage.approach.step2.body"),
    },
    {
      title: t("aboutPage.approach.step3.title"),
      icon: <Users className="w-10 h-10" />,
      description: t("aboutPage.approach.step3.body"),
    },
  ];

  return (
    <section
      ref={containerRef}
      aria-label={t("aboutPage.approach.aria.section")}
      className="py-24 lg:py-32 bg-primary-50"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            >
              <span className="text-sm font-semibold tracking-[0.2em] text-primary-500 uppercase mb-6 block">
                {t("aboutPage.approach.eyebrow")}
              </span>
              <Title className="text-4xl lg:text-5xl mb-8 text-primary-950">
                {t("aboutPage.approach.heading")}
                <span className="block text-secondary-600 italic">
                  {t("aboutPage.approach.subheading")}
                </span>
              </Title>
              <p className="text-lg text-primary-600 leading-relaxed mb-8">
                {t("aboutPage.approach.body")}
              </p>
              <div className="p-6 bg-primary-50 border border-primary-100 rounded-3xl inline-block">
                <p className="text-primary-900 font-heading font-medium text-lg italic">
                  {t("aboutPage.approach.quote")}
                </p>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="space-y-8 relative">
              <div className="absolute left-9.75 top-10 bottom-10 w-0.5 bg-primary-200 z-0 hidden md:block">
                <motion.div
                  style={{ scaleY, originY: 0 }}
                  className="w-full h-full bg-secondary-500"
                />
              </div>

              {steps.map((step, index) => (
                <ApproachStep
                  key={step.title}
                  index={index}
                  scrollYProgress={scrollYProgress}
                  title={step.title}
                  icon={step.icon}
                  description={step.description}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ApproachStep({
  index,
  scrollYProgress,
  title,
  icon,
  description,
}: {
  index: number;
  scrollYProgress: MotionValue<number>;
  title: string;
  icon: ReactNode;
  description: string;
}) {
  const yOffset = useTransform(
    scrollYProgress,
    [0, 1],
    [50 * (index + 1), -50 * (index + 1)],
  );

  return (
    <motion.article
      style={{ y: yOffset }}
      className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-8 bg-white p-8 rounded-4xl border border-primary-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-shadow hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]"
    >
      <div className="shrink-0 w-20 h-20 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600 border border-primary-100">
        {icon}
      </div>
      <div className="flex flex-col justify-center">
        <h4 className="text-2xl font-heading font-semibold text-primary-950 mb-3">
          {title}
        </h4>
        <p className="text-primary-600 leading-relaxed">{description}</p>
      </div>
    </motion.article>
  );
}
