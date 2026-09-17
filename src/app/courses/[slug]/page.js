import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Clock,
  Video,
  FileText,
  ClipboardCheck,
  BookOpen,
  Layers,
  ListChecks,
} from "lucide-react";
import Container from "@/components/common/Container";
import CourseEnrollActions from "@/components/course/CourseEnrollActions";
import IncludeCard from "@/components/course/IncludeCard";
import CourseCurriculum from "@/components/course/CourseCurriculum";
import ReviewSwiper from "@/components/course/ReviewSwiper";
import Reveal from "@/components/common/Reveal";
import {
  COURSES,
  buildWhatsAppLink,
  getCourseStats,
  unsplashUrl,
} from "@/lib/site-data";

export function generateStaticParams() {
  return COURSES.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const course = COURSES.find((c) => c.slug === slug);
  if (!course) return {};
  return {
    title: `${course.title} | Insura`,
    description: course.description,
  };
}

export default async function CoursePage({ params }) {
  const { slug } = await params;
  const course = COURSES.find((c) => c.slug === slug);
  if (!course) notFound();

  const stats = getCourseStats(course);

  const includes = [
    { icon: Video, label: "Video lessons", value: `${stats.lessons} lessons` },
    { icon: FileText, label: "PDF resources", value: `${course.includes.pdfs} files` },
    { icon: ClipboardCheck, label: "Exam bank", value: "Included" },
    { icon: BookOpen, label: "Clinical notes", value: "Included" },
  ];

  const whatsappHref = buildWhatsAppLink(
    `Hi, I'd like to subscribe to the "${course.title}" course.`
  );

  return (
    <>
      <Container as="section" className="grid items-center gap-12 pt-14 pb-16 lg:grid-cols-2">
        <Reveal>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-tint px-3 py-1 text-sm font-medium text-primary">
            <Clock size={13} />
            {course.duration}
          </span>
          <h1 className="mt-4 text-5xl font-semibold leading-tight text-foreground md:text-6xl">
            {course.title}
          </h1>
          <p className="mt-4 max-w-md text-base leading-7 text-muted-foreground">
            {course.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <span className="text-2xl font-semibold text-primary">
              {course.price}
            </span>
            <CourseEnrollActions slug={course.slug} whatsappHref={whatsappHref} />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative aspect-4/3 overflow-hidden rounded-card">
            <Image
              src={unsplashUrl(course.image, 900, 700)}
              alt={course.title}
              fill
              priority
              sizes="(min-width: 1024px) 480px, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </Container>

      <section className="border-t border-border bg-surface">
        <Container className="py-16">
          <Reveal>
            <h2 className="text-4xl font-semibold text-foreground md:text-5xl">
              What&apos;s included
            </h2>
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {includes.map(({ icon, label, value }, index) => (
              <Reveal key={label} delay={index * 80}>
                <IncludeCard icon={icon} title={label} description={value} compact />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Container as="section" className="py-16">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Reveal>
              <h2 className="text-4xl font-semibold text-foreground md:text-5xl">
                Course content
              </h2>
            </Reveal>

            <Reveal
              delay={60}
              className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-2 text-base text-muted-foreground"
            >
              <span className="flex items-center gap-1.5">
                <Layers size={15} className="text-primary" />
                {stats.sections} sections
              </span>
              <span className="flex items-center gap-1.5">
                <ListChecks size={15} className="text-primary" />
                {stats.lessons} lessons
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={15} className="text-primary" />
                {stats.duration} total
              </span>
            </Reveal>

            <Reveal delay={120} className="mt-6">
              <CourseCurriculum slug={course.slug} curriculum={course.curriculum} />
            </Reveal>
          </div>

          <Reveal delay={100} className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-card border border-border bg-surface p-6">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-tint px-3 py-1 text-sm font-medium text-primary">
                <Clock size={13} />
                {course.duration}
              </span>
              <p className="mt-4 text-2xl font-semibold text-primary">
                {course.price}
              </p>
              <div className="mt-5">
                <CourseEnrollActions
                  slug={course.slug}
                  whatsappHref={whatsappHref}
                  fullWidth
                />
              </div>

              <ul className="mt-6 flex flex-col gap-3 border-t border-border pt-6 text-base text-muted-foreground">
                <li>{stats.lessons} video lessons</li>
                <li>{course.includes.pdfs} PDF resources</li>
                <li>Exam bank included</li>
                <li>Clinical notes included</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>

      <section className="border-t border-border bg-surface">
        <Container className="flex flex-col items-center gap-6 py-16 text-center sm:flex-row sm:items-start sm:text-left">
          <Reveal className="shrink-0">
            <div className="relative h-28 w-28 overflow-hidden rounded-full">
              <Image
                src={unsplashUrl(course.instructor.image, 300, 300)}
                alt={course.instructor.name}
                fill
                sizes="112px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-lg font-semibold text-foreground">
              {course.instructor.name}
            </p>
            <p className="mt-1 text-base font-medium text-primary">
              {course.instructor.title}
            </p>
            <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
              {course.instructor.bio}
            </p>
          </Reveal>
        </Container>
      </section>

      <Container as="section" className="py-16">
        <Reveal>
          <h2 className="text-4xl font-semibold text-foreground md:text-5xl">
            What students say
          </h2>
        </Reveal>
        <Reveal delay={80} className="mt-6">
          <ReviewSwiper reviews={course.reviews.slice(0, 5)} />
        </Reveal>
      </Container>

      <Container as="section" className="pb-20">
        <Reveal className="flex flex-col items-start gap-4 rounded-card border border-border bg-primary-tint p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-base font-medium text-foreground">
            Ready to start? Subscribe now for {course.price}.
          </p>
          <CourseEnrollActions slug={course.slug} whatsappHref={whatsappHref} />
        </Reveal>
      </Container>
    </>
  );
}
