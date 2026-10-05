"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  number: string;
  title: string;
  description: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  number,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center mx-auto max-w-2xl",
        className,
      )}
    >
      <span className="mb-3 inline-block font-mono text-xs tracking-[0.2em] text-primary uppercase">
        {number}
      </span>
      <h2 className="text-3xl font-semibold tracking-tight text-text md:text-4xl">
        {title}
      </h2>
      <p className="mt-3 max-w-xl text-base leading-relaxed text-muted md:text-lg">
        {description}
      </p>
    </motion.div>
  );
}
