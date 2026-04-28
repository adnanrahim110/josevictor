"use client";

import { Container } from "@/components/ui/container";
import { Title } from "@/components/ui/title";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { Button } from "../ui/button";

export function BillPay() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section
      ref={containerRef}
      className="relative flex items-center justify-center min-h-[60vh] py-32 overflow-hidden"
    >
      <motion.div style={{ y }} className="absolute inset-0 z-0 scale-[1.2]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-neutral-950/70 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
      </motion.div>

      <Container className="relative z-10 flex flex-col items-center justify-center text-center">
        <div className="mb-12">
          <Title
            as="h2"
            className="text-5xl md:text-6xl lg:text-7xl text-white font-light tracking-wider"
          >
            Online Bill Pay
          </Title>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <Button href="/bill-pay">PAY NOW</Button>
        </motion.div>
      </Container>
    </section>
  );
}
