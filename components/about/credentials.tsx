"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Title } from "@/components/ui/title";
import { motion } from "framer-motion";
import { Award, BookOpen, FileBadge, GraduationCap } from "lucide-react";

export function Credentials() {
  const credentials = [
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Doctorate in Business Administration (ABD)",
      subtitle: "Dissertation in progress",
      color: "bg-primary-50 text-primary-700 border-primary-200",
      iconColor: "text-primary-600 bg-white",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Master’s Degree",
      subtitle: "Clinical Social Work (MSW)",
      color: "bg-secondary-50 text-secondary-900 border-secondary-200",
      iconColor: "text-secondary-600 bg-white",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Licensed Clinical Social Worker",
      subtitle: "License #16384 – Puerto Rico",
      color: "bg-primary-950 text-white border-primary-800",
      iconColor: "text-primary-300 bg-primary-900",
    },
    {
      icon: <FileBadge className="w-6 h-6" />,
      title: "Federal Certifications",
      subtitle: "Grants Management Certificate Program (GMCP)",
      color: "bg-white text-primary-950 border-primary-100",
      iconColor: "text-primary-600 bg-primary-50",
    },
  ];

  return (
    <Section className="py-24 bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-1 flex flex-col justify-center">
            <Title className="mb-6">Education &<br/>Credentials</Title>
            <p className="text-primary-600 leading-relaxed mb-8">
              A solid foundation of academic excellence and professional certifications ensuring the highest standards of strategic and clinical support.
            </p>
            <ul className="space-y-3 text-sm text-primary-700 font-medium">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-500" />
                Bachelor’s Degree in Psychology
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-500" />
                Public Events Producer (#1207-05) – PR
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {credentials.map((cred, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${cred.color}`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-sm ${cred.iconColor}`}>
                  {cred.icon}
                </div>
                <h4 className="font-heading font-semibold text-xl mb-2">{cred.title}</h4>
                <p className="text-sm opacity-80">{cred.subtitle}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </Container>
    </Section>
  );
}
