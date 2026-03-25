"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  year: string;
  cover_image: string | null;
  aspect_ratio: string;
}

const CATEGORIES = ["All", "Architecture", "Abstract", "Portraiture", "Landscape", "Still Life", "Street"];

export default function WorkClient({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <main className="min-h-screen pt-24 md:pt-28 pb-24">
      <div className="px-6 md:px-10 mb-12 md:mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-5xl font-extralight tracking-tight text-portfolio-white mb-2"
        >
          Work
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-portfolio-muted text-sm"
        >
          {filtered.length} projects
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="px-6 md:px-10 mb-12 flex flex-wrap gap-x-6 gap-y-2"
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-xs tracking-widest uppercase transition-all duration-300 pb-px ${
              activeCategory === cat
                ? "text-portfolio-white border-b border-portfolio-white"
                : "text-portfolio-muted hover:text-portfolio-light"
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      <div className="px-6 md:px-10">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="break-inside-avoid"
            >
              <Link href={`/work/${project.slug}`} className="group block">
                <div
                  className={`relative overflow-hidden bg-portfolio-gray ${
                    project.aspect_ratio === "portrait"
                      ? "aspect-[3/4]"
                      : project.aspect_ratio === "landscape"
                      ? "aspect-[4/3]"
                      : "aspect-square"
                  }`}
                >
                  {project.cover_image && (
                    <Image
                      src={project.cover_image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      style={{ filter: "brightness(0.85)" }}
                      unoptimized
                    />
                  )}
                  <div className="absolute inset-0 bg-portfolio-black opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-xs tracking-widest uppercase text-white border border-white/50 px-4 py-2">
                      View Project
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex items-baseline justify-between">
                  <div>
                    <h2 className="text-sm font-medium text-portfolio-white">{project.title}</h2>
                    <p className="text-xs text-portfolio-muted mt-0.5">{project.category}</p>
                  </div>
                  <span className="text-xs text-portfolio-muted">{project.year}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
