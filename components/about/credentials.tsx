"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Title } from "@/components/ui/title";
import { useLocale } from "@/lib/i18n";
import { motion } from "framer-motion";
import { Award, BookOpen, FileBadge, GraduationCap } from "lucide-react";

export function Credentials() {
  const { t } = useLocale();

  const credentials = [
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: t("about.credentials.card1.title"),
      subtitle: t("about.credentials.card1.subtitle"),
      color: "bg-primary-50 text-primary-700 border-primary-200",
      iconColor: "text-primary-600 bg-white",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: t("about.credentials.card2.title"),
      subtitle: t("about.credentials.card2.subtitle"),
      color: "bg-secondary-50 text-secondary-900 border-secondary-200",
      iconColor: "text-secondary-600 bg-white",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: t("about.credentials.card3.title"),
      subtitle: t("about.credentials.card3.subtitle"),
      color: "bg-primary-950 text-white border-primary-800",
      iconColor: "text-primary-300 bg-primary-900",
    },
    {
      icon: <FileBadge className="w-6 h-6" />,
      title: t("about.credentials.card4.title"),
      subtitle: t("about.credentials.card4.subtitle"),
      color: "bg-white text-primary-950 border-primary-100",
      iconColor: "text-primary-600 bg-primary-50",
    },
  ];

  return (
    <Section className="py-24 bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-1 flex flex-col justify-center">
            <Title className="mb-6">{t("about.credentials.title")}</Title>
            <p className="text-primary-600 leading-relaxed mb-8">
              {t("about.credentials.description")}
            </p>
            <ul className="space-y-3 text-sm text-primary-700 font-medium">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-500" />
                {t("about.credentials.bullet1")}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-500" />
                {t("about.credentials.bullet2")}
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
