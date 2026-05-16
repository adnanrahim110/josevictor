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

interface DrawSVGProps {
  children: ReactNode;
  className?: string;
  trigger?: "scroll" | "mount";
  start?: string;
  end?: string;
  duration?: number;
  delay?: number;
  ease?: string;
  scrub?: boolean | number;
  stagger?: number;
  once?: boolean;
}

type DrawableElement = SVGPathElement | SVGLineElement | SVGPolylineElement | SVGPolygonElement | SVGCircleElement | SVGRectElement | SVGEllipseElement;

const DRAWABLE_SELECTOR = "path, line, polyline, polygon, circle, rect, ellipse";

function getLength(el: DrawableElement): number {
  if ("getTotalLength" in el && typeof el.getTotalLength === "function") {
    try {
      return el.getTotalLength();
    } catch {
      return 0;
    }
  }
  return 0;
}

export function DrawSVG({
  children,
  className,
  trigger = "scroll",
  start = "top 80%",
  end = "bottom 30%",
  duration = 1.6,
  delay = 0,
  ease = "power2.inOut",
  scrub = false,
  stagger = 0,
  once = true,
}: DrawSVGProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const paths = Array.from(el.querySelectorAll<DrawableElement>(DRAWABLE_SELECTOR));
      if (!paths.length) return;

      paths.forEach((p) => {
        const length = getLength(p);
        if (!length) return;
        p.style.strokeDasharray = `${length}`;
        p.style.strokeDashoffset = `${length}`;
      });

      if (reduce) {
        paths.forEach((p) => {
          p.style.strokeDashoffset = "0";
        });
        return;
      }

      if (trigger === "mount") {
        gsap.to(paths, {
          strokeDashoffset: 0,
          duration,
          delay,
          ease,
          stagger,
        });
        return;
      }

      if (scrub) {
        const st = ScrollTrigger.create({
          trigger: el,
          start,
          end,
          scrub: scrub === true ? 1 : scrub,
          animation: gsap.to(paths, {
            strokeDashoffset: 0,
            ease: "none",
            stagger,
          }),
        });
        return () => st.kill();
      }

      const st = ScrollTrigger.create({
        trigger: el,
        start,
        once,
        onEnter: () =>
          gsap.to(paths, {
            strokeDashoffset: 0,
            duration,
            delay,
            ease,
            stagger,
            overwrite: "auto",
          }),
      });

      return () => st.kill();
    },
    {
      scope: ref,
      dependencies: [reduce, trigger, start, end, duration, delay, ease, scrub, stagger, once],
    },
  );

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
