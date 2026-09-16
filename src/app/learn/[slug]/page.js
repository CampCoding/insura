import { notFound } from "next/navigation";
import LearnCourseView from "@/components/learn/LearnCourseView";
import { COURSES, getCourseBySlug } from "@/lib/site-data";

export function generateStaticParams() {
  return COURSES.map((course) => ({ slug: course.slug }));
}

export default async function LearnCoursePage({ params }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  return <LearnCourseView key={course.slug} course={course} />;
}
