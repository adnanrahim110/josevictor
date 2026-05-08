"use client";

import { Container } from "@/components/ui/container";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const points = [
  "Clarify vision and direction",
  "Make better decisions",
  "Align teams",
  "Turn ideas into action",
];

export function Differentiation() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bulletsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(imageRef.current,
        { scale: 1.15 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: containerRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
        },
      );

      gsap.from(cardRef.current?.children ?? [], {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: cardRef.current, start: "top 78%", once: true },
      });

      gsap.from(bulletsRef.current?.children ?? [], {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: bulletsRef.current, start: "top 80%", once: true },
      });
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="how-i-work"
      className="relative w-full overflow-hidden scroll-mt-24 py-24 md:py-32"
    >
      <Container className="relative z-10">
        <div
          ref={cardRef}
          className="relative overflow-hidden rounded-[32px] md:rounded-[48px] p-8 md:p-14 lg:p-20 text-white shadow-2xl shadow-primary-950/20"
        >
          <div aria-hidden="true" className="absolute inset-0 bg-primary-950 -z-10" />
          <div
            ref={imageRef}
            className="absolute inset-0 w-full h-full -z-10 opacity-40 will-change-transform"
          >
            <Image
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1920&q=80"
              alt="Strategic workshop session"
              fill
              className="object-cover"
            />
          </div>
          <div aria-hidden="true" className="absolute inset-0 bg-primary-950/30 -z-10" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold mb-6">
            This is not traditional consulting.
          </h2>
          <p className="text-lg md:text-xl text-primary-200 leading-relaxed mb-10 max-w-2xl">
            My approach combines strategy, structured thinking, and immersive experiences like{" "}
            <strong className="text-white font-semibold">LEGO® Serious Play®</strong> to help you:
          </p>

          <div ref={bulletsRef} className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            {points.map((point, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-secondary-300" />
                </div>
                <span className="text-base md:text-lg font-medium">{point}</span>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border-l-4 border-secondary-500 max-w-3xl">
            <p className="text-lg md:text-xl font-medium italic text-primary-100">
              This is not about more information. It’s about clarity—and execution.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
