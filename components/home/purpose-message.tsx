"use client";

import { Container } from "@/components/ui/container";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function PurposeMessage() {
  const containerRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const outroRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
      const words = quoteRef.current?.querySelectorAll(".q-word") ?? [];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(introRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
      );
      tl.fromTo(words,
        { opacity: 0.15 },
        { opacity: 1, stagger: 0.15, duration: 1, ease: "none" },
        0.8,
      );
      tl.fromTo(outroRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        "+=0.3",
      );
    });

    mm.add("(prefers-reduced-motion: no-preference) and (max-width: 767px)", () => {
      gsap.from([introRef.current, quoteRef.current, outroRef.current], {
        opacity: 0,
        y: 30,
        duration: 0.9,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%", once: true },
      });
    });
  }, { scope: containerRef });

  const message = "Real growth happens when you align what you do with who you are.";
  const words = message.split(" ");

  return (
    <section
      ref={containerRef}
      id="purpose"
      className="relative scroll-mt-24 md:h-[200vh]"
    >
      <div className="md:sticky md:top-0 md:h-screen flex items-center justify-center py-24 md:py-0">
        <Container>
          <div className="max-w-5xl mx-auto text-center flex flex-col items-center justify-center">
            <p
              ref={introRef}
              className="text-lg md:text-xl text-primary-600 font-medium mb-10 max-w-2xl"
            >
              For years, I searched for answers in work, knowledge, and experience. But I discovered something deeper:
            </p>

            <p
              ref={quoteRef}
              className="text-3xl md:text-5xl lg:text-6xl font-heading font-semibold text-primary-950 leading-[1.15] mb-12"
            >
              {words.map((word, i) => (
                <span key={i} className="q-word inline-block mr-[0.25em]">
                  {word}
                </span>
              ))}
            </p>

            <p
              ref={outroRef}
              className="text-lg md:text-xl text-primary-600 font-medium max-w-2xl"
            >
              Today, everything I build lives at that intersection—between{" "}
              <span className="text-secondary-600 font-semibold italic">strategy</span> and{" "}
              <span className="text-secondary-600 font-semibold italic">humanity</span>.
            </p>
          </div>
        </Container>
      </div>
    </section>
  );
}
