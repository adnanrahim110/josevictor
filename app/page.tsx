import { Appointments } from "@/components/home/appointments";
import { BillPay } from "@/components/home/bill-pay";
import { CtaSection } from "@/components/home/cta-section";
import { Features } from "@/components/home/features";
import { Hero } from "@/components/home/hero";
import { HowWeHelp } from "@/components/home/how-we-help";
import { Reviews } from "@/components/home/reviews";
import { Services } from "@/components/home/services";
import { StrategicBar } from "@/components/home/strategic-bar";
import { WhoWeServe } from "@/components/home/who-we-serve";
import { GlobalContact } from "@/components/layout/global-contact";

export default function Home() {
  return (
    <>
      <Hero />
      <StrategicBar />
      <Features />
      <WhoWeServe />
      <HowWeHelp />
      <CtaSection />
      <Services />
      <Appointments />
      <BillPay />
      <Reviews />
      <GlobalContact />
    </>
  );
}
