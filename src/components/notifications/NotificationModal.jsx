"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Calendar, ChevronLeft, ChevronRight, FileText, X } from "lucide-react";
import PdfViewerModal from "@/components/learn/PdfViewerModal";
import { useLanguage } from "@/components/layout/LanguageProvider";

export default function NotificationModal({ notification, onClose }) {
  const { t, tf, lang, isRtl } = useLanguage();
  const [showAttachment, setShowAttachment] = useState(false);
  const ForwardIcon = isRtl ? ChevronLeft : ChevronRight;

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 py-10 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-2xl overflow-hidden rounded-card border border-border bg-surface shadow-xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t("Close", "إغلاق")}
          className="absolute top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-surface/95 text-foreground shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground rtl:left-3 ltr:right-3"
        >
          <X size={18} strokeWidth={1.75} />
        </button>

        <div className="max-h-[85vh] overflow-y-auto">
          <div className="relative mx-auto mt-6 aspect-video w-[calc(100%-3rem)] overflow-hidden rounded-card">
            <Image
              src={notification.image}
              alt={tf(notification.title)}
              fill
              sizes="(min-width: 768px) 640px, 90vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="px-6 pb-8 pt-6 sm:px-10 sm:pb-10">
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
              <Calendar size={14} className="text-primary" />
              {new Date(notification.date).toLocaleDateString(
                lang === "ar" ? "ar-EG" : "en-US",
                { year: "numeric", month: "long", day: "numeric" }
              )}
            </span>

            <h1 className="mt-3 text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
              {tf(notification.title)}
            </h1>

            <p className="mt-5 text-lg leading-9 text-muted-foreground">
              {tf(notification.body)}
            </p>

            {notification.attachment && (
              <button
                type="button"
                onClick={() => setShowAttachment(true)}
                className="group mt-8 flex w-full items-center gap-4 rounded-card border border-border bg-background p-4 text-left transition-colors hover:border-primary/40"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-tint text-primary">
                  <FileText size={19} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-foreground">
                    {tf(notification.attachment.title)}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {t("PDF attachment", "مرفق PDF")}
                  </span>
                </span>
                <ForwardIcon
                  size={16}
                  className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                />
              </button>
            )}
          </div>
        </div>
      </div>

      {notification.attachment && showAttachment && (
        <PdfViewerModal
          attachment={notification.attachment}
          onClose={() => setShowAttachment(false)}
        />
      )}
    </div>
  );
}
