"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import {
  getCourseBySlug,
  getFlatLessons,
  unsplashUrl,
} from "@/lib/site-data";
import {
  ENROLLMENT_EVENT,
  getCompletedLessons,
  getEnrolledSlugs,
} from "@/lib/enrollment";

function readEnrolledCourses() {
  return getEnrolledSlugs()
    .map((slug) => getCourseBySlug(slug))
    .filter(Boolean)
    .map((course) => {
      const total = getFlatLessons(course).length;
      const done = getCompletedLessons(course.slug).length;
      return {
        course,
        progress: total ? Math.round((done / total) * 100) : 0,
      };
    });
}

export default function MyCoursesPage() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const sync = () => setEnrolledCourses(readEnrolledCourses());
    sync();
    window.addEventListener(ENROLLMENT_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(ENROLLMENT_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return (
    <Container as="section" className="py-16">
      <h1 className="text-4xl font-semibold text-foreground md:text-5xl">
        My courses
      </h1>

      {enrolledCourses.length === 0 ? (
        <div className="mt-8 rounded-card border border-border bg-surface p-10 text-center">
          <p className="text-base text-muted-foreground">
            You haven&apos;t enrolled in any course yet.
          </p>
          <Button href="/courses" className="mt-5 w-fit">
            Browse courses
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {enrolledCourses.map(({ course, progress }) => (
            <Link
              key={course.slug}
              href={`/learn/${course.slug}`}
              className="group flex flex-col overflow-hidden rounded-card border border-border bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={unsplashUrl(course.image, 640, 400)}
                  alt={course.title}
                  fill
                  sizes="(min-width: 768px) 320px, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-base font-semibold text-foreground">
                  {course.title}
                </h3>
                <div className="mt-4">
                  <p className="text-xs font-medium text-muted-foreground">
                    {progress}% complete
                  </p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-primary-tint">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-500"
                      style={{ width: `${progress}%` }}
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
