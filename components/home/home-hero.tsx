"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Title } from "@/components/ui/title";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, BookOpen } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const imageColRef = useRef<HTMLDivElement>(null);
  const blobARef = useRef<HTMLDivElement>(null);
  const blobBRef = useRef<HTMLDivElement>(null);
  const blobCRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(textColRef.current, {
          y: -60,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom 30%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.to(imageColRef.current, {
          y: 80,
          scale: 0.94,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });

        gsap.to(blobARef.current, {
          y: 120,
          x: -40,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
        gsap.to(blobBRef.current, {
          y: 160,
          x: 30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
        gsap.to(blobCRef.current, {
          y: 200,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });

        gsap.fromTo(
          hintRef.current,
          { opacity: 0, y: -8 },
          { opacity: 1, y: 0, duration: 0.6, delay: 1.2, ease: "power2.out" },
        );
        gsap.to(hintRef.current?.querySelector(".hint-line") ?? null, {
          scaleY: 0.4,
          transformOrigin: "top",
          duration: 1.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.2,
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative pt-32 pb-24 md:pt-32 md:pb-32 overflow-hidden z-0 min-h-screen flex items-center"
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <motion.div
          ref={blobARef}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute -top-40 -left-40 size-150 rounded-full bg-primary-200/50 mix-blend-multiply will-change-transform"
        />
      </div>

      <Container className="grid grid-cols-1 lg:grid-cols-[auto_45%] gap-16 lg:gap-12 items-center relative z-10">
        <div
          ref={textColRef}
          className="flex flex-col space-y-8 z-10 will-change-transform"
        >
          <Title as="h1">
            Live. Love. Learn.
            <br />
            <span className="text-secondary-600 italic font-light">
              You are not lost...
              <br className="hidden md:block" /> you are becoming.
            </span>
          </Title>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="text-lg md:text-xl text-primary-800 max-w-lg leading-relaxed"
          >
            Strategy, purpose, and transformation for individuals and
            organizations ready to evolve.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            className="flex flex-wrap items-start gap-4 pt-2"
          >
            <Button
              href="#book"
              size="lg"
              className="bg-primary-950 text-white border-2 border-primary-950 hover:bg-secondary-600 min-w-56 shadow-xl shadow-primary-950/20"
              icon={<BookOpen className="w-5 h-5" />}
              iconPosition="start"
            >
              Explore the Book
            </Button>
            <Button
              href="/contact"
              size="lg"
              variant="outline"
              className="border-primary-950 text-primary-950 min-w-56 bg-white/40 backdrop-blur-sm"
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="end"
            >
              Work With Me
            </Button>
          </motion.div>
        </div>

        <motion.div
          ref={imageColRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="relative -right-5 w-[120%] aspect-4/3.5 z-10 will-change-transform"
        >
          <motion.div
            ref={blobBRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            className="absolute top-0 -right-20 size-80 rounded-[70%_30%_61%_39%/48%_53%_47%_52%] bg-secondary-200/60 mix-blend-multiply will-change-transform"
          />
          <div
            ref={blobCRef}
            className="absolute bottom-2 left-0 w-64 h-64 rounded-[70%_30%_61%_39%/48%_53%_47%_52%] bg-secondary-200/80 -z-10 will-change-transform"
          />
          <div className="absolute -bottom-8 -right-8 w-72 h-72 rounded-[70%_30%_61%_39%/48%_53%_47%_52%] bg-primary-200/80 -z-10" />

          <div className="relative w-full h-full rounded-[55%_45%_50%_50%/58%_53%_47%_42%] overflow-hidden shadow-2xl bg-primary-100">
            <Image
              src="https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&q=80&w=1200"
              alt="Quiet workspace inviting reflection"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      </Container>

      <div
        ref={hintRef}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 pointer-events-none"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-primary-600 font-semibold">
          Scroll
        </span>
        <div className="hint-line w-px h-10 bg-linear-to-b from-primary-700 to-transparent origin-top" />
      </div>
    </section>
  );
}
