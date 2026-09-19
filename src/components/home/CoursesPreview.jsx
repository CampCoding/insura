"use client";

import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import Reveal from "@/components/common/Reveal";
import CourseCard from "@/components/course/CourseCard";
import CourseSwiper from "@/components/course/CourseSwiper";
import { COURSES } from "@/lib/site-data";
import { useLanguage } from "@/components/layout/LanguageProvider";

export default function CoursesPreview() {
  const { t } = useLanguage();
  const featured = COURSES.slice(0, 3);

  return (
    <Container as="section" className="py-20">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl">
          {t("Our courses", "دوراتنا")}
        </h2>
        <Button href="/courses" variant="outline" className="text-sm">
          {t("View all courses", "عرض جميع الدورات")}
        </Button>
      </Reveal>

      <Reveal delay={80} className="mt-8 lg:hidden">
        <CourseSwiper courses={featured} />
      </Reveal>

      <div className="mt-8 hidden gap-6 lg:grid lg:grid-cols-3">
        {featured.map((course, index) => (
          <Reveal key={course.slug} delay={index * 90}>
            <CourseCard course={course} />
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
