"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Title } from "@/components/ui/title";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function HowWeHelp() {
  const helps = [
    "Streamline operations",
    "Apply for funding or manage federal grants",
    "Align your team and culture",
    "Develop a long-term strategic plan",
    "Receive virtual support or wellness services",
  ];

  return (
    <Section className="bg-secondary-100/50 relative overflow-hidden">
      <Container className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12">
        {/* Left Column: List */}
        <div className="flex flex-col space-y-8">
          <Title className="text-primary-950">
            How We Help
          </Title>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-primary-800"
          >
            Whether you need to:
          </motion.p>

          <div className="flex flex-col space-y-4">
            {helps.map((help, index) => (
              <motion.div
                key={help}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-start space-x-3"
              >
                <CheckCircle2 className="w-6 h-6 text-primary-600 shrink-0 mt-0.5" />
                <span className="text-lg text-primary-900 leading-relaxed">
                  {help}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="text-lg text-primary-800 italic pt-4"
          >
            …we’re here to support you—strategically, compassionately, and effectively.
          </motion.p>
        </div>

        {/* Right Column: Purpose Meets Practicality */}
        <div className="flex flex-col space-y-8 lg:pl-12 justify-center bg-white p-10 md:p-14 rounded-[40px] shadow-sm border border-primary-100">
          <Title as="h3" className="text-primary-950">
            Purpose Meets Practicality
          </Title>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-primary-800 leading-relaxed"
          >
            We don’t believe in one-size-fits-all solutions. Every client is unique, and our services are designed to meet you where you are—with flexibility, empathy, and a clear path forward.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg font-semibold text-primary-950"
          >
            Let us help you turn goals into growth and vision into action.
          </motion.p>
        </div>
      </Container>
    </Section>
  );
}
