"use client";

import { useCallback, useEffect, useState } from "react";

export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}

/** Navbar height + small buffer — section active once its top crosses this line */
const SPY_OFFSET = 100;

export function useScrollSpy(sectionIds: string[]) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");
  const idsKey = sectionIds.join("|");

  const resolveActive = useCallback(() => {
    const ids = idsKey.split("|").filter(Boolean);
    if (!ids.length) return "";

    const scrollBottom = window.scrollY + window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    // Bottom of page → last section (Contact)
    if (scrollBottom >= docHeight - 48) {
      return ids[ids.length - 1] ?? "";
    }

    // Active = last section whose top is at or above the spy line
    let current = ids[0] ?? "";
    for (const id of ids) {
      const el = document.getElementById(id.replace("#", ""));
      if (!el) continue;
      const top = el.getBoundingClientRect().top + window.scrollY;
      if (top <= window.scrollY + SPY_OFFSET) {
        current = id.startsWith("#") ? id : `#${id}`;
      } else {
        break;
      }
    }
    return current;
  }, [idsKey]);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      setActiveId(resolveActive());
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("hashchange", update);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("hashchange", update);
    };
  }, [resolveActive]);

  /** Call on nav click so highlight updates immediately from user interaction */
  const activate = useCallback((href: string) => {
    setActiveId(href);
  }, []);

  return { activeId, activate };
}
