"use client";

import Reveal from "@/components/common/Reveal";
import { useLanguage } from "@/components/layout/LanguageProvider";

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden border-t border-border bg-surface">
      <div className="pointer-events-none absolute -left-40 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-primary-tint blur-3xl" />
      <Reveal className="relative mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <h2 className="text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl">
          {t("Who we are", "من نحن")}
        </h2>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          {t(
            "Insura is a training platform built for physiotherapists and rehab specialists. Every course is designed with practicing doctors, structured around real clinical cases, and built so you can learn at your own pace, then apply it the same week in clinic.",
            "Insura منصة تدريب لأخصائيي العلاج الطبيعي وإعادة التأهيل. كل دورة مصمَّمة بالتعاون مع أطباء يمارسون المهنة فعليًا، ومبنية على حالات إكلينيكية حقيقية، لتتعلم بالسرعة التي تناسبك وتطبّقها في العيادة خلال نفس الأسبوع."
          )}
        </p>
      </Reveal>
    </section>
  );
}
