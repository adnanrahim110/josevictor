"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { motion } from "framer-motion";
import Image from "next/image";

const associations = [
  {
    name: "CPTSPR",
    logo: "https://img1.wsimg.com/isteam/ip/e1313941-fe93-4d49-933e-35e3e77e83cf/CPTSPR.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=h:100,cg:true",
    link: "https://cptspr.org/",
    alt: "Logo Colegio de Profesionales del Trabajo Social de Puerto Rico",
  },
  {
    name: "COPEP",
    logo: "https://img1.wsimg.com/isteam/ip/e1313941-fe93-4d49-933e-35e3e77e83cf/COPEP%20LOGO-01.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=h:100,cg:true",
    link: "https://copep.org/",
    alt: "Logo Colegio de Productores de Espectáculos Públicos de Puerto Rico",
  },
  {
    name: "MEDESK",
    logo: "https://img1.wsimg.com/isteam/ip/e1313941-fe93-4d49-933e-35e3e77e83cf/RU66FNF61Q8L.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=h:100,cg:true",
    link: "https://www.medesk.net/es/",
    alt: "Logo de Medesk",
  },
  {
    name: "SBA",
    logo: "https://img1.wsimg.com/isteam/ip/e1313941-fe93-4d49-933e-35e3e77e83cf/SBA-SDVOSB-Logo.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=h:100,cg:true",
    link: "https://www.sba.gov/",
    alt: "Logo de SBA Service-Disabled Veteran Owned Certification",
  },
];

export function InAssociation() {
  const marqueeItems = [...associations, ...associations, ...associations];

  return (
    <Section className="py-10! bg-white border-t border-primary-50 overflow-hidden">
      <Container className="mb-12">
        <div className="text-center">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-heading font-medium text-primary-950"
          >
            In Association with
          </motion.h3>
        </div>
      </Container>

      <div className="relative flex overflow-hidden py-10">
        <motion.div
          animate={{
            x: [0, -1035],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-20 items-center whitespace-nowrap"
        >
          {marqueeItems.map((assoc, index) => (
            <motion.a
              key={index}
              href={assoc.link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative shrink-0"
            >
              <div className="relative h-12 md:h-16 w-32 md:w-48">
                <Image
                  src={assoc.logo}
                  alt={assoc.alt}
                  fill
                  className="object-contain"
                />
              </div>
            </motion.a>
          ))}
        </motion.div>

        <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-white to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-white to-transparent z-10" />
      </div>
    </Section>
  );
}
