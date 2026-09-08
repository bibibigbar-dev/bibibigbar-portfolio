"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { aboutText } from "@/data/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".about-line").forEach((line) => {
        gsap.fromTo(
          line,
          { opacity: 0.15, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: line,
              start: "top 85%",
              end: "top 50%",
              scrub: 0.5,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative mx-auto max-w-4xl px-6 py-32"
    >
      <motion.span
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="mb-8 inline-block rounded-full border border-accent-yellow/40 px-4 py-1 text-xs font-bold uppercase tracking-widest text-accent-yellow"
      >
        About
      </motion.span>
      <div className="space-y-4">
        {aboutText.map((line, i) => (
          <p
            key={i}
            className="about-line font-display text-2xl font-bold leading-snug text-white/90 md:text-4xl"
          >
            {line}
          </p>
        ))}
      </div>
    </section>
  );
}
