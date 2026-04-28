"use client";

import { AppointmentTicket } from "@/components/ui/appointment-ticket";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Title } from "@/components/ui/title";
import {
  APPOINTMENTS,
  APPOINTMENT_CATEGORIES,
  AppointmentCategory,
} from "@/constants/appointments";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

export function Appointments() {
  const [activeCategory, setActiveCategory] =
    useState<AppointmentCategory>("All Services");
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredAppointments =
    activeCategory === "All Services"
      ? APPOINTMENTS
      : APPOINTMENTS.filter((app) => app.category === activeCategory);

  const visibleAppointments = filteredAppointments.slice(0, visibleCount);

  const [hoveredCategory, setHoveredCategory] =
    useState<AppointmentCategory | null>(null);

  const handleCategoryChange = (category: AppointmentCategory) => {
    setActiveCategory(category);
    setVisibleCount(6); // Reset pagination on category change
  };

  const handleSeeMore = () => {
    setVisibleCount(filteredAppointments.length);
  };

  return (
    <Section className="relative overflow-hidden pb-32">
      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Title className="text-center mb-4 text-primary-950">
            Book an Appointment
          </Title>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-primary-800"
          >
            Select a service below to schedule your session. We offer a wide
            range of specialized consultations tailored to your needs.
          </motion.p>
        </div>

        <div className="flex justify-center mb-16 relative w-full">
          <div
            className="relative flex items-center p-1.5 bg-primary-50/60 backdrop-blur-xl border border-primary-200/60 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] max-w-full overflow-x-auto no-scrollbar"
            onMouseLeave={() => setHoveredCategory(null)}
          >
            {APPOINTMENT_CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              const isHovered = hoveredCategory === category;

              return (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  onMouseEnter={() => setHoveredCategory(category)}
                  className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-colors duration-500 ease-out whitespace-nowrap outline-none ${
                    isActive
                      ? "text-white"
                      : "text-primary-600 hover:text-primary-900"
                  }`}
                >
                  {isHovered && !isActive && (
                    <motion.div
                      layoutId="hoverFilterBg"
                      className="absolute inset-0 bg-white/60 rounded-full z-0"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}

                  {isActive && (
                    <motion.div
                      layoutId="activeFilterBg"
                      className="absolute inset-0 bg-primary-900 rounded-full z-0 shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}

                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isActive && (
                      <motion.span
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 45 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 25,
                          delay: 0.1,
                        }}
                        className="w-1.5 h-1.5 bg-primary-200/90 shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                        style={{ borderRadius: "1px" }}
                      />
                    )}
                    {category}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${visibleCount}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto min-47."
          >
            {visibleAppointments.map((apt, index) => (
              <AppointmentTicket
                key={apt.title}
                appointment={apt}
                index={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {visibleCount < filteredAppointments.length && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mt-16 flex justify-center"
            >
              <Button
                onClick={handleSeeMore}
                variant="outline"
                size="lg"
                className="border-primary-300 text-primary-900 rounded-full px-10 py-6 text-lg shadow-sm"
              >
                See All {filteredAppointments.length} Appointments
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Section>
  );
}
