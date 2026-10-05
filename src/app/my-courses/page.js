"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import { useLanguage } from "@/components/layout/LanguageProvider";
import { useAuth } from "@/lib/useAuth";
import { getMyCourses } from "@/lib/progress-api";

export default function MyCoursesPage() {
  const { t, tf } = useLanguage();
  const { ready: authReady, isAuthenticated, session } = useAuth();
  const studentId = session?.student_id;
  const enabled = authReady && isAuthenticated;

  const query = useQuery({
    queryKey: ["my-courses", studentId],
    queryFn: () => getMyCourses(studentId),
    enabled,
  });

  const ready = enabled ? query.isFetched : authReady;
  const courses = query.data ?? [];

  if (!ready) return null;

  if (!isAuthenticated) {
    return (
      <Container as="section" className="py-16">
        <h1 className="text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl">
          {t("My courses", "دوراتي")}
        </h1>
        <div className="mt-8 rounded-card border border-border bg-surface p-10 text-center">
          <p className="text-base text-muted-foreground">
            {t("Log in to see your enrolled courses.", "سجّل الدخول لرؤية دوراتك.")}
          </p>
          <Button href="/login" className="mt-5 w-fit">
            {t("Log in", "تسجيل الدخول")}
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container as="section" className="py-16">
      <h1 className="text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl">
        {t("My courses", "دوراتي")}
      </h1>

      {courses.length === 0 ? (
        <div className="mt-8 rounded-card border border-border bg-surface p-10 text-center">
          <p className="text-base text-muted-foreground">
            {t("You haven't enrolled in any course yet.", "لم تشترك في أي دورة بعد.")}
          </p>
          <Button href="/courses" className="mt-5 w-fit">
            {t("Browse courses", "استعرض الدورات")}
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Link
              key={course.enrollment_id}
              href={`/learn/${course.slug}`}
              className="group flex flex-col overflow-hidden rounded-card border border-border bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={course.image}
                  alt={tf(course.title)}
                  fill
                  sizes="(min-width: 768px) 320px, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-base font-semibold text-foreground">
                  {tf(course.title)}
                </h3>
                <div className="mt-4">
                  <p className="text-xs font-medium text-muted-foreground">
                    {t(`${course.percent}% complete`, `${course.percent}% مكتمل`)}
                  </p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-primary-tint">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-500"
                      style={{ width: `${course.percent}%` }}
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </Container>
  );
}
