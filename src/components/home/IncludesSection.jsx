"use client";

import { BookOpen, ClipboardCheck, FileText, Video } from "lucide-react";
import Container from "@/components/common/Container";
import Reveal from "@/components/common/Reveal";
import IncludeCard from "@/components/course/IncludeCard";
import { useLanguage } from "@/components/layout/LanguageProvider";

const INCLUDES = [
  {
    icon: Video,
    title: { en: "Video lessons", ar: "دروس فيديو" },
    description: {
      en: "Clinical demonstrations you can rewatch anytime.",
      ar: "عروض إكلينيكية عملية يمكنك إعادة مشاهدتها في أي وقت.",
    },
  },
  {
    icon: FileText,
    title: { en: "PDF resources", ar: "ملفات PDF" },
    description: {
      en: "Reference sheets and protocols to keep on hand.",
      ar: "أوراق مرجعية وبروتوكولات تبقى بحوزتك دائمًا.",
    },
  },
  {
    icon: ClipboardCheck,
    title: { en: "Exam bank", ar: "بنك أسئلة" },
    description: {
      en: "Practice questions to test what you've learned.",
      ar: "أسئلة تدريبية تختبر بها ما تعلمته.",
    },
  },
  {
    icon: BookOpen,
    title: { en: "Clinical notes", ar: "ملاحظات إكلينيكية" },
    description: {
      en: "Concise summaries for quick revision before a session.",
      ar: "ملخصات مختصرة لمراجعة سريعة قبل أي جلسة.",
    },
  },
];

export default function IncludesSection() {
  const { t, tf } = useLanguage();

  return (
    <section className="relative overflow-hidden border-t border-border bg-surface">
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-primary-tint blur-3xl" />
      <Container className="relative py-20">
        <Reveal>
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl">
            {t("What's inside every course", "ما ستجده في كل دورة")}
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {INCLUDES.map(({ icon, title, description }, index) => (
            <Reveal key={title.en} delay={index * 90}>
              <IncludeCard
                icon={icon}
                title={tf(title)}
                description={tf(description)}
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
