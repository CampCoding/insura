import Container from "@/components/common/Container";
import CourseCard from "@/components/course/CourseCard";
import Reveal from "@/components/common/Reveal";
import { COURSES } from "@/lib/site-data";

export const metadata = {
  title: "Courses | Insura",
  description: "Browse Insura medical rehabilitation courses.",
};

export default function CoursesPage() {
  return (
    <Container as="section" className="py-16">
      <Reveal className="max-w-2xl">
        <h1 className="text-4xl font-semibold text-foreground sm:text-5xl md:text-6xl">
          Our courses
        </h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          Practical rehabilitation courses built with practicing specialists,
          each one including video lessons, PDF resources, an exam bank and
          clinical notes.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {COURSES.map((course, index) => (
          <Reveal key={course.slug} delay={index * 80}>
            <CourseCard course={course} />
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
