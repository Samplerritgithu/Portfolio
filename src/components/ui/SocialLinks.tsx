"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { personal } from "@/lib/data";
import { cn } from "@/lib/utils";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";

interface SocialIconProps {
  type: "github" | "linkedin" | "email";
  href: string;
  label: string;
  size?: number;
  className?: string;
}

export function SocialIcon({
  type,
  href,
  label,
  size = 18,
  className,
}: SocialIconProps) {
  return (
    <motion.a
      href={href}
      target={type === "email" ? undefined : "_blank"}
      rel={type === "email" ? undefined : "noopener noreferrer"}
      aria-label={label}
      whileHover={{ y: -2, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted transition-colors hover:border-border-hover hover:text-primary hover:bg-primary/5",
        className,
      )}
    >
      {type === "github" && <GitHubIcon size={size} />}
      {type === "linkedin" && <LinkedInIcon size={size} />}
      {type === "email" && <Mail size={size} strokeWidth={1.75} />}
    </motion.a>
  );
}

export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <SocialIcon type="github" href={personal.github} label="GitHub profile" />
      <SocialIcon
        type="linkedin"
        href={personal.linkedin}
        label="LinkedIn profile"
      />
      <SocialIcon
        type="email"
        href={`mailto:${personal.email}`}
        label="Send email"
      />
    </div>
  );
}
