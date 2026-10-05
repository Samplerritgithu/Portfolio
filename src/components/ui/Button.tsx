"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ComponentPropsWithoutRef<"a"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  showArrow?: boolean;
  children: ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:shadow-[0_0_24px_var(--glow-primary)] border border-primary/20",
  secondary:
    "bg-bg-elevated text-text border border-border hover:border-border-hover hover:bg-bg-surface hover:shadow-[var(--shadow-soft)]",
  ghost: "text-muted hover:text-text hover:bg-[var(--hover-surface)]",
  outline:
    "border border-border text-text hover:border-primary/40 hover:text-primary bg-transparent",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-5 py-2.5 text-sm gap-2",
  lg: "px-6 py-3 text-base gap-2",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  showArrow = false,
  children,
  ...props
}: ButtonProps) {
  return (
    <a
      className={cn(
        "group inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
      {showArrow && (
        <span
          aria-hidden
          className="inline-block transition-transform duration-200 group-hover:translate-x-1"
        >
          →
        </span>
      )}
    </a>
  );
}
