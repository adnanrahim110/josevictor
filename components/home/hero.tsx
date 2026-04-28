"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Title } from "@/components/ui/title";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <Section className="relative pt-32 pb-16 md:pt-32! md:pb-32 overflow-hidden bg-secondary-50 z-0">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute -top-40 -left-40 size-150 rounded-full bg-primary-200/50 mix-blend-multiply"
        />
      </div>

      <Container className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
        <div className="flex flex-col space-y-8 z-10">
          <Title as="h1">Welcome</Title>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="text-lg md:text-xl text-primary-800 max-w-lg leading-relaxed"
          >
            At JVJ Consulting LLC, we do more than offer consulting—we co-create
            solutions that empower purpose-driven people and organizations to
            thrive.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-wrap items-start gap-4 pt-4"
          >
            <Button
              size="lg"
              className="bg-primary-500 text-white min-w-60"
            >
              Schedule a Consultation
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-950 text-primary-950 min-w-60"
            >
              Discover Our Approach
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="relative -right-5 w-[120%] aspect-4/3.5 z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            className="absolute top-0 -right-20 size-80 rounded-[70%_30%_61%_39%/48%_53%_47%_52%] bg-secondary-200/60 mix-blend-multiply"
          />
          <div className="absolute bottom-2 left-0 w-64 h-64 rounded-[70%_30%_61%_39%/48%_53%_47%_52%] bg-secondary-200/80 -z-10" />
          <div className="absolute -bottom-8 -right-8 w-72 h-72 rounded-[70%_30%_61%_39%/48%_53%_47%_52%] bg-primary-200/80 -z-10" />

          <div className="relative w-full h-full rounded-[55%_45%_50%_50%/58%_53%_47%_42%] overflow-hidden shadow-2xl bg-primary-100">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1000"
              alt="Colleagues collaborating in a warm, inviting space"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
