"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import CaptureGuardOverlay from "@/components/common/CaptureGuardOverlay";
import { useAntiCaptureGuard } from "@/lib/useAntiCaptureGuard";

export default function PdfViewerModal({ attachment, onClose }) {
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

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      <div className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border bg-surface px-5">
        <p className="min-w-0 truncate text-sm font-semibold text-foreground">
          {attachment.title}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
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
          src={`${attachment.url}#toolbar=0`}
          title={attachment.title}
          className="h-full w-full border-0"
        />
        <CaptureGuardOverlay show={obscured} />
      </div>
    </div>
  );
}
