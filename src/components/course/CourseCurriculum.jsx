"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, Lock, MonitorPlay } from "lucide-react";
import { formatMinutes } from "@/lib/site-data";
import { useEnrollment } from "@/lib/useEnrollment";

function sectionMinutes(section) {
  return section.lessons.reduce((sum, lesson) => sum + lesson.minutes, 0);
}

export function LessonMarker({ state }) {
  if (state === "done") {
    return (
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <Check size={16} strokeWidth={3} />
      </span>
    );
  }

  if (state === "locked") {
    return (
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-border text-muted-foreground">
        <Lock size={13} strokeWidth={2} />
      </span>
    );
  }

  if (state === "current") {
    return (
      <span className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full border-2 border-primary">
        <span className="absolute inset-y-0 left-0 w-1/2 bg-primary" />
      </span>
    );
  }

  return (
    <span className="h-7 w-7 shrink-0 rounded-full border-2 border-primary/35" />
  );
}

export default function CourseCurriculum({ slug, curriculum }) {
  const [openIndex, setOpenIndex] = useState(0);
  const { enrolled, completed } = useEnrollment(slug);
  const flatKeys = curriculum.flatMap((section, sectionIndex) =>
    section.lessons.map((_, lessonIndex) => `${sectionIndex}-${lessonIndex}`)
  );
  const currentKey = enrolled
    ? flatKeys.find((key) => !completed.includes(key))
    : null;

  return (
    <div className="flex flex-col gap-3">
      {curriculum.map((section, sectionIndex) => {
        const isOpen = openIndex === sectionIndex;
        const sectionDone = section.lessons.filter((_, lessonIndex) =>
          completed.includes(`${sectionIndex}-${lessonIndex}`)
        ).length;

        return (
          <div
            key={section.title}
            className="overflow-hidden rounded-card border border-border bg-background"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : sectionIndex)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 bg-surface px-6 py-5 text-left"
            >
              <span className="text-lg font-semibold text-foreground">
                {section.title}
              </span>
              <span className="flex shrink-0 items-center gap-3 text-sm text-muted-foreground">
                <span>
                  {enrolled
                    ? `${sectionDone}/${section.lessons.length} complete`
                    : `${section.lessons.length} lessons · ${formatMinutes(
                        sectionMinutes(section)
                      )}`}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-primary transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </span>
            </button>

            <div
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <ul className="flex flex-col gap-1 border-t border-border px-6 py-3">
                  {section.lessons.map((lesson, lessonIndex) => {
                    const key = `${sectionIndex}-${lessonIndex}`;
                    const isDone = completed.includes(key);
                    const unlocked = enrolled || lesson.preview;
                    const markerState = isDone
                      ? "done"
                      : !unlocked
                      ? "locked"
                      : key === currentKey
                      ? "current"
                      : "upcoming";
                    const row = (
                      <>
                        <span className="flex min-w-0 flex-1 items-center gap-3">
                          <LessonMarker state={markerState} />
                          <MonitorPlay
                            size={18}
                            className="shrink-0 text-muted-foreground"
                            strokeWidth={1.75}
                          />
                          <span
                            className={`min-w-0 flex-1 text-base md:text-[17px] ${
                              unlocked
                                ? "text-foreground"
                                : "text-muted-foreground"
                            }`}
                          >
                            {lesson.title}
                          </span>
                          {lesson.preview && !enrolled && (
                            <span className="shrink-0 rounded-full bg-primary-tint px-2 py-0.5 text-xs font-medium text-primary">
                              Preview
                            </span>
                          )}
                        </span>
                        <span className="shrink-0 text-sm text-muted-foreground">
                          {formatMinutes(lesson.minutes)}
                        </span>
                      </>
                    );

                    if (unlocked) {
                      return (
                        <li key={lesson.title}>
                          <Link
                            href={`/learn/${slug}/${key}`}
                            className="flex items-center justify-between gap-4 rounded-lg px-1 py-3 transition-colors hover:bg-primary-tint"
                          >
                            {row}
                          </Link>
                        </li>
                      );
                    }

                    return (
                      <li
                        key={lesson.title}
                        className="flex items-center justify-between gap-4 px-1 py-3"
                      >
                        {row}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
