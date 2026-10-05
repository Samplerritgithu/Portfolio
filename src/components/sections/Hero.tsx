"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { personal } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { HeroVisual } from "@/components/visual/HeroVisual";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[100svh] overflow-hidden pt-24 pb-16 md:pt-28 md:pb-24"
      aria-label="Introduction — Full Stack Software Engineer"
    >
      <div className="absolute inset-0 gradient-mesh" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="section-container relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-bg-surface/60 px-3 py-1.5 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="text-xs font-medium text-muted">
              {personal.availability}
            </span>
          </motion.div>

          <h1 className="max-w-xl text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.1] tracking-tight text-text">
            Shiva Shankar builds{" "}
            <span className="text-primary">Python-powered</span>{" "}
            <span className="text-secondary">full-stack products</span> across{" "}
            <span className="text-primary">web, mobile &amp; cloud</span>.
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted md:text-lg">
            Full Stack Software Engineer specializing in Python, Django/DRF,
            React, Flutter and cloud-based applications, with hands-on
            experience in AWS, Firebase, Next.js, Node.js and CI/CD. Currently
            exploring AI, LLMs and RAG systems.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="#contact" showArrow size="lg">
              Get in Touch
            </Button>
            <Button href="#projects" variant="secondary" size="lg">
              View Projects
            </Button>
          </div>

          <SocialLinks className="mt-8" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:pl-4"
        >
          <HeroVisual />
          <motion.a
            href="#projects"
            className="absolute -bottom-2 right-4 hidden items-center gap-1 rounded-full border border-border bg-bg-surface/80 px-3 py-1.5 text-xs text-muted backdrop-blur-sm md:inline-flex"
            whileHover={{ y: -2 }}
          >
            Featured work
            <ArrowRight size={12} className="text-primary" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
