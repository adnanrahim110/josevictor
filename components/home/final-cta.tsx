"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function FinalCta() {
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const magneticRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(contentRef.current?.children ?? [], {
        opacity: 0,
        y: 40,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 75%", once: true },
      });
    });

    mm.add("(prefers-reduced-motion: no-preference) and (pointer: fine)", () => {
      const el = magneticRef.current;
      if (!el) return;

      const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        xTo((e.clientX - cx) * 0.18);
        yTo((e.clientY - cy) * 0.18);
      };
      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);

      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <Container className="relative z-10">
        <div
          ref={cardRef}
          className="relative bg-primary-950 text-white rounded-[32px] md:rounded-[48px] p-10 md:p-20 lg:p-24 shadow-2xl shadow-primary-950/20 overflow-hidden"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-secondary-500/15 blur-[120px] rounded-full pointer-events-none" />

          <div ref={contentRef} className="relative max-w-4xl mx-auto text-center flex flex-col items-center">
            <span className="text-xs font-semibold tracking-widest text-secondary-300 uppercase mb-6">
              Your Next Step
            </span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold mb-12 leading-tight">
              If you’re ready to take your vision to the{" "}
              <span className="text-secondary-400 italic">next level</span>—
            </h2>

            <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
              <div ref={magneticRef} className="will-change-transform">
                <Button
                  href="/contact"
                  size="lg"
                  className="w-full sm:w-auto text-lg px-10 h-16 rounded-full bg-white text-primary-950 hover:bg-secondary-100 hover:text-primary-950 shadow-2xl"
                  icon={<ArrowRight className="w-5 h-5" />}
                  iconPosition="end"
                >
                  Work With Me
                </Button>
              </div>
              <Button
                href="#book"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-lg px-10 h-16 rounded-full border-2 border-primary-700 bg-transparent hover:bg-primary-800 text-white"
                icon={<BookOpen className="w-5 h-5" />}
                iconPosition="start"
              >
                Explore the Book
              </Button>
            </div>

            <p className="mt-12 text-sm text-primary-400">
              Or write to{" "}
              <a
                href="mailto:hola@jovejimenez.com"
                className="text-secondary-300 hover:text-secondary-200 underline-offset-4 hover:underline transition-colors"
              >
                hola@jovejimenez.com
              </a>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
