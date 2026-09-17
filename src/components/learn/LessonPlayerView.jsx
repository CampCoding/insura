"use client";

import Button from "@/components/common/Button";
import CaptureGuardOverlay from "@/components/common/CaptureGuardOverlay";
import { LessonMarker } from "@/components/course/CourseCurriculum";
import Logo from "@/components/layout/Logo";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { formatMinutes, getFlatLessons, unsplashUrl } from "@/lib/site-data";
import { useAntiCaptureGuard } from "@/lib/useAntiCaptureGuard";
import { useEnrollment } from "@/lib/useEnrollment";
import {
  ChevronLeft,
  ChevronRight,
  MonitorPlay,
  PanelLeftClose,
  PanelLeftOpen,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function sectionMinutes(section) {
  return section.lessons.reduce((sum, item) => sum + item.minutes, 0);
}

export default function LessonPlayerView({ course, lesson }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { ready, enrolled, completed, markLessonComplete } = useEnrollment(
    course.slug,
  );
  const flatLessons = getFlatLessons(course);
  const totalLessons = flatLessons.length;
  const currentIndex = flatLessons.findIndex((l) => l.key === lesson.key);
  const prevLesson = flatLessons[currentIndex - 1];
  const nextLesson = flatLessons[currentIndex + 1];
  const locked = !lesson.preview && !enrolled;
  const progressPercent = totalLessons
    ? Math.round((completed.length / totalLessons) * 100)
    : 0;
  const obscured = useAntiCaptureGuard(true);

  useEffect(() => {
    if (ready && locked) {
      router.replace(`/courses/${course.slug}`);
    }
  }, [ready, locked, course.slug, router]);

  const handleCompleteAndContinue = () => {
    markLessonComplete(lesson.key);
    if (nextLesson) {
      router.push(`/learn/${course.slug}/${nextLesson.key}`);
    } else {
      router.push(`/learn/${course.slug}`);
    }
  };

  if (!ready || locked) return null;

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-background">
      <header className="relative z-30 flex h-16 shrink-0 items-center justify-between gap-2 border-b border-border bg-surface px-3 sm:gap-4 sm:px-4">
        <div className="flex min-w-0 items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => setSidebarOpen((v) => !v)}
            aria-label={sidebarOpen ? "Hide lesson list" : "Show lesson list"}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-foreground transition-colors hover:bg-primary-tint hover:text-primary"
          >
            {sidebarOpen ? (
              <PanelLeftClose size={19} strokeWidth={1.75} />
            ) : (
              <PanelLeftOpen size={19} strokeWidth={1.75} />
            )}
          </button>
          <Logo imageClassName="h-7" className="ml-1 flex" />

          {!sidebarOpen && (
            <div className="group relative ml-1 hidden min-w-0 cursor-default items-center gap-1.5 rounded-full bg-primary-tint px-3 py-1.5 text-primary sm:flex">
              <MonitorPlay size={14} className="shrink-0" strokeWidth={1.75} />
              <span className="max-w-[160px] truncate text-xs font-medium sm:max-w-[220px] sm:text-sm">
                {lesson.title}
              </span>
              <span className="pointer-events-none absolute left-0 top-full z-50 mt-2 w-max max-w-[240px] rounded-lg bg-foreground px-3 py-1.5 text-xs font-normal text-background opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100">
                {lesson.title}
              </span>
            </div>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          <ThemeToggle />
          <Button
            variant="outline"
            href={
              prevLesson ? `/learn/${course.slug}/${prevLesson.key}` : undefined
            }
            aria-label="Previous lesson"
            className={`!px-2.5 !py-2 text-sm sm:!px-4 ${
              !prevLesson ? "pointer-events-none opacity-40" : ""
            }`}
          >
            <ChevronLeft size={16} />
            <span className="hidden sm:inline">Previous Lesson</span>
          </Button>

          {enrolled ? (
            <Button
              onClick={handleCompleteAndContinue}
              className="!px-2.5 !py-2 text-sm sm:!px-4"
            >
              <span className="hidden sm:inline">Complete and Continue</span>
              <span className="sm:hidden">Complete</span>
              <ChevronRight size={16} />
            </Button>
          ) : (
            <Button
              href={`/courses/${course.slug}`}
              className="!px-2.5 !py-2 text-sm sm:!px-4"
            >
              Back to course
            </Button>
          )}
        </div>
      </header>

      <div className="relative flex flex-1 overflow-hidden">
        <div
          onClick={() => setSidebarOpen(false)}
          className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 lg:hidden ${
            sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        />

        <aside
          className={`fixed inset-y-0 left-0 z-50 w-80 overflow-hidden border-r border-border bg-surface transition-all duration-300 ease-in-out lg:static lg:z-auto ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:w-0 lg:border-r-0"
          }`}
        >
        <div className="flex h-full w-80 flex-col">
          <div className="flex shrink-0 items-start justify-between gap-3 border-b border-border px-5 py-4">
            <div className="min-w-0 flex-1">
              <p className="text-lg font-semibold text-foreground">
                {progressPercent}%{" "}
                <span className="text-sm font-medium text-muted-foreground">
                  complete
                </span>
              </p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-primary-tint">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              aria-label="Hide lesson list"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-foreground transition-colors hover:bg-primary-tint hover:text-primary lg:hidden"
            >
              <X size={18} strokeWidth={1.75} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-3">
            {course.curriculum.map((section, sectionIndex) => (
              <div key={section.title} className="mb-4">
                <p className="px-2 py-2 text-sm font-semibold text-foreground">
                  {section.title}{" "}
                  <span className="font-normal text-muted-foreground">
                    ({formatMinutes(sectionMinutes(section))})
                  </span>
                </p>
                <ul className="flex flex-col gap-0.5">
                  {section.lessons.map((item, lessonIndex) => {
                    const key = `${sectionIndex}-${lessonIndex}`;
                    const isDone = completed.includes(key);
                    const isCurrent = key === lesson.key;
                    const itemLocked = !item.preview && !enrolled;
                    const markerState = isDone
                      ? "done"
                      : itemLocked
                        ? "locked"
                        : isCurrent
                          ? "current"
                          : "upcoming";

                    const content = (
                      <>
                        <LessonMarker state={markerState} />
                        <MonitorPlay
                          size={17}
                          className="shrink-0 text-muted-foreground"
                          strokeWidth={1.75}
                        />
                        <span className="min-w-0 flex-1 text-sm">
                          {item.title}{" "}
                          <span className="text-muted-foreground">
                            ({formatMinutes(item.minutes)})
                          </span>
                        </span>
                      </>
                    );

                    if (itemLocked) {
                      return (
                        <li
                          key={item.title}
                          className="flex items-center gap-2.5 rounded-lg px-2 py-2.5 text-muted-foreground"
                        >
                          {content}
                        </li>
                      );
                    }

                    return (
                      <li key={item.title}>
                        <Link
                          href={`/learn/${course.slug}/${key}`}
                          className={`flex items-center gap-2.5 rounded-lg px-2 py-2.5 transition-colors ${
                            isCurrent
                              ? "bg-primary-tint text-primary"
                              : "text-foreground hover:bg-primary-tint"
                          }`}
                        >
                          {content}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
        </aside>

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl px-6 py-8">
            {lesson.preview && !enrolled && (
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-card border border-border bg-primary-tint px-4 py-3 text-sm text-primary">
                <span>This is a free preview lesson.</span>
                <Link
                  href={`/courses/${course.slug}`}
                  className="font-medium underline underline-offset-2"
                >
                  Subscribe to unlock the full course
                </Link>
              </div>
            )}

            <div className="flex items-center gap-2 text-xl font-semibold text-foreground sm:text-2xl">
              <MonitorPlay
                size={22}
                className="shrink-0 text-primary"
                strokeWidth={1.75}
              />
              {lesson.title}
            </div>

            <div
              onContextMenu={(event) => event.preventDefault()}
              className="relative isolate select-none overflow-hidden rounded-card bg-foreground"
            >
              <video
                key={lesson.key}
                controls
                controlsList="nodownload noremoteplayback"
                disablePictureInPicture
                onContextMenu={(event) => event.preventDefault()}
                poster={unsplashUrl(course.image, 1280, 720)}
                className="aspect-video w-full"
              >
                <source
                  src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                  type="video/mp4"
                />
              </video>
              <CaptureGuardOverlay show={obscured} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
