"use client";

import Image from "next/image";
import Container from "@/components/common/Container";
import Reveal from "@/components/common/Reveal";
import { unsplashUrl } from "@/lib/site-data";
import { useLanguage } from "@/components/layout/LanguageProvider";

const DIFFERENTIATORS = [
  {
    title: {
      en: "No More Passive Watching",
      ar: "نهاية المشاهدة السلبية",
    },
    subheading: {
      en: "A clear path, not random videos",
      ar: "مسار واضح، لا فيديوهات عشوائية",
    },
    description: {
      en: "Every course follows one deliberate order: assessment, then protocol, then real cases. Each lesson builds on the one before it, so nothing gets left for you to piece together on your own.",
      ar: "تسير كل دورة بترتيب واحد مدروس: التقييم، ثم البروتوكول، ثم حالات حقيقية. يُبنى كل درس على ما سبقه، فلا يُترك لك شيء لتجمعه بنفسك.",
    },
    image: "1785688193082-61936b9f1a50",
  },
  {
    title: {
      en: "You'll Understand the Why",
      ar: "ستفهم السبب، لا الخطوة فقط",
    },
    subheading: {
      en: "The reasoning behind the protocol",
      ar: "المنطق وراء البروتوكول",
    },
    description: {
      en: "Any video can show you an exercise. We show you why it works on this patient and not the next one, so you can adapt it the day a real case doesn't match the textbook.",
      ar: "أي فيديو يمكن أن يعرض عليك تمرينًا. نحن نوضح لك سبب نجاحه مع هذه الحالة تحديدًا، لتتمكن من التكيف عندما لا تُطابق حالة حقيقية ما ورد في الكتاب.",
    },
    image: "1513224502586-d1e602410265",
  },
  {
    title: {
      en: "Ready for Real Patients",
      ar: "جاهز للتعامل مع مرضى حقيقيين",
    },
    subheading: {
      en: "Case studies, not just theory",
      ar: "دراسات حالة، لا نظريات فقط",
    },
    description: {
      en: "Every course closes with real, messy clinical cases pulled from actual practice, worked through the same way you'll need to think on your first day back in clinic.",
      ar: "تُختتم كل دورة بحالات إكلينيكية حقيقية وغير مرتبة، مأخوذة من الواقع العملي، ونتعامل معها بالطريقة نفسها التي ستفكر بها في أول يوم تعود فيه إلى العيادة.",
    },
    image: "1766325693394-138c599bd739",
  },
];

export default function DifferentiatorsSection() {
  const { t, tf } = useLanguage();

  return (
    <Container as="section" className="py-20">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl">
          {t("What makes Insura different", "ما يميز Insura")}
        </h2>
      </Reveal>

      <div className="mt-16 flex flex-col gap-16">
        {DIFFERENTIATORS.map((item, index) => {
          const isReversed = index % 2 === 1;
          return (
            <div
              key={item.title.en}
              className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
            >
              <Reveal className={isReversed ? "lg:order-2" : ""}>
                <div className="relative aspect-video overflow-hidden rounded-card">
                  <Image
                    src={unsplashUrl(item.image, 900, 600)}
                    alt={tf(item.title)}
                    fill
                    sizes="(min-width: 1024px) 560px, 100vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>

              <Reveal delay={100} className={isReversed ? "lg:order-1" : ""}>
                <p className="text-sm font-medium text-primary">
                  {tf(item.subheading)}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-foreground sm:text-2xl md:text-3xl">
                  {tf(item.title)}
                </h3>
                <p className="mt-4 text-base leading-7 text-muted-foreground">
                  {tf(item.description)}
                </p>
              </Reveal>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
