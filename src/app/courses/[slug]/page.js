import { notFound } from "next/navigation";
import CourseDetailView from "@/components/course/CourseDetailView";
import { COURSES } from "@/lib/site-data";

export function generateStaticParams() {
  return COURSES.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const course = COURSES.find((c) => c.slug === slug);
  if (!course) return {};
  return {
    title: `${course.title.en} | Insura`,
    description: course.description.en,
  };
}

export default async function CoursePage({ params }) {
  const { slug } = await params;
  const course = COURSES.find((c) => c.slug === slug);
  if (!course) notFound();

  return <CourseDetailView course={course} />;
}
