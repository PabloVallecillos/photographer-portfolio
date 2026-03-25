"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getProject, projects } from "@/lib/projects";
import { notFound } from "next/navigation";

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const currentIndex = projects.findIndex((p) => p.slug === params.slug);
  const prev = projects[currentIndex - 1];
  const next = projects[currentIndex + 1];

  return (
    <main className="min-h-screen pt-24 md:pt-28 pb-24">
      {/* Back link */}
      <div className="px-6 md:px-10 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/work"
            className="text-xs tracking-widest uppercase text-portfolio-muted hover:text-portfolio-white transition-colors duration-300"
          >
            ← All Work
          </Link>
        </motion.div>
      </div>

      {/* Project header */}
      <div className="px-6 md:px-10 mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-portfolio-muted text-xs tracking-widest uppercase mb-3"
          >
            {project.category} — {project.year}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-portfolio-white"
          >
            {project.title}
          </motion.h1>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-portfolio-muted text-sm leading-relaxed max-w-md"
        >
          {project.description}
        </motion.p>
      </div>

      {/* Hero image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="px-6 md:px-10 mb-4 cursor-pointer"
        onClick={() => setLightboxIndex(0)}
      >
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-portfolio-gray">
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            priority
            className="object-cover"
          />
        </div>
      </motion.div>

      {/* Image grid */}
      <div className="px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-4 mb-24">
        {project.images.slice(1).map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden bg-portfolio-gray cursor-pointer group"
            style={{
              aspectRatio:
                i % 3 === 0 ? "4/5" : i % 3 === 1 ? "16/10" : "3/2",
            }}
            onClick={() => setLightboxIndex(i + 1)}
          >
            <Image
              src={img}
              alt={`${project.title} ${i + 2}`}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-portfolio-black opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
          </motion.div>
        ))}
      </div>

      {/* Project navigation */}
      <div className="px-6 md:px-10 border-t border-portfolio-gray pt-12 flex items-center justify-between">
        {prev ? (
          <Link href={`/work/${prev.slug}`} className="group flex flex-col gap-1">
            <span className="text-xs tracking-widest uppercase text-portfolio-muted group-hover:text-portfolio-white transition-colors duration-300">
              ← Previous
            </span>
            <span className="text-sm text-portfolio-light">{prev.title}</span>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link href={`/work/${next.slug}`} className="group flex flex-col items-end gap-1">
            <span className="text-xs tracking-widest uppercase text-portfolio-muted group-hover:text-portfolio-white transition-colors duration-300">
              Next →
            </span>
            <span className="text-sm text-portfolio-light">{next.title}</span>
          </Link>
        ) : (
          <div />
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close */}
            <button
              className="absolute top-6 right-6 text-white/60 hover:text-white text-xs tracking-widest uppercase transition-colors duration-300"
              onClick={() => setLightboxIndex(null)}
            >
              Close ✕
            </button>

            {/* Image counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-widest">
              {lightboxIndex + 1} / {project.images.length}
            </div>

            {/* Prev / next */}
            {lightboxIndex > 0 && (
              <button
                className="absolute left-4 md:left-8 text-white/50 hover:text-white text-2xl transition-colors duration-300 p-4"
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex - 1); }}
              >
                ←
              </button>
            )}
            {lightboxIndex < project.images.length - 1 && (
              <button
                className="absolute right-4 md:right-8 text-white/50 hover:text-white text-2xl transition-colors duration-300 p-4"
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex + 1); }}
              >
                →
              </button>
            )}

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-[90vw] max-w-5xl"
              style={{ aspectRatio: "3/2" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={project.images[lightboxIndex]}
                alt={project.title}
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
