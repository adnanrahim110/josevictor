import { AboutHero } from "@/components/about/about-hero";
import { Credentials } from "@/components/about/credentials";
import { ExperienceTimeline } from "@/components/about/experience-timeline";
import { Philosophy } from "@/components/about/philosophy";
import { GlobalContact } from "@/components/layout/global-contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | JVJ Consulting",
  description:
    "Learn more about Jose Victor Jimenez, a Licensed Clinical Social Worker and Strategic Consultant dedicated to holistic growth and sustainable empowerment.",
};

export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <AboutHero />
      <Philosophy />
      <Credentials />
      <ExperienceTimeline />
      <GlobalContact />
    </main>
  );
}
