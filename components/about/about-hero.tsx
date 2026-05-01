"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Title } from "@/components/ui/title";
import { motion } from "framer-motion";

export function AboutHero() {
  return (
    <Section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white text-primary-950">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full bg-secondary-100/50 blur-[120px] mix-blend-multiply opacity-70" />
        <div className="absolute -bottom-1/5 -left-1/10 w-[60vw] h-[60vw] rounded-full bg-primary-100/60 blur-[100px] mix-blend-multiply opacity-60" />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-200 bg-white/80 backdrop-blur-md mb-8 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-secondary-500 animate-pulse" />
              <span className="text-xs font-semibold tracking-widest text-primary-600 uppercase">
                About Jose Victor Jimenez
              </span>
            </motion.div>

            <Title className="text-5xl md:text-6xl lg:text-7xl mb-8 leading-[1.1] text-primary-950">
              Bridging the worlds of{" "}
              <span className="text-secondary-600 italic">mental health</span>{" "}
              and strategic consulting.
            </Title>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.76, 0, 0.24, 1],
              }}
              className="text-lg md:text-xl text-primary-600 max-w-2xl leading-relaxed font-medium"
            >
              Licensed Clinical Social Worker | Strategic Consultant | Federal
              Management and Program Analyst
            </motion.p>
          </div>

          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
              className="relative aspect-4/5 rounded-3xl overflow-hidden border border-primary-100 shadow-2xl"
            >
              <div className="absolute inset-0 bg-linear-to-br from-primary-50 to-primary-100" />
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20, x: -20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.6,
                ease: [0.76, 0, 0.24, 1],
              }}
              className="absolute -bottom-6 -left-6 md:-left-12 bg-white rounded-2xl p-6 shadow-xl border border-primary-100 max-w-60"
            >
              <p className="text-sm font-bold text-primary-950 mb-1 font-heading">
                Dual-Impact Approach
              </p>
              <p className="text-xs text-primary-600 leading-relaxed">
                Empowering communities, elevating businesses, and supporting
                individuals.
              </p>
            </motion.div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
