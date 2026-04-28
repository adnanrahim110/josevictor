"use client";

import React, { useState, useRef } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Title } from "@/components/ui/title";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Rocket, UserCircle } from "lucide-react";

export function WhoWeServe() {
  const audiences = [
    {
      icon: <Rocket className="w-8 h-8 text-primary-600 transition-colors duration-500 group-hover:text-white" />,
      title: "Entrepreneurs",
      description: "Launching and scaling with intention.",
    },
    {
      icon: <Building2 className="w-8 h-8 text-primary-600 transition-colors duration-500 group-hover:text-white" />,
      title: "Nonprofits & Community",
      description: "Navigating grants, growth, and governance.",
    },
    {
      icon: <UserCircle className="w-8 h-8 text-primary-600 transition-colors duration-500 group-hover:text-white" />,
      title: "Professionals",
      description: "Seeking strategic clarity and personal alignment.",
    },
  ];

  return (
    <Section className="bg-primary-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-secondary-200/40 blur-3xl mix-blend-multiply" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-primary-200/30 blur-3xl mix-blend-multiply" />
      </div>

      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Title className="text-center mb-4">Who We Serve</Title>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-primary-800"
          >
            We partner with purpose-driven individuals and organizations.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {audiences.map((audience, index) => (
            <HoverCard key={audience.title} audience={audience} index={index} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function HoverCard({ audience, index }: { audience: any; index: number }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.7, ease: "easeOut" }}
      className="group relative bg-white rounded-[32px] p-8 md:p-10 border border-primary-100 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-primary-900/5 hover:-translate-y-2 overflow-hidden cursor-pointer h-full flex flex-col"
    >
      {/* Interactive Cursor Spotlight */}
      <div
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle 250px at ${mousePosition.x}px ${mousePosition.y}px, rgba(126, 149, 125, 0.08), transparent 80%)`,
        }}
      />

      {/* Decorative Blob expanding on hover */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-secondary-200/50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none group-hover:scale-[2] transform-gpu" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Icon Container: Morphing effect on hover */}
        <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mb-8 transition-all duration-500 group-hover:bg-primary-600 group-hover:scale-110 group-hover:-rotate-6 group-hover:shadow-[0_10px_30px_rgba(126,149,125,0.4)]">
          {audience.icon}
        </div>

        <Title
          as="h3"
          className="text-xl mb-4 text-primary-950 transition-colors duration-300"
        >
          {audience.title}
        </Title>
        <p className="text-primary-700 leading-relaxed text-lg transition-colors duration-300 group-hover:text-primary-900">
          {audience.description}
        </p>

        {/* Slide-in Arrow Reveal */}
        <div className="mt-auto pt-10 flex items-center text-primary-600 font-medium overflow-hidden">
          <span className="transform -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 flex items-center gap-2">
            Learn more <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
