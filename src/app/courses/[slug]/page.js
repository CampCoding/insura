import CourseDetailView from "@/components/course/CourseDetailView";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const title = slug
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
  return { title: `${title} | Insura` };
}

export default async function CoursePage({ params }) {
  const { slug } = await params;
  return <CourseDetailView slug={slug} />;
}
