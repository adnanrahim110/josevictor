"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Title } from "@/components/ui/title";
import { motion } from "framer-motion";

export function Reviews() {
  return (
    <Section className="bg-primary-50 relative pb-32">
      <Container>
        <div className="text-center mb-12">
          <Title className="text-center tracking-tight text-primary-950 mb-12">
            Reviews
          </Title>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-[400px] md:h-[500px] rounded-[40px] overflow-hidden shadow-2xl"
        >
          {/* Background Image */}
          <img
            src="https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80&w=2000"
            alt="Team gathering"
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-primary-950/60 mix-blend-multiply" />

          {/* Centered Content */}
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-10 md:p-16 text-center max-w-2xl">
              <Title as="h3" className="text-white tracking-wide">
                Reviews coming soon!
              </Title>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
