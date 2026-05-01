"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Title } from "@/components/ui/title";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function TeamHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white text-primary-950" ref={containerRef}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-1/10 -right-1/20 w-[60vw] h-[60vw] rounded-full bg-secondary-50 blur-[120px] mix-blend-multiply opacity-70" />
        <div className="absolute top-1/5 -left-1/10 w-[50vw] h-[50vw] rounded-full bg-primary-50 blur-[100px] mix-blend-multiply opacity-50" />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <motion.div style={{ y: textY, opacity }} className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-200 bg-white/80 backdrop-blur-md mb-8 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-secondary-500 animate-pulse" />
              <span className="text-xs font-semibold tracking-widest text-primary-600 uppercase">
                The Firm Identity
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.76, 0, 0.24, 1],
              }}
            >
              <Title className="text-6xl md:text-7xl lg:text-8xl mb-8 leading-[0.95] tracking-tight text-primary-950">
                Strategy
                <br />
                meets
                <span className="text-secondary-600 italic"> soul</span>.
              </Title>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.76, 0, 0.24, 1],
              }}
              className="text-xl md:text-2xl text-primary-600 leading-relaxed font-medium max-w-2xl"
            >
              We are a collective vision driven by purpose, empathy, and
              sustainable growth. We believe in building forward, together.
            </motion.p>
          </motion.div>

          <motion.div style={{ y: imageY, scale }} className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                duration: 1.2,
                delay: 0.2,
                ease: [0.76, 0, 0.24, 1],
              }}
              className="relative aspect-square md:aspect-4/5 rounded-[60px] overflow-hidden shadow-2xl border border-white"
            >
              <div className="absolute inset-0 bg-primary-100" />
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center" />
              <div className="absolute inset-0 bg-linear-to-t from-primary-950/40 to-transparent" />
            </motion.div>

            <motion.div
              animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 w-32 h-32 rounded-3xl bg-secondary-100/30 backdrop-blur-xl border border-white/50 shadow-xl hidden md:block"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
