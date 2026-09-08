"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/content";

export default function Projects() {
  return (
    <section id="work" className="relative mx-auto max-w-6xl px-6 py-32">
      <motion.span
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="mb-8 inline-block rounded-full border border-accent-green/40 px-4 py-1 text-xs font-bold uppercase tracking-widest text-accent-green"
      >
        Selected Work
      </motion.span>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <motion.a
            key={project.id}
            href={project.link ?? "#"}
            data-cursor-hover
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
            whileHover={{ scale: 1.02, rotate: i % 2 === 0 ? -1 : 1 }}
            className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${project.color} p-8 shadow-xl`}
          >
            <div className="flex items-start justify-between">
              <span className="text-sm font-bold uppercase tracking-widest text-white/80">
                {project.year}
              </span>
              <span className="text-2xl text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </div>
            <h3 className="font-display mt-16 text-4xl font-black text-white transition-transform duration-300 group-hover:-translate-y-1 md:text-5xl">
              {project.title}
            </h3>
            <p className="mt-4 max-w-md text-white/90">{project.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-black/20 px-3 py-1 text-xs font-semibold text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
          </motion.a>
        ))}
      </div>
    </section>
  );
}
