import { GlobalContact } from "@/components/layout/global-contact";
import { InAssociation } from "@/components/team/in-association";
import { MissionVision } from "@/components/team/mission-vision";
import { OurApproach } from "@/components/team/our-approach";
import { TeamHero } from "@/components/team/team-hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Firm | JVJ Consulting",
  description:
    "Learn about JVJ Consulting's mission, vision, and approach. Empowering growth through strategy, compassion, and sustainability.",
};

export default function OurTeamPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <TeamHero />
      <MissionVision />
      <OurApproach />
      <InAssociation />
      <GlobalContact />
    </main>
  );
}
