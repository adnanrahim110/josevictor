"use client";

import { Container } from "@/components/ui/container";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function AboutJove() {
  const containerRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const portraitImgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(portraitRef.current,
        { y: 60 },
        {
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        },
      );

      gsap.fromTo(portraitImgRef.current,
        { scale: 1.1 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        },
      );

      gsap.from(textRef.current?.children ?? [], {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: { trigger: textRef.current, start: "top 78%", once: true },
      });
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative py-24 md:py-32 overflow-hidden scroll-mt-24"
    >
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="relative w-full aspect-[4/5] max-w-md mx-auto lg:mx-0 lg:ml-auto">
            <div
              ref={portraitRef}
              className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl shadow-primary-950/20 will-change-transform"
            >
              <div ref={portraitImgRef} className="relative w-full h-full will-change-transform">
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=80"
                  alt="José Víctor Jiménez — Jove"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-secondary-500/50 rounded-full z-[-1]" />
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-secondary-200/40 rounded-full blur-2xl z-[-1]" />
          </div>

          <div ref={textRef} className="flex flex-col justify-center">
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary-200 bg-white/70 backdrop-blur-md w-fit">
              <span className="text-xs font-semibold tracking-widest text-primary-700 uppercase">
                About Me
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold mb-8 leading-tight text-primary-950">
              I’m José Víctor Jiménez—<span className="text-secondary-600 italic">Jove</span>.
            </h2>
            <p className="text-2xl text-primary-800 font-medium mb-6">
              Strategist, author, and facilitator.
            </p>
            <p className="text-lg text-primary-700 leading-relaxed max-w-lg">
              My work focuses on helping individuals and organizations think better, make intentional decisions, and build with purpose.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
