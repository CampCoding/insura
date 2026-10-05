import LessonPlayerView from "@/components/learn/LessonPlayerView";

export default async function LessonPage({ params }) {
  const { slug, lessonKey } = await params;
  return <LessonPlayerView slug={slug} lessonKey={lessonKey} />;
}
