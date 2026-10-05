"use client";

import Button from "@/components/common/Button";
import { useLanguage } from "@/components/layout/LanguageProvider";

// isEnrolled comes from the course the parent already fetched
// (read_course.php's isEnrolled, true server-side ownership check) -- there
// is no self-service "enroll" endpoint; a real subscription only happens
// after the student contacts the team on WhatsApp and an admin creates it.
export default function CourseEnrollActions({ slug, isEnrolled, whatsappHref, fullWidth }) {
  const { t } = useLanguage();

  if (isEnrolled) {
    return (
      <Button href={`/learn/${slug}`} className={fullWidth ? "w-full" : ""}>
        {t("Continue learning", "متابعة التعلّم")}
      </Button>
    );
  }

  return (
    <Button href={whatsappHref} fillColor="#25D366" className={fullWidth ? "w-full" : ""}>
      {t("Subscribe on WhatsApp", "اشترك عبر واتساب")}
    </Button>
  );
}
