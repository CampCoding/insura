"use client";

import { COURSES } from "@/lib/site-data";
import { gsap } from "gsap";
import { ChevronDown, Clock } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const PREVIEW_COURSES = COURSES.slice(0, 5);

export default function CoursesDropdown() {
  const pathname = usePathname();
  const isActive = pathname.startsWith("/courses");
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState(null);
  const triggerRef = useRef(null);
  const panelRef = useRef(null);
  const closeTimer = useRef(null);

  useLayoutEffect(() => {
    if (!open || !panelRef.current) return;
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, y: -8, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: "power2.out" },
    );
  }, [open]);

  const openNow = () => {
    clearTimeout(closeTimer.current);
    const rect = triggerRef.current?.getBoundingClientRect();
    if (rect) {
      setCoords({ top: rect.bottom + 8, left: rect.left });
    }
    setOpen(true);
  };

  const closeSoon = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      ref={triggerRef}
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
    >
      <button
        type="button"
        onClick={() => (open ? setOpen(false) : openNow())}
        className={`flex items-center gap-1 rounded-full px-4 py-1.5 text-base font-medium transition-colors duration-200 ${
          isActive
            ? "bg-primary text-primary-foreground"
            : "text-foreground hover:bg-primary hover:text-primary-foreground"
        }`}
      >
        Courses
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open &&
        coords &&
        createPortal(
          <div
            ref={panelRef}
            onMouseEnter={openNow}
            onMouseLeave={closeSoon}
            style={{ top: coords.top, left: coords.left }}
            className="fixed z-50 w-80 rounded-2xl border border-border bg-background p-2 shadow-lg shadow-foreground/10"
          >
            {PREVIEW_COURSES.map((course) => (
              <Link
                key={course.slug}
                href={`/courses/${course.slug}`}
                className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-primary-tint"
              >
                <span className="text-sm font-medium text-foreground">
                  {course.title}
                </span>
                <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                  <Clock size={12} />
                  {course.duration}
                </span>
              </Link>
            ))}
            <Link
              href="/courses"
              className="mt-1 block rounded-xl px-3 py-2.5 text-center text-sm font-medium text-primary hover:bg-primary-tint"
            >
              View all courses
            </Link>
          </div>,
          document.body,
        )}
    </div>
  );
}
