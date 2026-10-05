"use client";

import { motion } from "framer-motion";
import { experiences } from "@/lib/data";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Experience() {
  return (
    <AnimatedSection id="experience">
      <div className="section-container">
        <SectionHeader
          number="03"
          title="Experience"
          description="Python full-stack delivery across enterprise platforms, React/React Native UIs, real-time workflows, and LLM/RAG applications."
        />

        <div className="relative ml-2 md:ml-4">
          <div
            aria-hidden
            className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-primary/50 via-border to-transparent"
          />

          <div className="space-y-10 md:space-y-12">
            {experiences.map((exp, i) => (
              <motion.article
                key={`${exp.company}-${exp.period}`}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative pl-8 md:pl-10"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.2, type: "spring" }}
                  className="absolute left-0 top-1.5 flex h-3 w-3 -translate-x-1/2 items-center justify-center rounded-full border border-primary bg-bg-deep"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                </motion.span>

                <div className="rounded-2xl border border-border bg-bg-surface/40 p-5 transition-[border-color,box-shadow] hover:border-border-hover hover:shadow-[var(--shadow-soft)] md:p-6">
                  <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-text md:text-xl">
                        {exp.company}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-primary">
                        {exp.role}
                      </p>
                    </div>
                    <div className="text-left md:text-right">
                      <p className="text-sm text-muted">{exp.period}</p>
                      <p className="text-xs text-muted/70">{exp.location}</p>
                    </div>
                  </div>

                  <ul className="mt-5 space-y-2.5">
                    {exp.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2.5 text-sm leading-relaxed text-muted"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/70" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
