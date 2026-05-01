import { GlobalContact } from "@/components/layout/global-contact";
import { ContactHero } from "@/components/contact/contact-hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | JVJ Consulting",
  description: "Get in touch with JVJ Consulting for administrative support and strategic solutions.",
};

export default function ContactPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <ContactHero />
      <GlobalContact />
    </main>
  );
}
