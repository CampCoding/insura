import { notFound } from "next/navigation";
import LessonPlayerView from "@/components/learn/LessonPlayerView";
import {
  COURSES,
  getCourseBySlug,
  getFlatLessons,
  getLessonByKey,
} from "@/lib/site-data";

export function generateStaticParams() {
  return COURSES.flatMap((course) =>
    getFlatLessons(course).map((lesson) => ({
      slug: course.slug,
      lessonKey: lesson.key,
    }))
  );
}

export default async function LessonPage({ params }) {
  const { slug, lessonKey } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const lesson = getLessonByKey(course, lessonKey);
  if (!lesson) notFound();

  return <LessonPlayerView course={course} lesson={lesson} />;
}
