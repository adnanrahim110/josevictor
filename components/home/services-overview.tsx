"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lightbulb, Blocks, HeartHandshake } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    icon: <Lightbulb className="w-12 h-12 text-secondary-500" />,
    title: "Strategic Consulting",
    description: "Business model optimization, strategic planning, and sustainable growth.",
    number: "01",
  },
  {
    icon: <Blocks className="w-12 h-12 text-secondary-500" />,
    title: "Workshops (LEGO® Serious Play®)",
    description: "Hands-on experiences to unlock thinking, improve communication, and align teams.",
    number: "02",
  },
  {
    icon: <HeartHandshake className="w-12 h-12 text-secondary-500" />,
    title: "Personal & Organizational Development",
    description: "Integrating purpose, performance, and well-being into decision-making.",
    number: "03",
  },
];

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  number: string;
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="service-card bg-white rounded-[40px] p-10 md:p-14 max-w-3xl w-full mx-auto shadow-2xl border border-primary-100 flex flex-col md:flex-row gap-10 items-start relative overflow-hidden group will-change-transform">
      <div className="absolute -top-10 -right-10 text-[200px] font-heading font-bold text-primary-50 leading-none pointer-events-none transition-transform duration-700 group-hover:scale-110">
        {service.number}
      </div>
      <div className="w-20 h-20 rounded-3xl bg-primary-50 flex items-center justify-center shrink-0 border border-primary-100 relative z-10">
        {service.icon}
      </div>
      <div className="relative z-10">
        <h3 className="text-2xl md:text-3xl font-heading font-semibold text-primary-950 mb-4">
          {service.title}
        </h3>
        <p className="text-lg md:text-xl text-primary-700 leading-relaxed">
          {service.description}
        </p>
      </div>
    </div>
  );
}

export function ServicesOverview() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference) and (min-width: 1024px)", () => {
      const track = trackRef.current;
      const wrapper = wrapperRef.current;
      if (!track || !wrapper) return;

      const getDistance = () => track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () => "+=" + getDistance(),
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      const cards = gsap.utils.toArray<HTMLElement>(".service-card");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { scale: 0.94, opacity: 0.7 },
          {
            scale: 1,
            opacity: 1,
            ease: "power1.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: gsap.getTweensOf(track)[0],
              start: "left center",
              end: "center center",
              scrub: true,
            },
          },
        );
      });
    });

    mm.add("(prefers-reduced-motion: no-preference) and (max-width: 1023px)", () => {
      gsap.from(".service-card", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: { trigger: wrapperRef.current, start: "top 75%", once: true },
      });
    });
  }, { scope: wrapperRef });

  return (
    <section
      id="services"
      className="relative scroll-mt-24 overflow-hidden py-24 md:py-32"
    >
      <div className="relative z-10 lg:hidden">
        <Container className="mb-12">
          <div className="flex flex-col items-start gap-3">
            <span className="text-xs font-semibold tracking-widest text-secondary-700 uppercase bg-white/80 px-3 py-1 rounded-full border border-primary-200">
              How we can work together
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-semibold text-primary-950">
              Three ways to build with purpose.
            </h2>
          </div>
        </Container>
        <div className="flex flex-col gap-6 px-4">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} />
          ))}
        </div>
        <Container className="mt-12 flex justify-center">
          <Button
            href="/contact"
            size="lg"
            className="text-base px-8 h-14 rounded-full bg-primary-950 text-white hover:bg-secondary-600 shadow-xl"
            icon={<ArrowRight className="w-5 h-5" />}
            iconPosition="end"
          >
            Schedule a conversation
          </Button>
        </Container>
      </div>

      <div
        ref={wrapperRef}
        className="hidden lg:block relative z-10 h-screen overflow-hidden"
      >
        <Container className="absolute top-24 left-0 right-0 z-20 pointer-events-none">
          <div className="flex flex-col items-start gap-3">
            <span className="text-xs font-semibold tracking-widest text-secondary-700 uppercase bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-primary-200">
              How we can work together
            </span>
            <h2 className="text-4xl lg:text-6xl font-heading font-semibold text-primary-950">
              Three ways to build with purpose.
            </h2>
          </div>
        </Container>

        <div
          ref={trackRef}
          className="flex h-full items-center will-change-transform"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="w-screen h-full shrink-0 flex items-center justify-center px-12"
            >
              <ServiceCard service={service} />
            </div>
          ))}
        </div>

        <Container className="absolute bottom-16 left-0 right-0 z-20 flex justify-start">
          <Button
            href="/contact"
            size="lg"
            className="text-base px-8 h-14 rounded-full bg-primary-950 text-white hover:bg-secondary-600 shadow-xl"
            icon={<ArrowRight className="w-5 h-5" />}
            iconPosition="end"
          >
            Schedule a conversation
          </Button>
        </Container>
      </div>
    </section>
  );
}
