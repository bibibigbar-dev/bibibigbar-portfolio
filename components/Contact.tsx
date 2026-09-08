"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/content";

const socials = [
  { label: "GitHub", href: siteConfig.social.github },
  { label: "LinkedIn", href: siteConfig.social.linkedin },
  { label: "Instagram", href: siteConfig.social.instagram },
  { label: "Twitter", href: siteConfig.social.twitter },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative mx-auto flex max-w-4xl flex-col items-center px-6 py-32 text-center"
    >
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 inline-block rounded-full border border-accent-orange/40 px-4 py-1 text-xs font-bold uppercase tracking-widest text-accent-orange"
      >
        Contact
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-display gradient-text text-5xl font-black md:text-7xl"
      >
        LET&apos;S CREATE
        <br /> SOMETHING BOLD
      </motion.h2>

      <motion.a
        href={`mailto:${siteConfig.email}`}
        data-cursor-hover
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="mt-10 inline-block rounded-full bg-white px-8 py-4 text-lg font-bold text-black shadow-xl"
      >
        {siteConfig.email}
      </motion.a>

      <div className="mt-12 flex flex-wrap justify-center gap-6">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            data-cursor-hover
            className="text-sm font-semibold uppercase tracking-widest text-white/60 transition-colors hover:text-accent-pink"
          >
            {s.label}
          </a>
        ))}
      </div>

      <p className="mt-20 text-xs uppercase tracking-widest text-white/30">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </p>
    </section>
  );
}
