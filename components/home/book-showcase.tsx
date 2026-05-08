"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Headphones } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface BookProps {
  language: string;
  title: string;
  accent: string;
  bg: string;
  small?: string;
}

function BookCover({ language, title, accent, bg, small }: BookProps) {
  return (
    <div
      className="relative w-full h-full rounded-lg shadow-2xl overflow-hidden ring-1 ring-white/10"
      style={{ background: bg }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/40" />
      <div className="absolute top-0 bottom-0 left-3 w-px bg-white/20" />
      <div className="absolute top-0 bottom-0 left-2 w-px bg-white/10" />
      <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-7">
        <span
          className="text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase"
          style={{ color: accent }}
        >
          {language}
        </span>
        <div>
          <h3 className="font-heading text-xl md:text-3xl font-semibold text-white leading-tight mb-2">
            {title}
          </h3>
          <div className="h-px w-10 mb-3" style={{ backgroundColor: accent }} />
          <p className="text-[10px] md:text-xs uppercase tracking-widest text-white/70">
            J. V. Jiménez
          </p>
        </div>
        {small && (
          <p className="absolute bottom-4 right-5 text-[9px] uppercase tracking-widest text-white/40">
            {small}
          </p>
        )}
      </div>
    </div>
  );
}

export function BookShowcase() {
  const containerRef = useRef<HTMLElement>(null);
  const leftBookRef = useRef<HTMLDivElement>(null);
  const centerBookRef = useRef<HTMLDivElement>(null);
  const rightBookRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(leftBookRef.current,
        { y: 40 },
        {
          y: -30,
          ease: "none",
          scrollTrigger: { trigger: containerRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
        },
      );
      gsap.fromTo(centerBookRef.current,
        { y: 70 },
        {
          y: -50,
          ease: "none",
          scrollTrigger: { trigger: containerRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
        },
      );
      gsap.fromTo(rightBookRef.current,
        { y: 20 },
        {
          y: -15,
          ease: "none",
          scrollTrigger: { trigger: containerRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
        },
      );

      gsap.to([leftBookRef.current, rightBookRef.current], {
        y: "+=8",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.6,
      });

      gsap.from(copyRef.current?.children ?? [], {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: copyRef.current, start: "top 80%", once: true },
      });
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="book"
      className="relative py-24 md:py-32 overflow-hidden scroll-mt-24"
    >
      <Container className="relative z-10">
        <div className="bg-primary-950 text-white rounded-[32px] md:rounded-[48px] p-8 md:p-16 lg:p-20 shadow-2xl shadow-primary-950/20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center overflow-hidden">
          <div className="relative h-[500px] md:h-[580px] w-full flex justify-center items-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-md bg-secondary-500/20 blur-[100px] rounded-full pointer-events-none" />

            <div
              ref={leftBookRef}
              className="absolute left-[2%] top-[18%] w-[36%] aspect-[2/3] z-10 -rotate-6 will-change-transform"
            >
              <BookCover
                language="Español"
                title="Vivir, Amar, Aprender"
                accent="#dda742"
                bg="linear-gradient(160deg, #4a5b4c 0%, #161e15 100%)"
              />
            </div>

            <div
              ref={centerBookRef}
              className="absolute left-1/2 -translate-x-1/2 top-[6%] w-[44%] aspect-[2/3] z-30 will-change-transform"
            >
              <BookCover
                language="English Edition"
                title="Live. Love. Learn."
                accent="#edd79a"
                bg="linear-gradient(165deg, #090d08 0%, #4a5b4c 100%)"
                small="A New Edition"
              />
            </div>

            <div
              ref={rightBookRef}
              className="absolute right-[2%] top-[28%] w-[36%] aspect-square z-20 rotate-6 will-change-transform"
            >
              <div
                className="relative w-full h-full rounded-2xl shadow-2xl overflow-hidden ring-1 ring-white/10"
                style={{ background: "linear-gradient(140deg, #161e15 0%, #4a5b4c 100%)" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/40" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                  <Headphones className="w-12 h-12 md:w-14 md:h-14 text-secondary-300 mb-3" />
                  <span className="text-xs md:text-sm font-bold tracking-widest text-white">AUDIOBOOK</span>
                  <span className="mt-2 text-[10px] uppercase tracking-widest text-white/60">
                    Now Streaming
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div ref={copyRef} className="flex flex-col justify-center">
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary-700 bg-primary-900/50 w-fit">
              <span className="text-xs font-semibold tracking-widest text-secondary-300 uppercase">
                The New Book
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold mb-6 leading-tight">
              An invitation to think deeper, live intentionally, and build a life that truly matters.
            </h2>
            <div className="w-16 h-1 bg-secondary-500 mb-8" />
            <p className="text-xl text-primary-200 font-medium mb-3">This is not theory.</p>
            <p className="text-lg text-primary-300 leading-relaxed mb-10 max-w-lg">
              It’s reflection, structure, and transformation. Discover the framework to bridge the gap between where you are and the life you are actively becoming.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button
                href="https://www.amazon.com"
                size="lg"
                className="w-full sm:w-auto text-base px-8 h-14 rounded-full bg-secondary-500 text-white hover:bg-secondary-600"
                icon={<BookOpen className="w-5 h-5" />}
                iconPosition="start"
              >
                Buy the Book on Amazon
              </Button>
              <Button
                href="#"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-base px-8 h-14 rounded-full border-2 border-primary-700 bg-transparent hover:bg-primary-800 text-white"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="end"
              >
                Read an Excerpt
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

