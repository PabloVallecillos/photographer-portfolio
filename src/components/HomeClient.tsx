"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  year: string;
  cover_image: string | null;
  aspect_ratio: string;
}

export default function HomeClient({ projects }: { projects: Project[] }) {
  const featured = projects.slice(0, 3);
  const heroImage = projects[0]?.cover_image ?? "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80";

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt="Hero"
            fill
            priority
            className="object-cover scale-105"
            style={{ filter: "brightness(0.45)" }}
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-portfolio-black via-transparent to-transparent" />
        </div>

        <div className="relative z-10 px-6 md:px-10 pb-16 md:pb-24 w-full">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-portfolio-muted text-xs tracking-widest uppercase mb-4"
          >
            Visual Storytelling
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight leading-none text-portfolio-white mb-8 max-w-3xl"
          >
            Light. Shadow.
            <br />
            <em className="not-italic font-thin">Silence.</em>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="/work"
              className="group inline-flex items-center gap-4 text-sm tracking-widest uppercase text-portfolio-white"
            >
              <span className="relative overflow-hidden">
                <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full">
                  View Work
                </span>
                <span className="absolute inset-0 inline-block translate-y-full transition-transform duration-500 group-hover:translate-y-0">
                  View Work
                </span>
              </span>
              <span className="block w-12 h-px bg-white transition-all duration-500 group-hover:w-20" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 right-10 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-px h-8 bg-portfolio-muted"
          />
          <span className="text-portfolio-muted text-xs tracking-widest uppercase rotate-90 origin-center translate-x-3">
            Scroll
          </span>
        </motion.div>
      </section>

      {/* Featured work */}
      <section className="px-6 md:px-10 py-24 md:py-32">
        <div className="flex items-baseline justify-between mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs tracking-widest uppercase text-portfolio-muted"
          >
            Selected Work
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Link
              href="/work"
              className="text-xs tracking-widest uppercase text-portfolio-muted hover:text-portfolio-white transition-colors duration-300"
            >
              All Projects →
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {featured.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
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
                  <div className="absolute inset-0 bg-portfolio-black opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                </div>
                <div className="mt-4 flex items-baseline justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-portfolio-white">{project.title}</h3>
                    <p className="text-xs text-portfolio-muted mt-1">{project.category}</p>
                  </div>
                  <span className="text-xs text-portfolio-muted">{project.year}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Statement */}
      <section className="px-6 md:px-10 py-24 md:py-32 border-t border-portfolio-gray">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl md:text-3xl font-extralight leading-relaxed text-portfolio-light"
          >
            Photography is not about capturing what exists. It is about making visible what was always there, waiting to be seen.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8"
          >
            <Link
              href="/about"
              className="text-xs tracking-widest uppercase text-portfolio-muted hover:text-portfolio-white transition-colors duration-300"
            >
              About the photographer →
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
