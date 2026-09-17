"use client";

import { useEffect } from "react";

export default function ThemeSync() {
  useEffect(() => {
    let stored = null;
    try {
      stored = window.localStorage.getItem("insura-theme");
    } catch {
      return;
    }

    if (stored !== "light" && stored !== "dark") return;
    if (document.documentElement.getAttribute("data-theme") === stored) return;

    document.documentElement.setAttribute("data-theme", stored);
  }, []);

  return null;
}
