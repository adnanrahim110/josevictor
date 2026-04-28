"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { NAV_LINKS } from "@/constants";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import * as React from "react";

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled
          ? "bg-secondary-50/80 backdrop-blur-md border-primary-200/50 py-2"
          : "bg-transparent py-5 border-transparent",
      )}
    >
      <Container className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-heading text-5xl font-bold text-primary-800 tracking-tight">
            JVJ{" "}
            <span className="font-sans text-xl font-medium tracking-normal text-primary-600">
              Consulting
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-medium text-primary-800 hover:text-secondary-600 transition-colors duration-300 ease-in-out"
            >
              {link.name}
            </Link>
          ))}
          <Button variant="default">Get Started</Button>
        </nav>

        <button
          className="md:hidden p-2 text-primary-800"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </Container>

      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-secondary-50 border-b border-primary-200 p-4 md:hidden shadow-lg">
          <nav className="flex flex-col space-y-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-medium text-primary-800 hover:text-secondary-600"
              >
                {link.name}
              </Link>
            ))}
            <Button variant="default" className="w-full mt-4">
              Get Started
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
