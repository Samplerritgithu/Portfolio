"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Menu, X } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { navLinks, personal } from "@/lib/data";
import { useScrollSpy, useScrolled } from "@/hooks/useScroll";
import { cn } from "@/lib/utils";

export function Navbar() {
  const scrolled = useScrolled();
  const activeSection = useScrollSpy(navLinks.map((l) => l.href));
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled ? "nav-scrolled" : "bg-transparent",
        )}
      >
        <nav
          className="section-container flex h-16 items-center justify-between md:h-[4.5rem]"
          aria-label="Main navigation"
        >
          <a
            href="#home"
            className="group flex items-baseline gap-1 text-sm font-semibold tracking-tight text-text"
          >
            <span className="text-primary transition-colors group-hover:text-secondary">
              {personal.firstName}
            </span>
            <span className="hidden text-muted sm:inline">.</span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={cn(
                      "relative px-3 py-2 text-sm transition-colors",
                      isActive ? "text-text" : "text-muted hover:text-text",
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-x-3 -bottom-0.5 h-px bg-primary"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-2 lg:flex">
            <NavIcon href={personal.github} label="GitHub">
              <GitHubIcon size={17} />
            </NavIcon>
            <NavIcon href={personal.linkedin} label="LinkedIn">
              <LinkedInIcon size={17} />
            </NavIcon>
            <a
              href={personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 inline-flex items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-sm text-muted transition-all hover:border-border-hover hover:text-text"
            >
              <FileText size={15} />
              Resume
            </a>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border text-text lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-bg-deep/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="absolute right-0 top-0 flex h-full w-[min(100%,20rem)] flex-col border-l border-border bg-bg-surface p-6 pt-20"
              onClick={(e) => e.stopPropagation()}
            >
              <ul className="space-y-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-lg px-3 py-3 text-base text-text transition-colors hover:bg-[var(--hover-surface)]"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-3 border-t border-border pt-6">
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted hover:text-text"
                >
                  GitHub
                </a>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted hover:text-text"
                >
                  LinkedIn
                </a>
                <a
                  href={personal.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary"
                >
                  <FileText size={15} />
                  View Resume
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-all hover:bg-[var(--hover-surface)] hover:text-primary"
    >
      {children}
    </a>
  );
}
