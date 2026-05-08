"use client";

import { Container } from "@/components/ui/container";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ImpactTestimonials() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".impact-text", {
        opacity: 0,
        y: 30,
        duration: 0.9,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 78%", once: true },
      });

      gsap.fromTo(headlineRef.current,
        { y: 40 },
        {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        },
      );
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="impact"
      className="relative py-32 md:py-44 overflow-hidden scroll-mt-24"
    >
      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="impact-text inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-200 bg-white/80 backdrop-blur-md mb-10">
            <span className="w-2 h-2 rounded-full bg-secondary-500" />
            <span className="text-xs font-semibold tracking-widest text-primary-700 uppercase">
              The Impact
            </span>
          </div>

          <div ref={headlineRef} className="will-change-transform">
            <h2 className="impact-text text-4xl md:text-5xl lg:text-6xl font-heading font-medium text-primary-950 leading-tight mb-12">
              I’ve worked with entrepreneurs, organizations, and teams who are looking for more than growth—
              <br />
              <span className="text-secondary-700 font-semibold italic">
                they’re looking for clarity, direction, and real results.
              </span>
            </h2>
          </div>

          <div className="impact-text mt-16 pt-12 border-t border-primary-300/60 border-dashed">
            <p className="text-primary-500 uppercase tracking-widest text-xs font-semibold">
              Case studies, testimonials &amp; partner logos coming soon
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
