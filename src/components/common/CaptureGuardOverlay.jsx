"use client";

import { ShieldAlert } from "lucide-react";
import { useLanguage } from "@/components/layout/LanguageProvider";

export default function CaptureGuardOverlay({ show }) {
  const { t } = useLanguage();

  if (!show) return null;

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-background/95 backdrop-blur-md">
      <ShieldAlert size={26} className="text-muted-foreground" strokeWidth={1.75} />
      <p className="text-sm font-medium text-muted-foreground">
        {t("Content hidden while unfocused", "المحتوى مخفي أثناء عدم التركيز")}
      </p>
    </div>
  );
}
