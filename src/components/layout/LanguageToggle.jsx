"use client";

import { Languages } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export default function LanguageToggle({ compact = false }) {
  const { lang, toggleLang, t } = useLanguage();
  const label = t("Switch to Arabic", "التبديل إلى الإنجليزية");

  if (compact) {
    return (
      <button
        type="button"
        onClick={toggleLang}
        aria-label={label}
        title={label}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary/40 hover:text-primary"
      >
        <Languages size={17} strokeWidth={1.75} />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={label}
      className="flex h-9 items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-foreground transition-colors hover:bg-primary-tint hover:text-primary"
    >
      <Languages size={17} strokeWidth={1.75} />
      {lang === "ar" ? "EN" : "AR"}
    </button>
  );
}
