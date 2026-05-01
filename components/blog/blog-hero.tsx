"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Title } from "@/components/ui/title";
import { motion } from "framer-motion";

export function BlogHero() {
  return (
    <Section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white text-primary-950">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -right-[5%] w-[60vw] h-[60vw] rounded-full bg-secondary-50 blur-[120px] mix-blend-multiply opacity-70" />
        <div className="absolute top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-primary-50 blur-[100px] mix-blend-multiply opacity-50" />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-200 bg-white/80 backdrop-blur-md mb-8 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-secondary-500 animate-pulse" />
            <span className="text-xs font-semibold tracking-widest text-primary-600 uppercase">
              Our Journal
            </span>
          </motion.div>

          <Title className="text-6xl md:text-7xl lg:text-8xl mb-8 leading-[0.95] tracking-tight text-primary-950">
            Insights & <br />
            <span className="text-secondary-600 italic">Perspectives</span>.
          </Title>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
            className="text-lg md:text-2xl text-primary-600 leading-relaxed font-medium max-w-3xl mx-auto"
          >
            Exploring the intersection of leadership, strategy, and human-centered growth. We share our thoughts on the future of business and wellness.
          </motion.p>
        </div>
      </Container>
    </Section>
  );
}
