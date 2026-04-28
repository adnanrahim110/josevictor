"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Title } from "@/components/ui/title";
import { motion } from "framer-motion";
import { PhoneCall } from "lucide-react";
import Link from "next/link";

export function CtaSection() {
  return (
    <Section className="py-24 relative overflow-hidden">
      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto bg-primary-950 rounded-[40px] p-12 md:p-16 text-center text-white shadow-xl relative overflow-hidden">
          <div className="flex justify-center mb-8 relative z-10">
            <PhoneCall className="w-10 h-10 text-secondary-300" />
          </div>

          <Title className="text-white mb-4 relative z-10">
            Ready to begin?
          </Title>

          <p className="text-xl md:text-2xl text-primary-200 mb-10 leading-relaxed max-w-2xl">
            Because doing business with purpose isn't just possible—it's
            powerful.
          </p>

          <Link href="/contact">
            <Button
              size="lg"
              className="bg-secondary-500 text-white border-none min-w-70 h-14 text-lg rounded-full shadow-xl shadow-secondary-900/20"
            >
              Schedule a Free Consultation
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
