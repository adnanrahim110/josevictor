"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Title } from "@/components/ui/title";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, Building, ShieldCheck, Stethoscope } from "lucide-react";
import { useRef } from "react";

const experiences = [
  {
    period: "March 2024 – Present",
    role: "Owner",
    organization: "JVJ Consulting LLC",
    location: "Toa Baja, PR",
    description:
      "A for-profit, SBA-Vet Certified business providing virtual clinical services, strategic consulting for nonprofits and small businesses, and professional wellness workshops.",
    icon: <Briefcase className="w-6 h-6" />,
    color: "bg-primary-950",
    textColor: "text-white",
    subTextColor: "text-primary-300",
  },
  {
    period: "August 2022 – Present",
    role: "Management & Program Analyst",
    organization: "USDA Office of Urban Agriculture",
    location: "Washington, DC",
    description:
      "Leading the coordination of $44.7 million in federal grants across 164 awards. Developed SOPs, manage partnerships, strategic communications, and stakeholder engagement.",
    icon: <Building className="w-6 h-6" />,
    color: "bg-primary-800",
    textColor: "text-white",
    subTextColor: "text-primary-200",
  },
  {
    period: "2017 – 2022",
    role: "Federal Service Journey",
    organization: "USDA OUAIP, NRCS & OPD",
    location: "Various",
    description:
      "Progressed from Student Trainee Soil Conservationist to Admin Support Specialist, acting as a vital conduit between communities and institutions.",
    icon: <Building className="w-6 h-6" />,
    color: "bg-primary-600",
    textColor: "text-white",
    subTextColor: "text-primary-100",
  },
  {
    period: "2014 – 2017",
    role: "Office Administrator",
    organization: "Veterinary Hospital",
    location: "Tysons Corner, VA",
    description:
      "Oversaw administrative operations, managing patient records and scheduling in a high-demand, compassionate environment.",
    icon: <Stethoscope className="w-6 h-6" />,
    color: "bg-secondary-100",
    textColor: "text-primary-950",
    subTextColor: "text-primary-700",
  },
  {
    period: "2004 – 2012",
    role: "Military Service",
    organization: "U.S. Armed Forces",
    location: "Global",
    description:
      "Developed strong leadership, discipline, and operational skills. Managed high-pressure situations and diverse teams, building adaptability for dynamic environments.",
    icon: <ShieldCheck className="w-6 h-6" />,
    color: "bg-primary-50",
    textColor: "text-primary-950",
    subTextColor: "text-primary-700",
  },
];

export function ExperienceTimeline() {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-55%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-primary-50">
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden pt-24 pb-12">
        <Container className="mb-12 shrink-0">
          <div className="flex flex-col md:flex-row items-end justify-between gap-6">
            <div>
              <span className="text-sm font-semibold tracking-[0.2em] text-primary-500 uppercase mb-4 block">
                Experience
              </span>
              <Title className="max-w-xl text-5xl">Professional Journey</Title>
            </div>
            <p className="text-primary-600 max-w-lg text-lg md:text-right">
              A diverse career path shaping a unique, holistic approach to
              administration and care. Keep scrolling to explore.
            </p>
          </div>
        </Container>

        <div className="flex-1 relative flex items-center">
          <motion.div
            style={{ x }}
            className="flex gap-8 px-4 md:px-8 xl:px-[10vw]"
          >
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`group relative flex flex-col justify-between w-[85vw] md:w-150 h-110 shrink-0 rounded-3xl p-10 md:p-10 overflow-hidden border border-primary-100 shadow-xl ${exp.color} ${exp.textColor}`}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-linear-to-br from-white/10 to-transparent pointer-events-none" />

                <div className="relative z-10 flex justify-between items-start mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
                    {exp.icon}
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-sm font-bold tracking-widest uppercase block ${exp.textColor === "text-white" ? "text-secondary-400" : "text-primary-600"}`}
                    >
                      {exp.period}
                    </span>
                    <span
                      className={`text-sm font-medium opacity-80 block mt-1 ${exp.subTextColor}`}
                    >
                      {exp.location}
                    </span>
                  </div>
                </div>

                <div className="relative z-10">
                  <h4 className="text-3xl md:text-[32px] font-heading font-semibold leading-[1.1] mb-3">
                    {exp.role}
                  </h4>
                  <p
                    className={`font-medium text-lg mb-6 ${exp.textColor === "text-white" ? "text-primary-200" : "text-primary-600"}`}
                  >
                    {exp.organization}
                  </p>
                  <div className="w-full h-px bg-current opacity-20 mb-6" />
                  <p
                    className={`text-base leading-relaxed ${exp.subTextColor}`}
                  >
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
