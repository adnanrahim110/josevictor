import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SmoothScrolling } from "@/components/layout/smooth-scrolling";
import type { Metadata } from "next";
import { Bodoni_Moda, Outfit } from "next/font/google";
import "./globals.css";


const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni-moda",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "JVJ Consulting | Strategic Administration & Social Services",
  description: "Empathetic Guidance. Holistic Growth. Together.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${outfit.variable} ${bodoni.variable}`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-primary-950">
        <SmoothScrolling>
          <Header />
          {children}
          <Footer />
        </SmoothScrolling>
      </body>
    </html>
  );
}
