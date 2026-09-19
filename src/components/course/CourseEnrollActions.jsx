"use client";

import Button from "@/components/common/Button";
import { useEnrollment } from "@/lib/useEnrollment";
import { useLanguage } from "@/components/layout/LanguageProvider";

export default function CourseEnrollActions({ slug, whatsappHref, fullWidth }) {
  const { t } = useLanguage();
  const { enrolled, enroll, unenroll } = useEnrollment(slug);

  if (enrolled) {
    return (
      <div className={`flex flex-wrap items-center gap-3 ${fullWidth ? "w-full" : ""}`}>
        <Button href={`/learn/${slug}`} className={fullWidth ? "w-full" : ""}>
          {t("Continue learning", "متابعة التعلّم")}
        </Button>
        <button
          type="button"
          onClick={unenroll}
          className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
        >
          {t("Unenroll (demo)", "إلغاء الاشتراك (تجريبي)")}
        </button>
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap items-center gap-3 ${fullWidth ? "w-full" : ""}`}>
      <Button
        href={whatsappHref}
        fillColor="#25D366"
        className={fullWidth ? "w-full" : ""}
      >
        {t("Subscribe on WhatsApp", "اشترك عبر واتساب")}
      </Button>
      <button
        type="button"
        onClick={enroll}
        className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
      >
        {t("View as enrolled (demo)", "عرض كطالب مشترك (تجريبي)")}
      </button>
    </div>
  );
}
