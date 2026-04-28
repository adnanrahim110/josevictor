"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { motion } from "framer-motion";
import { Title } from "../ui/title";

export function Features() {
  return (
    <Section className="bg-white relative overflow-hidden z-10">
      <Container className="grid grid-cols-1 lg:grid-cols-[40%_auto] gap-16 lg:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full h-150"
        >
          <div className="absolute inset-0 w-full h-full rounded-t-[100px] rounded-b-3xl overflow-hidden shadow-2xl bg-secondary-100">
            <img
              src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1000"
              alt="Team members discussing ideas in a bright office"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          <div className="absolute -left-12 bottom-20 w-32 h-32 rounded-full bg-primary-200/60 -z-10 mix-blend-multiply" />
        </motion.div>

        <div className="flex flex-col space-y-6 lg:pl-12">
          <Title>What Makes Us Different?</Title>

          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="text-lg md:text-xl text-primary-800 leading-relaxed"
          >
            Founded by a Licensed Clinical Social Worker and Business
            Strategist, JVJ Consulting bridges the gap between operational
            excellence and emotional intelligence. We bring a holistic approach
            that integrates business consulting, administrative systems, and
            human-centered support.
          </motion.p>
        </div>
      </Container>
    </Section>
  );
}
