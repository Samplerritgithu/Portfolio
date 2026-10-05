"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Cloud,
  Database,
  Layout,
  Server,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { skillCategories } from "@/lib/data";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeader } from "@/components/ui/SectionHeader";

const iconMap: Record<string, LucideIcon> = {
  server: Server,
  layout: Layout,
  brain: Brain,
  smartphone: Smartphone,
  cloud: Cloud,
  database: Database,
};

export function Skills() {
  return (
    <AnimatedSection id="skills" className="bg-bg-elevated/50">
      <div className="section-container">
        <SectionHeader
          number="02"
          title="Skills"
          description="Python, React, React Native, and AI/LLM tools I use to ship products."
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {skillCategories.map((category, i) => {
            const Icon = iconMap[category.icon];
            return (
              <motion.article
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.45 }}
                whileHover={{ y: -4 }}
                className="group rounded-2xl border border-border bg-bg-surface/50 p-5 transition-[border-color,box-shadow] hover:border-border-hover hover:shadow-[var(--shadow-soft)] md:p-6"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-bg-deep text-primary transition-colors group-hover:border-primary/30 group-hover:bg-primary/5">
                    <Icon size={18} strokeWidth={1.75} />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
                    {category.title}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-text">
                  {category.title}
                </h3>
                <p className="mt-1 text-sm text-muted">{category.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {category.technologies.map((tech) => (
                    <span key={tech} className="chip">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
