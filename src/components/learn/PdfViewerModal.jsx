"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import CaptureGuardOverlay from "@/components/common/CaptureGuardOverlay";
import { useAntiCaptureGuard } from "@/lib/useAntiCaptureGuard";
import { useLanguage } from "@/components/layout/LanguageProvider";

export default function PdfViewerModal({ attachment, onClose }) {
  const { t, tf } = useLanguage();
  const obscured = useAntiCaptureGuard(Boolean(attachment));

  useEffect(() => {
    if (!attachment) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [attachment, onClose]);

  if (!attachment) return null;

  const viewerSrc = `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(
    attachment.url
  )}#zoom=page-width`;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      <div className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-border bg-surface px-3 sm:h-16 sm:gap-4 sm:px-5">
        <p className="min-w-0 truncate text-sm font-semibold text-foreground sm:text-base">
          {tf(attachment.title)}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label={t("Close", "إغلاق")}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-foreground transition-colors hover:bg-primary-tint hover:text-primary"
        >
          <X size={18} strokeWidth={1.75} />
        </button>
      </div>

      <div
        onContextMenu={(event) => event.preventDefault()}
        className="relative isolate flex-1 select-none"
      >
        <iframe
          src={viewerSrc}
          title={tf(attachment.title)}
          className="h-full w-full border-0"
        />
        <CaptureGuardOverlay show={obscured} />
      </div>
    </div>
  );
}
