"use client";

import Button from "@/components/common/Button";
import { useEnrollment } from "@/lib/useEnrollment";

export default function CourseEnrollActions({ slug, whatsappHref, fullWidth }) {
  const { enrolled, enroll, unenroll } = useEnrollment(slug);

  if (enrolled) {
    return (
      <div className={`flex flex-wrap items-center gap-3 ${fullWidth ? "w-full" : ""}`}>
        <Button href={`/learn/${slug}`} className={fullWidth ? "w-full" : ""}>
          Continue learning
        </Button>
        <button
          type="button"
          onClick={unenroll}
          className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
        >
          Unenroll (demo)
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
        Subscribe on WhatsApp
      </Button>
      <button
        type="button"
        onClick={enroll}
        className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
      >
        View as enrolled (demo)
      </button>
    </div>
  );
}
