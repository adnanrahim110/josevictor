"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

const posts = [
  {
    id: 1,
    title: "JVJ Consulting introduce la innovadora metodología LSP",
    description:
      "Descubre cómo la metodología LEGO® SERIOUS PLAY® está transformando la resolución de problemas y la estrategia empresarial. Una inmersión profunda en el juego serio corporativo.",
    date: "May 5, 2025",
    category: "Metodología",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
  },
  {
    id: 2,
    title: "¿Y si jugar fuera la mejor forma de trabajar?",
    description:
      "Explorando la importancia del juego serio en entornos profesionales para fomentar la creatividad y la colaboración.",
    date: "May 4, 2025",
    category: "Creatividad",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
  },
  {
    id: 3,
    title: "Unlocking Potential with JVJ Consulting LLC: Business and Social",
    description:
      "How our firm bridges the gap between commercial success and meaningful social progress in the modern economy.",
    date: "April 14, 2025",
    category: "Strategy",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952",
  },
  {
    id: 4,
    title: "Transformation + Strategy + Human Care = Sustainable Success",
    description:
      "Why the human element is the most critical factor in long-term organizational transformation and strategic success.",
    date: "April 14, 2025",
    category: "Leadership",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984",
  },
];

function BlogRow({ post, index }: { post: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 50, mass: 1.5 };
  const imageX = useSpring(mouseX, springConfig);
  const imageY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!rowRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ratioX = x / rect.width;
    const ratioY = y / rect.height;

    // Biased magnetic movement: travels far left (-400px) but only slightly right (+100px)
    // This compensates for its right-aligned anchor position and uses the full empty space.
    const offsetX = (ratioX - 0.8) * 500;
    const offsetY = (ratioY - 0.5) * 160;

    mouseX.set(offsetX);
    mouseY.set(offsetY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.article
      ref={rowRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.76, 0, 0.24, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className="group relative cursor-pointer flex flex-col md:flex-row md:justify-between items-start md:items-center py-10 border-b border-primary-200 hover:bg-primary-100/50 transition-colors duration-300 px-4 md:px-8 -mx-4 md:-mx-8 rounded-2xl"
    >
      <div className="w-full md:flex-1 flex flex-col md:flex-row items-start gap-3 z-10 relative pointer-events-none">
        <div className="mb-4 h-full md:mb-0 flex flex-col gap-1 z-10 relative pointer-events-none">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary-500">
            {post.category}
          </span>
          <span className="text-sm text-primary-400 font-medium">
            {post.date}
          </span>
        </div>

        <div className="w-full max-w-3xl pr-8 z-10 relative pointer-events-none md:border-l md:border-neutral-200 md:pl-3">
          <h3 className="text-2xl lg:text-3xl font-heading font-semibold text-primary-950 mb-3 group-hover:text-secondary-600 transition-colors duration-300 line-clamp-1">
            {post.title}
          </h3>
          <p className="text-base text-primary-600 line-clamp-1 md:hidden lg:inline-block">
            {post.description}
          </p>
        </div>
      </div>

      <div className="hidden md:flex justify-end items-center pr-10 z-10 relative pointer-events-none">
        <motion.div
          style={{ x: imageX, y: imageY }}
          animate={{ scale: isHovered ? 2.4 : 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-28 aspect-4/3 rounded-xl overflow-hidden shadow-md"
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
        </motion.div>
      </div>

      <div className="w-full md:w-fit mt-6 md:mt-0 flex items-center justify-between md:justify-end gap-6 z-10 relative pointer-events-none">
        <div className="w-12 h-12 rounded-full border border-primary-200 flex items-center justify-center transition-colors duration-300 group-hover:bg-primary-950 group-hover:border-primary-950 group-hover:text-white text-primary-950">
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-45" />
        </div>
      </div>
    </motion.article>
  );
}

export function BlogGrid() {
  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  return (
    <Section className="py-24 bg-primary-50">
      <Container>
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="group cursor-pointer mb-20 lg:mb-32"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7 relative w-full aspect-4/3 rounded-4xl overflow-hidden">
              <div className="absolute inset-0 bg-primary-950/10 z-10 transition-opacity duration-500 group-hover:opacity-0" />
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>

            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="flex items-center gap-4 text-xs font-semibold tracking-widest uppercase text-primary-500 mb-6">
                <span>{featuredPost.category}</span>
                <span className="w-1 h-1 rounded-full bg-secondary-500" />
                <span>{featuredPost.date}</span>
              </div>

              <h3 className="text-4xl lg:text-5xl font-heading font-semibold text-primary-950 mb-8 leading-[1.15] group-hover:text-secondary-600 transition-colors duration-500">
                {featuredPost.title}
              </h3>

              <p className="text-lg md:text-xl text-primary-600 leading-relaxed mb-10">
                {featuredPost.description}
              </p>

              <div className="inline-flex items-center gap-3 text-primary-950 font-bold tracking-tight">
                <span className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-primary-950 after:origin-right after:transition-transform after:duration-300 group-hover:after:origin-left group-hover:after:scale-x-0">
                  Read Full Article
                </span>
                <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-2 group-hover:text-secondary-600" />
              </div>
            </div>
          </div>
        </motion.article>

        <div className="flex flex-col border-t border-primary-200">
          {regularPosts.map((post, index) => (
            <BlogRow key={post.id} post={post} index={index} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
