import CoursesListView from "@/components/course/CoursesListView";
import { COURSES } from "@/lib/site-data";

export const metadata = {
  title: "Courses | Insura",
  description: "Browse Insura medical rehabilitation courses.",
};

export default function CoursesPage() {
  return <CoursesListView courses={COURSES} />;
}
