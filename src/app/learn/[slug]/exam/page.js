import { notFound } from "next/navigation";
import ExamView from "@/components/learn/ExamView";
import { COURSES, getCourseBySlug } from "@/lib/site-data";

export function generateStaticParams() {
  return COURSES.filter((course) => course.exam).map((course) => ({
    slug: course.slug,
  }));
}

export default async function ExamPage({ params }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course || !course.exam) notFound();

  return <ExamView key={course.slug} course={course} />;
}
