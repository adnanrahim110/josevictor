import { Appointment, AppointmentCategory } from "@/constants/appointments";
import { motion } from "framer-motion";
import { CalendarPlus, ChevronRight } from "lucide-react";
import { useState } from "react";

export function AppointmentTicket({
  appointment,
  index,
}: {
  appointment: Appointment;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const categoryColors: Record<AppointmentCategory, string> = {
    "All Services": "bg-primary-600 text-primary-600 border-primary-600",
    "Business Orientation":
      "bg-primary-700 text-primary-700 border-primary-700",
    "Administrative Services":
      "bg-secondary-600 text-secondary-600 border-secondary-600",
    "Financial Services": "bg-primary-900 text-primary-900 border-primary-900",
    "Legal Services": "bg-primary-500 text-primary-500 border-primary-500",
    "Social Services":
      "bg-secondary-800 text-secondary-800 border-secondary-800",
  };

  const accentClasses =
    categoryColors[appointment.category] ||
    "bg-primary-600 text-primary-600 border-primary-600";
  const [accentBg, accentText] = accentClasses.split(" ");

  const paperTexture = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.06'/%3E%3C/svg%3E")`;

  return (
    <motion.div
      className="group relative flex w-full h-47.5 cursor-pointer select-none filter drop-shadow-md"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onPointerDown={() => setIsHovered(true)}
      onPointerUp={() => setIsHovered(false)}
    >
      <div
        className="flex-1 relative z-10 flex bg-[#fdfbf7]"
        style={{
          backgroundImage: paperTexture,
          maskImage: `radial-gradient(circle at right 0, transparent 12px, black 12.5px), radial-gradient(circle at right 100%, transparent 12px, black 12.5px)`,
          maskSize: "100% 51%",
          maskPosition: "top, bottom",
          maskRepeat: "no-repeat",
          WebkitMaskImage: `radial-gradient(circle at right 0, transparent 12px, black 12.5px), radial-gradient(circle at right 100%, transparent 12px, black 12.5px)`,
          WebkitMaskSize: "100% 51%",
          WebkitMaskPosition: "top, bottom",
          WebkitMaskRepeat: "no-repeat",
        }}
      >
        <div className={`w-3 shrink-0 ${accentBg}`} />

        <div className="py-6 px-5 flex flex-col justify-between overflow-hidden w-full relative">
          <div className="absolute right-4 bottom-4 text-8xl font-black opacity-[0.03] text-primary-900 select-none pointer-events-none font-mono tracking-tighter">
            {(index + 1).toString().padStart(2, "0")}
          </div>

          <div className="flex justify-between items-start mb-6 border-b-2 border-primary-200/50 pb-4">
            <span
              className={`text-sm font-mono font-bold tracking-wider ${accentText}`}
            >
              <span>{appointment.category}</span>
            </span>
          </div>

          <h3 className="text-xl mb-2 text-primary-950 font-semibold tracking-tight line-clamp-3 leading-[1.2] pr-4">
            {appointment.title}
          </h3>
        </div>

        <div className="absolute right-0 top-3 bottom-3 w-px border-r border-dashed border-primary-300/90" />
      </div>

      <motion.div
        animate={{
          rotateZ: isHovered ? 6 : 0,
        }}
        transition={{ type: "spring", stiffness: 450, damping: 20, mass: 0.8 }}
        style={{ transformOrigin: "bottom left" }}
        className="w-32 sm:w-40 relative z-20 flex shrink-0"
      >
        <div
          className="absolute inset-0 bg-[#f4f2ea] flex flex-col items-center py-4 px-2 shadow-sm"
          style={{
            backgroundImage: paperTexture,
            maskImage: `radial-gradient(circle at left 0, transparent 12px, black 12.5px), radial-gradient(circle at left 100%, transparent 12px, black 12.5px)`,
            maskSize: "100% 51%",
            maskPosition: "top, bottom",
            maskRepeat: "no-repeat",
            WebkitMaskImage: `radial-gradient(circle at left 0, transparent 12px, black 12.5px), radial-gradient(circle at left 100%, transparent 12px, black 12.5px)`,
            WebkitMaskSize: "100% 51%",
            WebkitMaskPosition: "top, bottom",
            WebkitMaskRepeat: "no-repeat",
          }}
        >
          <div className="absolute left-0 top-3 bottom-3 w-px border-l border-dashed border-primary-300/90" />

          <div className="flex flex-col items-center gap-1 w-full border-b border-primary-300/90 pb-2">
            <span className="text-[9px] font-bold text-primary-500 tracking-widest uppercase">
              DURATION
            </span>
            <span className="text-sm font-bold text-primary-950 font-mono">
              {appointment.duration}
            </span>
          </div>

          <div className="flex flex-col items-center gap-1 w-full pb-4 mt-2">
            <span className="text-[9px] font-bold text-primary-500 tracking-widest uppercase">
              FEE
            </span>
            <span className="text-sm font-bold text-primary-950 font-mono">
              {appointment.price}
            </span>
          </div>

          <motion.div
            initial={false}
            animate={{
              bottom: isHovered ? 8 : 12,
              left: isHovered ? 8 : 16,
              right: isHovered ? 8 : 16,
              top: isHovered ? 8 : "calc(100% - 56px)",
              borderRadius: 12,
            }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="absolute bg-primary-900 flex items-center justify-center overflow-hidden shadow-md z-30 transition-colors"
          >
            <motion.div
              initial={false}
              animate={{
                opacity: isHovered ? 0 : 1,
                y: isHovered ? 15 : 0,
                scale: isHovered ? 0.9 : 1,
              }}
              transition={{
                duration: isHovered ? 0.15 : 0.3,
                delay: isHovered ? 0 : 0.15,
                ease: "easeOut",
              }}
              className="absolute flex items-center justify-center gap-1 whitespace-nowrap px-3 w-full"
              style={{ pointerEvents: isHovered ? "none" : "auto" }}
            >
              <span className="text-[10px] font-bold text-white tracking-widest uppercase w-full text-center">
                Book
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-white shrink-0" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.9 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : -15,
                scale: isHovered ? 1 : 0.9,
              }}
              transition={{
                duration: isHovered ? 0.3 : 0.15,
                delay: isHovered ? 0.15 : 0,
                ease: "easeOut",
              }}
              className="absolute flex flex-col items-center justify-center whitespace-nowrap w-full px-2"
              style={{ pointerEvents: isHovered ? "auto" : "none" }}
            >
              <CalendarPlus className="w-6 h-6 text-white mb-3" />
              <span className="text-[10px] font-bold text-white tracking-[0.2em] uppercase text-center leading-relaxed">
                BOOK
                <br />
                APPOINTMENT
              </span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
