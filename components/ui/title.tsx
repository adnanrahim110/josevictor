"use client";

import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion } from "framer-motion";
import React, { isValidElement, ReactNode } from "react";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface TitleProps extends Omit<HTMLMotionProps<"h2">, "children"> {
  as?: HeadingTag;
  children: ReactNode;
  delay?: number;
}

const tagStyles: Record<HeadingTag, string> = {
  h1: "text-4xl md:text-5xl lg:text-7xl font-bold",
  h2: "text-3xl md:text-4xl lg:text-5xl font-bold",
  h3: "text-xl md:text-2xl lg:text-3xl font-bold",
  h4: "text-xl md:text-2xl lg:text-3xl font-bold",
  h5: "text-lg md:text-xl lg:text-2xl font-bold",
  h6: "text-base md:text-lg lg:text-xl font-bold",
};

export function Title({
  as = "h2",
  children,
  className = "",
  delay = 0,
  ...props
}: TitleProps) {
  const Component = motion[as] as any;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay,
      },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, y: "0.25em" },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 150,
      },
    },
  };

  const splitText = (node: ReactNode): ReactNode[] | ReactNode => {
    return React.Children.map(node, (child, index) => {
      if (typeof child === "string" || typeof child === "number") {
        const words = String(child).split(/(\s+)/);
        return words.map((word, wIndex) => {
          if (word.match(/^\s+$/)) {
            return (
              <span key={`s-${index}-${wIndex}`} className="whitespace-pre">
                {word}
              </span>
            );
          }
          return (
            <span
              key={`w-${index}-${wIndex}`}
              className="inline-block whitespace-nowrap"
            >
              {word.split("").map((char, cIndex) => (
                <motion.span
                  key={`c-${index}-${wIndex}-${cIndex}`}
                  variants={charVariants}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          );
        });
      }

      if (isValidElement(child)) {
        if (child.type === "br") return child;
        return React.cloneElement(child as React.ReactElement, {
          ...(child.props as any),
          children: splitText((child.props as any).children),
        });
      }

      return child;
    });
  };

  return (
    <Component
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={cn(
        "text-primary-950 tracking-tight leading-[1.2]!",
        tagStyles[as],
        className,
      )}
      {...props}
    >
      {splitText(children)}
    </Component>
  );
}
