"use client";

import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import CourseCurriculum from "@/components/course/CourseCurriculum";
import { getCourseStats, getFlatLessons, unsplashUrl } from "@/lib/site-data";
import { useEnrollment } from "@/lib/useEnrollment";
import { ClipboardList, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PdfViewerModal from "./PdfViewerModal";

function TabButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-primary-tint hover:text-primary"
      }`}
    >
      {children}
    </button>
  );
}

export default function LearnCourseView({ course }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("content");
  const [openAttachment, setOpenAttachment] = useState(null);
  const { ready, enrolled, completed } = useEnrollment(course.slug);
  const stats = getCourseStats(course);
  const flatLessons = getFlatLessons(course);
  const totalLessons = flatLessons.length;
  const progressPercent = totalLessons
    ? Math.round((completed.length / totalLessons) * 100)
    : 0;
  const nextLesson =
    flatLessons.find((lesson) => !completed.includes(lesson.key)) ??
    flatLessons[0];

  useEffect(() => {
    if (ready && !enrolled) {
      router.replace(`/courses/${course.slug}`);
    }
  }, [ready, enrolled, course.slug, router]);

  if (!ready || !enrolled) return null;

  return (
    <Container as="section" className="py-12">
      <h1 className="text-3xl font-semibold text-foreground md:text-[2.75rem]">
        {course.title}
      </h1>

      <div className="mt-8 flex flex-col gap-8 rounded-card border border-border bg-surface p-6 lg:flex-row lg:items-center lg:gap-10 lg:p-8">
        <div className="w-full overflow-hidden rounded-card lg:w-[440px] lg:shrink-0">
          <Image
            src={unsplashUrl(course.image, 800, 600)}
            alt={course.title}
            width={800}
            height={600}
            priority
            className="h-auto w-full"
          />
        </div>
        <div className="flex flex-col items-start gap-4">
          <p className="text-base text-muted-foreground">
            {stats.sections} sections · {completed.length}/{totalLessons}{" "}
            lessons complete
          </p>
          <p className="text-2xl font-semibold text-foreground md:text-[1.75rem]">
            {nextLesson ? nextLesson.title : "Course complete"}
          </p>
          {nextLesson && (
            <Button href={`/learn/${course.slug}/${nextLesson.key}`}>
              {completed.length ? "Continue lesson" : "Start lesson"}
            </Button>
          )}
        </div>
      </div>

      <div className="mt-14 grid gap-10 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="flex flex-wrap items-center gap-2">
            <TabButton
              active={activeTab === "content"}
              onClick={() => setActiveTab("content")}
            >
              Course content
            </TabButton>
            {course.exam && (
              <TabButton
                active={activeTab === "exam"}
                onClick={() => setActiveTab("exam")}
              >
                Exam
              </TabButton>
            )}
            {course.attachments && (
              <TabButton
                active={activeTab === "attachments"}
                onClick={() => setActiveTab("attachments")}
              >
                Attachments
              </TabButton>
            )}
          </div>

          <div className="mt-5">
            {activeTab === "content" && (
              <CourseCurriculum
                slug={course.slug}
                curriculum={course.curriculum}
              />
            )}

            {activeTab === "exam" && (
              <div className="flex flex-col items-start gap-4 rounded-card border border-border bg-surface p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-tint text-primary">
                  <ClipboardList size={22} strokeWidth={1.75} />
                </div>
                <div>
                  <p className="text-lg font-semibold text-foreground">
                    {course.exam.title}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {course.exam.questions.length} questions · test what
                    you&apos;ve learned across the full course.
                  </p>
                </div>
                <Button href={`/learn/${course.slug}/exam`}>Start Exam</Button>
              </div>
            )}

            {activeTab === "attachments" && (
              <div className="flex flex-col gap-3">
                {course.attachments.map((attachment) => (
                  <button
                    key={attachment.title}
                    type="button"
                    onClick={() => setOpenAttachment(attachment)}
                    className="flex items-center gap-4 rounded-card border border-border bg-surface p-5 text-left transition-colors hover:border-primary/40"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-tint text-primary">
                      <FileText size={20} strokeWidth={1.75} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-base font-semibold text-foreground">
                        {attachment.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        PDF · {attachment.pages} pages
                      </p>
                    </div>
                    <span className="shrink-0 text-sm font-medium text-primary">
                      View
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-card border border-border bg-surface p-6">
            <p className="text-base font-semibold text-foreground">
              {progressPercent}% complete
            </p>
            <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-primary-tint">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="rounded-card border border-border bg-surface p-6">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={unsplashUrl(course.instructor.image, 200, 200)}
                  alt={course.instructor.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-base font-semibold text-foreground">
                  {course.instructor.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {course.instructor.title}
                </p>
              </div>
            </div>
          </div>

          <Link
            href={`/courses/${course.slug}`}
            className="text-center text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground"
          >
            Back to course details
          </Link>
        </div>
      </div>

      <PdfViewerModal
        attachment={openAttachment}
        onClose={() => setOpenAttachment(null)}
      />
    </Container>
  );
}
