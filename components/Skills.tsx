"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/content";

export default function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-4xl px-6 py-32">
      <motion.span
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="mb-8 inline-block rounded-full border border-accent-blue/40 px-4 py-1 text-xs font-bold uppercase tracking-widest text-accent-blue"
      >
        Skills
      </motion.span>

      <div className="space-y-8">
        {skills.map((skill, i) => (
          <div key={skill.name}>
            <div className="mb-2 flex items-center justify-between">
              <span className="font-display text-lg font-bold text-white md:text-xl">
                {skill.name}
              </span>
              <span className="text-sm font-semibold text-white/60">
                {skill.level}%
              </span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                className={`h-full rounded-full ${skill.color}`}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
