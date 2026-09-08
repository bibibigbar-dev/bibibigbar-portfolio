"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/content";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-12"
    >
      <a
        href="#hero"
        data-cursor-hover
        className="font-display text-lg font-black tracking-tight text-white"
      >
        {siteConfig.name}
      </a>
      <nav className="hidden gap-8 md:flex">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            data-cursor-hover
            className="text-sm font-semibold uppercase tracking-widest text-white/70 transition-colors hover:text-accent-yellow"
          >
            {item.label}
          </a>
        ))}
      </nav>
      <a
        href="#contact"
        data-cursor-hover
        className="rounded-full border border-white/30 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:border-accent-pink hover:text-accent-pink md:text-sm"
      >
        Say Hi
      </a>
    </motion.header>
  );
}
