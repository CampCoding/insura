import { BookOpen, ClipboardCheck, FileText, Video } from "lucide-react";
import Container from "@/components/common/Container";
import Reveal from "@/components/common/Reveal";
import IncludeCard from "@/components/course/IncludeCard";

const INCLUDES = [
  {
    icon: Video,
    title: "Video lessons",
    description: "Clinical demonstrations you can rewatch anytime.",
  },
  {
    icon: FileText,
    title: "PDF resources",
    description: "Reference sheets and protocols to keep on hand.",
  },
  {
    icon: ClipboardCheck,
    title: "Exam bank",
    description: "Practice questions to test what you've learned.",
  },
  {
    icon: BookOpen,
    title: "Clinical notes",
    description: "Concise summaries for quick revision before a session.",
  },
];

export default function IncludesSection() {
  return (
    <section className="relative overflow-hidden border-t border-border bg-surface">
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-primary-tint blur-3xl" />
      <Container className="relative py-20">
        <Reveal>
          <h2 className="text-4xl font-semibold text-foreground md:text-5xl">
            What&apos;s inside every course
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {INCLUDES.map(({ icon, title, description }, index) => (
            <Reveal key={title} delay={index * 90}>
              <IncludeCard
                icon={icon}
                title={title}
                description={description}
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
