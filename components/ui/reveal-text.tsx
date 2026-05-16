"use client";

import { ComponentType, ElementType, ReactNode, Ref, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type SplitMode = "word" | "line" | "char";

interface RevealTextProps {
  as?: ElementType;
  children: string;
  splitBy?: SplitMode;
  className?: string;
  innerClassName?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  ease?: string;
  trigger?: "scroll" | "mount";
  start?: string;
  once?: boolean;
}

type LooseProps = {
  ref?: Ref<HTMLElement>;
  className?: string;
  children?: ReactNode;
};

function splitText(text: string, mode: SplitMode): string[] {
  if (mode === "char") return Array.from(text);
  if (mode === "line") return text.split("\n");
  return text.split(" ");
}

export function RevealText({
  as = "span",
  children,
  splitBy = "word",
  className,
  innerClassName,
  delay = 0,
  stagger = 0.06,
  duration = 0.9,
  ease = "power3.out",
  trigger = "scroll",
  start = "top 85%",
  once = true,
}: RevealTextProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const reduce = usePrefersReducedMotion();
  const parts = splitText(children, splitBy);

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      const inners = el.querySelectorAll<HTMLElement>(".reveal-inner");
      if (!inners.length) return;

      if (reduce) {
        gsap.set(inners, { yPercent: 0, opacity: 1 });
        return;
      }

      gsap.set(inners, { yPercent: 110, opacity: 0 });

      const animate = () =>
        gsap.to(inners, {
          yPercent: 0,
          opacity: 1,
          duration,
          stagger,
          ease,
          delay,
          overwrite: "auto",
        });

      if (trigger === "mount") {
        animate();
        return;
      }

      const st = ScrollTrigger.create({
        trigger: el,
        start,
        once,
        onEnter: () => animate(),
      });

      return () => st.kill();
    },
    {
      scope: containerRef,
      dependencies: [children, splitBy, reduce, trigger, delay, stagger, duration, ease, start, once],
    },
  );

  const Tag = as as unknown as ComponentType<LooseProps>;

  return (
    <Tag ref={containerRef} className={cn("inline-block", className)}>
      {parts.map((part, i) => {
        const isWord = splitBy === "word";
        const isLine = splitBy === "line";
        const trailing = isWord && i < parts.length - 1 ? " " : "";
        return (
          <span key={`${i}-${part}`} className="inline">
            <span
              className={cn(
                "inline-block overflow-hidden align-baseline",
                isLine && "block w-full",
              )}
            >
              <span
                className={cn(
                  "reveal-inner inline-block will-change-transform",
                  innerClassName,
                )}
              >
                {part === "" ? "\u00A0" : part}
              </span>
            </span>
            {trailing}
          </span>
        );
      })}
    </Tag>
  );
}
