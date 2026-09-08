"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/content";

const headline = "CREATIVE".split("");
const subheadline = "DEVELOPER".split("");

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.045, delayChildren: 0.3 },
  },
};

const letter = {
  hidden: { y: 80, opacity: 0, rotate: 8 },
  show: {
    y: 0,
    opacity: 1,
    rotate: 0,
    transition: { type: "spring", damping: 14, stiffness: 120 },
  },
};

const letterColors = [
  "text-accent-pink",
  "text-accent-orange",
  "text-accent-yellow",
  "text-accent-green",
  "text-accent-blue",
  "text-accent-purple",
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="mb-4 text-sm font-bold uppercase tracking-[0.4em] text-white/60"
      >
        {siteConfig.tagline}
      </motion.p>

      <motion.h1
        variants={container}
        initial="hidden"
        animate="show"
        className="font-display flex flex-wrap justify-center text-[16vw] font-black leading-[0.9] tracking-tighter md:text-[9rem]"
      >
        {headline.map((char, i) => (
          <motion.span
            key={`h-${i}`}
            variants={letter}
            className={letterColors[i % letterColors.length]}
          >
            {char}
          </motion.span>
        ))}
      </motion.h1>
      <motion.h1
        variants={container}
        initial="hidden"
        animate="show"
        className="font-display flex flex-wrap justify-center text-[16vw] font-black leading-[0.9] tracking-tighter text-white md:text-[9rem]"
      >
        {subheadline.map((char, i) => (
          <motion.span key={`s-${i}`} variants={letter}>
            {char}
          </motion.span>
        ))}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="mt-10 flex flex-col items-center gap-2"
      >
        <p className="max-w-xl text-balance text-white/70">
          알록달록한 색상과 강렬한 타이포그래피로 이야기를 전달하는 웹을 만듭니다.
        </p>
        <a
          href="#work"
          data-cursor-hover
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-pink via-accent-purple to-accent-blue px-6 py-3 text-sm font-bold uppercase tracking-widest text-white shadow-lg shadow-accent-purple/30 transition-transform hover:scale-105"
        >
          작업물 보기 ↓
        </a>
      </motion.div>

      <motion.div
        aria-hidden
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 text-xs font-bold uppercase tracking-widest text-white/40"
      >
        Scroll
      </motion.div>
    </section>
  );
}
