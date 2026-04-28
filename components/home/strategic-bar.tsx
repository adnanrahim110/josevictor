"use client";

import { motion } from "framer-motion";

export function StrategicBar() {
  const words = ["Strategy.", "Support.", "Social Impact."];
  const scrollingWords = Array(10).fill(words).flat();

  return (
    <div className="bg-primary-950 text-white py-4 border-y border-primary-900 overflow-hidden flex items-center relative pointer-events-none select-none">
      <div className="absolute z-1 pointer-events-none inset-y-0 w-20 lg:w-40 left-0 bg-linear-to-r from-primary-950 via-primary-950/50 to-transparent" />
      <div className="absolute z-1 pointer-events-none inset-y-0 w-20 lg:w-40 right-0 bg-linear-to-l from-primary-950 via-primary-950/50 to-transparent" />
      <div className="flex w-full overflow-hidden">
        <motion.div
          animate={{ x: [0, "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 24,
          }}
          className="flex flex-nowrap items-center w-max"
        >
          {scrollingWords.map((word, index) => (
            <div
              key={index}
              className="shrink-0 w-auto px-6 md:px-10 flex items-center"
            >
              <h2 className="text-lg md:text-xl lg:text-4xl leading-[1.4] font-heading tracking-wide text-primary-100 whitespace-nowrap m-0">
                {word}
              </h2>
              <span className="w-1.5 h-1.5 rounded-full bg-primary-600 ml-12 md:ml-20"></span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
