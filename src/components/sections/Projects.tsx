"use client";

import { motion } from "framer-motion";
import { featuredProject, projects } from "@/lib/data";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeader } from "@/components/ui/SectionHeader";

type ListedProject = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  details?: string[];
  technologies: string[];
};

const allProjects: ListedProject[] = [
  {
    slug: featuredProject.slug,
    name: featuredProject.name,
    tagline: featuredProject.tagline,
    description: featuredProject.solution,
    details: featuredProject.features,
    technologies: featuredProject.technologies,
  },
  ...projects.map((p) => ({
    slug: p.slug,
    name: p.name,
    tagline: p.tagline,
    description: p.description,
    details: "details" in p ? p.details : undefined,
    technologies: p.technologies,
  })),
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Projects() {
  return (
    <AnimatedSection id="projects" className="bg-bg-elevated/40">
      <div className="section-container">
        <SectionHeader
          number="04"
          title="Projects"
          description="Work that shows my foundation — Python backends, React & React Native UIs, and practical LLM/RAG features in real products."
        />

        <div className="flex flex-col gap-4 md:gap-5">
          {allProjects.map((project, i) => {
            const fromLeft = i % 2 === 0;

            return (
              <motion.article
                key={project.slug}
                initial={{ opacity: 0, x: fromLeft ? -72 : 72 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25, margin: "0px 0px -40px 0px" }}
                transition={{ duration: 0.65, delay: 0.04, ease }}
                whileHover={{ y: -3 }}
                className="project-slide rounded-2xl border border-border bg-bg-surface/70 px-5 py-6 shadow-[var(--shadow-soft)] transition-[border-color,box-shadow] hover:border-border-hover hover:shadow-[var(--shadow-lift)] md:px-7 md:py-7"
              >
                <motion.div
                  initial={{ opacity: 0, x: fromLeft ? -16 : 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.12, ease }}
                >
                  <h3 className="text-lg font-semibold text-text md:text-xl">
                    {project.name}
                  </h3>
                  <p className="mt-1 text-sm text-primary">{project.tagline}</p>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted md:text-base">
                    {project.description}
                  </p>
                  {project.details && (
                    <ul className="mt-3 max-w-3xl space-y-1.5">
                      {project.details.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2 text-sm leading-relaxed text-muted"
                        >
                          <span className="text-primary">·</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech, ti) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.35,
                          delay: 0.18 + ti * 0.04,
                          ease,
                        }}
                        className="chip"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
