"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const awards = [
  { year: "2024", title: "International Photography Award", category: "Architecture" },
  { year: "2023", title: "World Photography Organisation", category: "Shortlist — Landscape" },
  { year: "2022", title: "Sony World Photography Awards", category: "Open — Street Photography" },
];

const exhibitions = [
  { year: "2024", title: "Geometries of Light", venue: "Galería Juana de Aizpuru, Madrid" },
  { year: "2023", title: "Quiet Hours", venue: "Foam Fotografiemuseum, Amsterdam" },
  { year: "2022", title: "Negative Space", venue: "Unseen Photo Fair, Amsterdam" },
  { year: "2021", title: "Urban Fictions", venue: "Paris Photo, Grand Palais" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-24 md:pt-28 pb-24">
      {/* Header image + intro */}
      <div className="px-6 md:px-10 mb-20 md:mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/5] overflow-hidden bg-portfolio-gray"
          >
            <Image
              src="https://images.unsplash.com/photo-1554048612-b6a482b224cd?w=1200&q=85"
              alt="Photographer portrait"
              fill
              className="object-cover"
              style={{ filter: "brightness(0.8) saturate(0.9)" }}
            />
          </motion.div>

          {/* Bio */}
          <div className="flex flex-col justify-center lg:pt-12">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xs tracking-widest uppercase text-portfolio-muted mb-6"
            >
              About
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-5xl font-extralight tracking-tight text-portfolio-white mb-8"
            >
              Alexandra
              <br />
              Moreau
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="space-y-5 text-portfolio-muted text-sm leading-relaxed"
            >
              <p>
                Born in Lyon, based between Paris and Tokyo. Alexandra Moreau works at the
                intersection of documentary photography and fine art, drawn to the quiet moments
                that precede or follow the decisive ones.
              </p>
              <p>
                Her practice spans architecture, portraiture, and landscape — each series an extended
                meditation rather than a collection of images. She shoots primarily on medium format,
                both film and digital, choosing tools based on the emotional register a project demands.
              </p>
              <p>
                Her work has been published in Vogue, The Guardian, Le Monde Magazine, and exhibited
                across Europe and Asia. She is available for editorial, commercial, and personal
                commissions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="mt-10"
            >
              <a
                href="mailto:hello@studio.com"
                className="group inline-flex items-center gap-4 text-sm tracking-widest uppercase text-portfolio-white"
              >
                <span>Get in touch</span>
                <span className="block w-8 h-px bg-white transition-all duration-500 group-hover:w-16" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Exhibitions */}
      <section className="px-6 md:px-10 py-16 border-t border-portfolio-gray">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs tracking-widest uppercase text-portfolio-muted mb-10"
        >
          Selected Exhibitions
        </motion.h2>
        <div className="space-y-6">
          {exhibitions.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="grid grid-cols-[4rem_1fr] md:grid-cols-[6rem_1fr] gap-4 border-b border-portfolio-gray/50 pb-6"
            >
              <span className="text-portfolio-muted text-sm">{item.year}</span>
              <div>
                <p className="text-portfolio-light text-sm font-medium">{item.title}</p>
                <p className="text-portfolio-muted text-xs mt-1">{item.venue}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Awards */}
      <section className="px-6 md:px-10 py-16 border-t border-portfolio-gray">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs tracking-widest uppercase text-portfolio-muted mb-10"
        >
          Recognition
        </motion.h2>
        <div className="space-y-6">
          {awards.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="grid grid-cols-[4rem_1fr] md:grid-cols-[6rem_1fr] gap-4 border-b border-portfolio-gray/50 pb-6"
            >
              <span className="text-portfolio-muted text-sm">{item.year}</span>
              <div>
                <p className="text-portfolio-light text-sm font-medium">{item.title}</p>
                <p className="text-portfolio-muted text-xs mt-1">{item.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-10 py-16 border-t border-portfolio-gray">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <p className="text-xs tracking-widest uppercase text-portfolio-muted mb-3">Contact</p>
            <h2 className="text-2xl md:text-3xl font-extralight text-portfolio-white">
              Let&apos;s make something together.
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href="mailto:hello@studio.com"
              className="text-sm text-portfolio-muted hover:text-portfolio-white transition-colors duration-300"
            >
              hello@studio.com
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-portfolio-muted hover:text-portfolio-white transition-colors duration-300"
            >
              @studio — Instagram
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
