"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Download, FileDown, Plus, X } from "lucide-react";
import { useLanguage } from "@/components/layout/LanguageProvider";
import { createDraft, loadDrafts, saveDrafts } from "@/lib/notes";
import "@excalidraw/excalidraw/index.css";

const Excalidraw = dynamic(
  () => import("@excalidraw/excalidraw").then((mod) => mod.Excalidraw),
  { ssr: false }
);

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export default function LessonNotesPanel({
  courseSlug,
  lessonKey,
  lessonTitle = "",
  onClose,
  className = "",
}) {
  const { t } = useLanguage();
  const [drafts, setDrafts] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);

  const saveTimer = useRef(null);

  const activeDraft = drafts.find((d) => d.id === activeId) ?? drafts[0];

  const draftLabel = (n) =>
    lessonTitle
      ? t(`Draft ${n} - ${lessonTitle}`, `مسودة ${n} - ${lessonTitle}`)
      : t(`Draft ${n}`, `مسودة ${n}`);

  useEffect(() => {
    const existing = loadDrafts(courseSlug, lessonKey);
    const initial = existing ?? [createDraft(draftLabel(1))];
    // eslint-disable-next-line react-hooks/set-state-in-effect -- loading persisted drafts requires client-only localStorage access
    setDrafts(initial);
    setActiveId(initial[0].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSlug, lessonKey]);

  // Load the active draft's drawing into the whiteboard whenever it changes
  useEffect(() => {
    if (!excalidrawAPI || !activeDraft) return;
    excalidrawAPI.updateScene({ elements: activeDraft.elements ?? [] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [excalidrawAPI, activeDraft?.id]);

  const handleWhiteboardChange = (elements) => {
    if (!activeDraft) return;
    const targetId = activeDraft.id;
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      setDrafts((prev) => {
        const next = prev.map((d) =>
          d.id === targetId ? { ...d, elements, updatedAt: Date.now() } : d
        );
        saveDrafts(courseSlug, lessonKey, next);
        return next;
      });
    }, 500);
  };

  const handleAddDraft = () => {
    const next = createDraft(draftLabel(drafts.length + 1));
    const nextDrafts = [...drafts, next];
    setDrafts(nextDrafts);
    saveDrafts(courseSlug, lessonKey, nextDrafts);
    setActiveId(next.id);
  };

  const handleDeleteDraft = (id) => {
    if (drafts.length === 1) return;
    const nextDrafts = drafts.filter((d) => d.id !== id);
    setDrafts(nextDrafts);
    saveDrafts(courseSlug, lessonKey, nextDrafts);
    if (activeId === id) setActiveId(nextDrafts[0].id);
  };

  const handleDownloadDraft = async () => {
    if (!excalidrawAPI || !activeDraft) return;
    const elements = excalidrawAPI.getSceneElements();
    if (!elements.length) return;
    const { exportToBlob } = await import("@excalidraw/excalidraw");
    const blob = await exportToBlob({
      elements,
      appState: excalidrawAPI.getAppState(),
      files: excalidrawAPI.getFiles(),
      mimeType: "image/png",
      maxWidthOrHeight: 1600,
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${activeDraft.label}.png`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadAllPdf = async () => {
    const { exportToBlob } = await import("@excalidraw/excalidraw");
    const { jsPDF } = await import("jspdf");

    const drafted = drafts.map((d) =>
      d.id === activeDraft?.id ? excalidrawAPI?.getSceneElements() ?? d.elements : d.elements
    );
    const nonEmpty = drafts
      .map((d, i) => ({ draft: d, elements: drafted[i] }))
      .filter(({ elements }) => elements && elements.length);
    if (!nonEmpty.length) return;

    const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 24;

    for (let i = 0; i < nonEmpty.length; i += 1) {
      const { elements } = nonEmpty[i];
      const blob = await exportToBlob({
        elements,
        appState: { exportBackground: true, viewBackgroundColor: "#ffffff" },
        files: {},
        mimeType: "image/jpeg",
        quality: 0.6,
        maxWidthOrHeight: 1400,
      });
      const dataUrl = await blobToDataUrl(blob);
      const props = pdf.getImageProperties(dataUrl);
      const maxW = pageWidth - margin * 2;
      const maxH = pageHeight - margin * 2;
      const ratio = Math.min(maxW / props.width, maxH / props.height);
      const w = props.width * ratio;
      const h = props.height * ratio;
      const x = (pageWidth - w) / 2;
      const y = (pageHeight - h) / 2;

      if (i > 0) pdf.addPage();
      pdf.addImage(dataUrl, "JPEG", x, y, w, h);
    }

    pdf.save(`${lessonTitle || t("Notes", "الملاحظات")}.pdf`);
  };

  if (!activeDraft) return null;

  return (
    <div className={`flex flex-col bg-surface ${className}`}>
      <div className="flex h-14 shrink-0 items-center justify-between gap-2 border-b border-border px-4">
        <p className="text-sm font-semibold text-foreground">
          {t("Notes", "الملاحظات")}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label={t("Close notes", "إغلاق الملاحظات")}
          className="flex h-8 w-8 items-center justify-center rounded-full text-foreground transition-colors hover:bg-primary-tint hover:text-primary"
        >
          <X size={18} strokeWidth={1.75} />
        </button>
      </div>

      <div className="no-scrollbar flex shrink-0 items-center gap-1.5 overflow-x-auto border-b border-border px-3 py-2">
        {drafts.map((d) => (
          <div
            key={d.id}
            className={`group flex shrink-0 items-center gap-1 rounded-full py-1.5 pl-3 pr-1 text-xs font-medium transition-colors ${
              d.id === activeDraft.id
                ? "bg-primary text-primary-foreground"
                : "bg-primary-tint text-foreground hover:bg-primary/20"
            }`}
          >
            <button
              type="button"
              onClick={() => setActiveId(d.id)}
              className="whitespace-nowrap"
            >
              {d.label}
            </button>
            {drafts.length > 1 && (
              <button
                type="button"
                onClick={() => handleDeleteDraft(d.id)}
                aria-label={t("Delete draft", "حذف المسودة")}
                className={`flex h-5 w-5 items-center justify-center rounded-full ${
                  d.id === activeDraft.id ? "hover:bg-white/20" : "hover:bg-primary/20"
                }`}
              >
                <X size={11} />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddDraft}
          aria-label={t("Add draft", "إضافة مسودة")}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-dashed border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <Plus size={14} />
        </button>
        <span className="mx-0.5 h-5 w-px shrink-0 bg-border" />
        <button
          type="button"
          onClick={handleDownloadDraft}
          aria-label={t("Download this draft", "تحميل هذه المسودة")}
          title={t("Download this draft", "تحميل هذه المسودة")}
          className="flex h-7 shrink-0 items-center gap-1 rounded-full px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-primary-tint hover:text-primary"
        >
          <Download size={13} />
          {t("Download", "تحميل")}
        </button>
        <button
          type="button"
          onClick={handleDownloadAllPdf}
          aria-label={t("Download all drafts as PDF", "تحميل كل المسودات PDF")}
          title={t("Download all drafts as PDF", "تحميل كل المسودات PDF")}
          className="flex h-7 shrink-0 items-center gap-1 rounded-full px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-primary-tint hover:text-primary"
        >
          <FileDown size={13} />
          {t("All (PDF)", "الكل PDF")}
        </button>
      </div>

      <div className="notes-whiteboard min-h-0 flex-1 overflow-hidden">
        <Excalidraw
          excalidrawAPI={(api) => setExcalidrawAPI(api)}
          onChange={handleWhiteboardChange}
          theme="light"
          aiEnabled={false}
          initialData={{ elements: activeDraft.elements ?? [] }}
          UIOptions={{
            canvasActions: {
              changeViewBackgroundColor: false,
              loadScene: false,
              saveToActiveFile: false,
              toggleTheme: false,
              clearCanvas: true,
              export: { saveFileToDisk: true },
              saveAsImage: true,
            },
            tools: { image: false },
          }}
        />
      </div>
    </div>
  );
}
