import LearnCourseView from "@/components/learn/LearnCourseView";

export default async function LearnCoursePage({ params }) {
  const { slug } = await params;
  return <LearnCourseView slug={slug} />;
}
