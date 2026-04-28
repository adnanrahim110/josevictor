"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Title } from "@/components/ui/title";
import { motion } from "framer-motion";
import { ArrowRight, Blocks, Briefcase, Heart } from "lucide-react";
import Link from "next/link";

export function Services() {
  const services = [
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Business Strategy & Admin Support",
      description:
        "Streamline operations, develop long-term strategic plans, and apply for funding or manage federal grants.",
      href: "/services/business",
      themeBg: "bg-primary-900",
      iconColor: "text-primary-900",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Virtual Social & Mental Health",
      description:
        "Receive virtual support and wellness services to align your team and culture.",
      href: "/services/social",
      themeBg: "bg-secondary-600",
      iconColor: "text-secondary-600",
    },
    {
      icon: <Blocks className="w-8 h-8" />,
      title: "Workshops with LEGO SERIOUS PLAY",
      description:
        "Innovative workshops to facilitate communication, problem-solving, and team alignment.",
      href: "/services/lego",
      themeBg: "bg-primary-600",
      iconColor: "text-primary-600",
    },
  ];

  return (
    <Section className="bg-secondary-50 relative pb-32">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-3xl">
            <Title className="mb-4">Explore Our Services</Title>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-primary-800"
            >
              Every client is unique. Our services are designed to meet you
              where you are—with flexibility, empathy, and a clear path forward.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Button
              variant="outline"
              size="lg"
              className="border-primary-300 rounded-full px-8"
            >
              View All Services
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function ServiceCard({ service, index }: { service: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.7, ease: "easeOut" }}
      className="group relative bg-white rounded-4xl p-8 md:p-10 border border-primary-100 overflow-hidden min-h-100 flex flex-col cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-primary-900/10 transition-shadow duration-500"
    >
      <div className="relative z-10 flex flex-col h-full pointer-events-none">
        <div className="flex justify-between items-start mb-12 relative">
          <div className="w-16 h-16 flex items-center justify-center relative">
            <div
              className={`absolute inset-0 rounded-full transition-all duration-500 ease-out group-hover:duration-1000 group-hover:ease-in-out z-0 ${service.themeBg} opacity-10 scale-100 group-hover:scale-[35] group-hover:opacity-100`}
            />
            <span
              className={`relative z-10 transition-colors duration-700 ${service.iconColor} group-hover:text-white`}
            >
              {service.icon}
            </span>
          </div>

          <div className="text-6xl font-heading font-light transition-colors duration-500 text-primary-100 group-hover:text-white/20">
            0{index + 1}
          </div>
        </div>

        <div className="relative z-2 h-full flex flex-col">
          <Title
            as="h3"
            className="text-2xl mb-4 transition-colors duration-500 text-primary-950 group-hover:text-white"
          >
            {service.title}
          </Title>
          <p className="leading-relaxed text-lg transition-colors duration-500 text-primary-700 group-hover:text-white/90">
            {service.description}
          </p>

          <div className="mt-auto pt-10 pointer-events-auto">
            <Link
              href={service.href}
              className="inline-flex items-center gap-4 font-medium transition-colors duration-500 text-primary-700 group/link group-hover:text-white"
            >
              <span className="relative text-lg">
                Explore Service
                <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-white transition-transform duration-500 origin-left scale-x-0 group-hover/link:scale-x-100" />
              </span>
              <div className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 bg-primary-50 text-primary-600 group-hover:bg-white group-hover:text-primary-950 group-hover/link:translate-x-2">
                <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover/link:-rotate-45" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
