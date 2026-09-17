"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Moon, Sun } from "lucide-react";

function getInitialIsDark() {
  if (typeof document === "undefined") return false;
  const stored = window.localStorage.getItem("insura-theme");
  if (stored) return stored === "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export default function ThemeToggle({ className = "" }) {
  const [isDark, setIsDark] = useState(false);
  const sunRef = useRef(null);
  const moonRef = useRef(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- must run only after hydration, not in the initializer, to avoid an SSR/client mismatch
    setIsDark(getInitialIsDark());
  }, []);

  const animateSwap = (nextIsDark) => {
    const sun = sunRef.current;
    const moon = moonRef.current;
    if (!sun || !moon) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const activeEl = nextIsDark ? sun : moon;
    const inactiveEl = nextIsDark ? moon : sun;

    const tl = gsap.timeline();
    tl.to(
      inactiveEl,
      { y: -16, opacity: 0, duration: 0.25, ease: "power2.in" },
      0
    ).fromTo(
      activeEl,
      { y: 16, opacity: 0, scale: 0.5 },
      { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: "back.out(3)" },
      0.08
    );
  };

  const toggle = () => {
    const next = !isDark;
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    window.localStorage.setItem("insura-theme", next ? "dark" : "light");
    animateSwap(next);
    setIsDark(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-border text-foreground transition-colors hover:border-primary/40 hover:text-primary ${className}`}
    >
      <span
        ref={sunRef}
        className={`absolute inset-0 flex items-center justify-center ${
          isDark ? "opacity-100" : "opacity-0"
        }`}
      >
        <Sun size={17} />
      </span>
      <span
        ref={moonRef}
        className={`absolute inset-0 flex items-center justify-center ${
          isDark ? "opacity-0" : "opacity-100"
        }`}
      >
        <Moon size={17} />
      </span>
    </button>
  );
}
