"use client";

import Container from "@/components/common/Container";
import CourseCard from "@/components/course/CourseCard";
import Reveal from "@/components/common/Reveal";
import { useLanguage } from "@/components/layout/LanguageProvider";

export default function CoursesListView({ courses }) {
  const { t } = useLanguage();

  return (
    <Container as="section" className="py-16">
      <Reveal className="max-w-2xl">
        <h1 className="text-4xl font-semibold text-foreground sm:text-5xl md:text-6xl">
          {t("Our courses", "دوراتنا")}
        </h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          {t(
            "Practical rehabilitation courses built with practicing specialists, each one including video lessons, PDF resources, an exam bank and clinical notes.",
            "دورات عملية في إعادة التأهيل مبنية بالتعاون مع متخصصين يمارسون المهنة فعليًا، وتشمل كل دورة دروس فيديو وملفات PDF وبنك أسئلة وملاحظات إكلينيكية."
          )}
        </p>
      </Reveal>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course, index) => (
          <Reveal key={course.slug} delay={index * 80}>
            <CourseCard course={course} />
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
