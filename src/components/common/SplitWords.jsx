"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

export default function SplitWords({
  text,
  className = "",
  wordClassName = "",
  delay = 0,
}) {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const words = container.querySelectorAll("[data-word-inner]");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(words, { yPercent: 0, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          delay: delay / 1000,
          ease: "power3.out",
          stagger: 0.045,
        }
      );
    }, container);

    return () => ctx.revert();
  }, [delay]);

  const words = text.split(" ");

  return (
    <span ref={containerRef} className={className}>
      {words.map((word, i) => (
        <span key={i}>
          <span className="inline-block overflow-hidden pb-1 align-top">
            <span
              data-word-inner
              className={`inline-block will-change-transform ${wordClassName}`}
            >
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
