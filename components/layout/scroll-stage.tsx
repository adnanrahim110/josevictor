"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ScrollStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const orbARef = useRef<HTMLDivElement>(null);
  const orbBRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(orbARef.current, {
          yPercent: 80,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 2,
          },
        });
        gsap.to(orbBRef.current, {
          yPercent: 110,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 2,
          },
        });
      });
    },
    { scope: stageRef },
  );

  return (
    <div
      ref={stageRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
      style={{ backgroundColor: "#fcf8ee" }}
    >
      <div
        ref={orbARef}
        className="absolute top-[-10vh] left-[-10vw] w-[60vw] h-[60vw] rounded-full blur-[120px] opacity-40 mix-blend-multiply will-change-transform"
        style={{
          background: "radial-gradient(circle, #edd79a 0%, transparent 65%)",
        }}
      />
      <div
        ref={orbBRef}
        className="absolute top-[40vh] right-[-15vw] w-[55vw] h-[55vw] rounded-full blur-[140px] opacity-30 mix-blend-multiply will-change-transform"
        style={{
          background: "radial-gradient(circle, #d0d8cf 0%, transparent 65%)",
        }}
      />
    </div>
  );
}
