"use client";

import { motion } from "framer-motion";
import { aboutCards, certificates, education, personal } from "@/lib/data";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function About() {
  return (
    <AnimatedSection id="about">
      <div className="section-container">
        <SectionHeader
          number="01"
          title="About"
          description="Engineering reliable products from backend architecture to intelligent user experiences."
        />

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            <p className="text-base leading-relaxed text-muted md:text-lg">
              I&apos;m{" "}
              <span className="text-text font-medium">{personal.name}</span>, a{" "}
              {personal.title} based in {personal.location} with over 2 years of
              experience building scalable backend services, REST APIs,
              real-time systems, and responsive web &amp; mobile applications.
            </p>
            <p className="text-base leading-relaxed text-muted">
              {personal.summary} My day-to-day stack is Python, Django, FastAPI,
              React, React Native, and cloud deployment — with hands-on work in
              RAG pipelines, embeddings, vector search, and LLM-assisted
              automation.
            </p>
            <p className="text-sm text-muted/80">
              {education.degree} · {education.school} · GPA {education.gpa}
            </p>
            <ul className="space-y-1.5 text-sm text-muted/80">
              {certificates.map((cert) => (
                <li key={cert.name}>
                  <span className="text-text/90">{cert.name}</span>
                  <span className="text-muted/60"> · {cert.period}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {aboutCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
                whileHover={{ y: -3 }}
                className="group rounded-xl border border-border bg-bg-surface/60 p-4 transition-[border-color,box-shadow] hover:border-border-hover hover:shadow-[var(--shadow-soft)] md:p-5"
              >
                <p className="font-mono text-xs tracking-wide text-primary">
                  {card.label}
                </p>
                <h3 className="mt-2 text-sm font-semibold text-text md:text-base">
                  {card.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted md:text-sm">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
