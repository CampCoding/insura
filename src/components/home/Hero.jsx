"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { buildWhatsAppLink, unsplashUrl } from "@/lib/site-data";
import SplitWords from "@/components/common/SplitWords";
import { useLanguage } from "@/components/layout/LanguageProvider";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const subtextRef = useRef(null);
  const ctaRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const subtext = subtextRef.current;
    const buttons = ctaRef.current ? [...ctaRef.current.children] : [];
    if (!section || !image) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set([subtext, ...buttons], { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(image, {
        y: 80,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap
        .timeline({ delay: 0.55 })
        .fromTo(
          subtext,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
        )
        .fromTo(
          buttons,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.1 },
          "-=0.4"
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center overflow-hidden py-24 sm:py-28 lg:h-dvh lg:py-0"
    >
      <div ref={imageRef} className="absolute inset-0 scale-110">
        <Image
          src={unsplashUrl("1770836037622-11643462bc1d", 1920, 1200)}
          alt="Surgeon focused on a procedure in an operating room"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 65% at 50% 62%, rgba(15, 39, 71, 0.9) 0%, rgba(15, 39, 71, 0.58) 45%, rgba(15, 39, 71, 0.22) 100%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-4xl px-4 text-center sm:px-6">
        <SplitWords
          text={t(
            "Rehab training, taught by specialists who still practice it.",
            "تدريب في إعادة التأهيل، يقدّمه متخصصون ما زالوا يمارسون المهنة."
          )}
          className="mx-auto block font-display text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
        />
        <p
          ref={subtextRef}
          className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/80 sm:mt-6 sm:text-base sm:leading-7"
        >
          {t(
            "Video lessons, downloadable PDFs, exam banks and clinical notes for physiotherapists building a stronger rehab practice.",
            "فيديوهات تعليمية، ملفات PDF قابلة للتحميل، بنك أسئلة امتحانات وملاحظات إكلينيكية لأخصائيي العلاج الطبيعي الراغبين في تطوير ممارستهم المهنية."
          )}
        </p>
        <div
          ref={ctaRef}
          className="mt-6 flex flex-wrap justify-center gap-2.5 sm:mt-9 sm:gap-3"
        >
          <Link
            href={buildWhatsAppLink(
              "Hi, I'd like to know more about the courses"
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shimmer inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#0f2747] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#25D366] hover:text-white active:scale-[0.98] sm:px-6 sm:py-3 sm:text-[15px]"
            style={{ "--shimmer-color": "rgba(15, 39, 71, 0.12)" }}
          >
            {t("Chat on WhatsApp", "تواصل عبر واتساب")}
          </Link>
          <Link
            href="/courses"
            className="btn-shimmer inline-flex items-center justify-center rounded-full border border-white/50 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white active:scale-[0.98] sm:px-6 sm:py-3 sm:text-[15px]"
          >
            {t("Browse courses", "استعرض الدورات")}
          </Link>
        </div>
      </div>
    </section>
  );
}
