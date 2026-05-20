import { HomeHero } from "@/components/home/home-hero";
import { PurposeMessage } from "@/components/home/purpose-message";
import dynamic from "next/dynamic";

const BookShowcase = dynamic(() =>
  import("@/components/home/book-showcase").then((m) => ({
    default: m.BookShowcase,
  })),
);
const Differentiation = dynamic(() =>
  import("@/components/home/differentiation").then((m) => ({
    default: m.Differentiation,
  })),
);
const ServicesOverview = dynamic(() =>
  import("@/components/home/services-overview").then((m) => ({
    default: m.ServicesOverview,
  })),
);
const ServicesCatalog = dynamic(() =>
  import("@/components/home/services-catalog").then((m) => ({
    default: m.ServicesCatalog,
  })),
);
const ImpactTestimonials = dynamic(() =>
  import("@/components/home/impact-testimonials").then((m) => ({
    default: m.ImpactTestimonials,
  })),
);
const AboutJove = dynamic(() =>
  import("@/components/home/about-jove").then((m) => ({
    default: m.AboutJove,
  })),
);
const FinalCta = dynamic(() =>
  import("@/components/home/final-cta").then((m) => ({
    default: m.FinalCta,
  })),
);

import { RealisticPlantBackground } from "@/components/home/realistic-plant";

export default function Home() {
  return (
    <main
      id="main-content"
      className="relative flex flex-col min-h-screen"
    >
      <RealisticPlantBackground />
      <HomeHero />
      <PurposeMessage />
      <BookShowcase />
      <Differentiation />
      <ServicesOverview />
      <ServicesCatalog />
      <ImpactTestimonials />
      <AboutJove />
      <FinalCta />
    </main>
  );
}
