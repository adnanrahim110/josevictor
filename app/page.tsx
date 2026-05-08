import { HomeHero } from "@/components/home/home-hero";
import { PurposeMessage } from "@/components/home/purpose-message";
import { BookShowcase } from "@/components/home/book-showcase";
import { Differentiation } from "@/components/home/differentiation";
import { ServicesOverview } from "@/components/home/services-overview";
import { ImpactTestimonials } from "@/components/home/impact-testimonials";
import { AboutJove } from "@/components/home/about-jove";
import { FinalCta } from "@/components/home/final-cta";

export default function Home() {
  return (
    <main className="relative flex flex-col min-h-screen">
      <HomeHero />
      <PurposeMessage />
      <BookShowcase />
      <Differentiation />
      <ServicesOverview />
      <ImpactTestimonials />
      <AboutJove />
      <FinalCta />
    </main>
  );
}
