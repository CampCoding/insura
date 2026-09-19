"use client";

import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import Reveal from "@/components/common/Reveal";
import { buildWhatsAppLink } from "@/lib/site-data";
import { useLanguage } from "@/components/layout/LanguageProvider";

export default function ContactCta() {
  const { t } = useLanguage();

  return (
    <Container as="section" className="py-20">
      <Reveal className="flex flex-col items-center gap-6 rounded-card border border-border bg-primary-tint px-6 py-14 text-center">
        <h2 className="max-w-2xl text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl">
          {t("Have a question about a course?", "عندك سؤال عن إحدى الدورات؟")}
        </h2>
        <p className="max-w-md text-sm leading-6 text-muted-foreground">
          {t(
            "Message us directly on WhatsApp and we'll help you pick the right course.",
            "راسلنا مباشرة عبر واتساب وسنساعدك على اختيار الدورة المناسبة."
          )}
        </p>
        <Button
          href={buildWhatsAppLink("Hi, I'd like to know more about the courses")}
          fillColor="#25D366"
        >
          {t("Chat on WhatsApp", "تواصل عبر واتساب")}
        </Button>
      </Reveal>
    </Container>
  );
}
