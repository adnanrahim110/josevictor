"use client";

import { ReactNode, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** -1 to 1. Negative moves opposite scroll (rises faster), positive moves with scroll (lags). */
  speed?: number;
  axis?: "y" | "x";
  start?: string;
  end?: string;
}

export function Parallax({
  children,
  className,
  speed = -0.2,
  axis = "y",
  start = "top bottom",
  end = "bottom top",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduce) return;

      const prop = axis === "y" ? "yPercent" : "xPercent";
      const tween = gsap.fromTo(
        el,
        { [prop]: 0 },
        {
          [prop]: speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub: true,
          },
        },
      );

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    {
      scope: ref,
      dependencies: [reduce, speed, axis, start, end],
    },
  );

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
