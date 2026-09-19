"use client";

import { useEffect, useRef, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/components/layout/LanguageProvider";

const MONTHS = {
  en: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  ar: [
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ],
};

const WEEKDAYS = {
  en: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  ar: ["ح", "ن", "ث", "ر", "خ", "ج", "س"],
};

function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function isSameDay(a, b) {
  return (
    a &&
    b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function DatePicker({
  label,
  value,
  onChange,
  placeholder,
  error,
}) {
  const { t, lang } = useLanguage();
  const months = MONTHS[lang];
  const weekdays = WEEKDAYS[lang];
  const resolvedPlaceholder = placeholder ?? t("Select date", "اختر تاريخًا");
  const today = new Date();
  const [open, setOpen] = useState(false);
  const [view, setView] = useState("days");
  const [viewYear, setViewYear] = useState(
    value ? value.getFullYear() : today.getFullYear() - 20
  );
  const [viewMonth, setViewMonth] = useState(value ? value.getMonth() : 0);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setView("days");
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const goPrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const goNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const pickDay = (day) => {
    onChange(new Date(viewYear, viewMonth, day));
    setOpen(false);
    setView("days");
  };

  const years = Array.from({ length: 100 }, (_, i) => today.getFullYear() - i);
  const firstWeekday = new Date(viewYear, viewMonth, 1).getDay();
  const total = daysInMonth(viewYear, viewMonth);
  const cells = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: total }, (_, i) => i + 1),
  ];

  const formatted = value
    ? value.toLocaleDateString(lang === "ar" ? "ar-EG" : "en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";

  return (
    <div className="flex flex-col gap-1.5" ref={ref}>
      {label && (
        <label className="text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`flex w-full items-center justify-between gap-2 rounded-control border bg-background px-4 py-2.5 text-left text-base text-foreground transition-colors duration-200 ${
            open
              ? "border-primary ring-4 ring-primary-tint"
              : error
                ? "border-red-400"
                : "border-border hover:border-primary/40"
          }`}
        >
          <span className={value ? "text-foreground" : "text-muted-foreground"}>
            {formatted || resolvedPlaceholder}
          </span>
          <Calendar size={17} className="shrink-0 text-muted-foreground" />
        </button>

        {open && (
          <div className="absolute z-30 mt-2 w-72 rounded-card border border-border bg-background p-3 shadow-lg shadow-foreground/10">
            <div className="flex items-center justify-between px-0.5 pb-2">
              <button
                type="button"
                onClick={goPrevMonth}
                className="flex h-8 w-8 items-center justify-center rounded-full text-foreground transition-colors hover:bg-primary-tint hover:text-primary"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => setView(view === "days" ? "years" : "days")}
                className="rounded-full px-3 py-1 text-sm font-semibold text-foreground transition-colors hover:bg-primary-tint hover:text-primary"
              >
                {months[viewMonth]} {viewYear}
              </button>
              <button
                type="button"
                onClick={goNextMonth}
                className="flex h-8 w-8 items-center justify-center rounded-full text-foreground transition-colors hover:bg-primary-tint hover:text-primary"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {view === "years" ? (
              <div className="custom-scrollbar grid max-h-60 grid-cols-3 gap-1 overflow-y-auto">
                {years.map((year) => (
                  <button
                    key={year}
                    type="button"
                    onClick={() => {
                      setViewYear(year);
                      setView("days");
                    }}
                    className={`rounded-lg px-2 py-2 text-sm transition-colors ${
                      year === viewYear
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-primary-tint"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-7 gap-1 pb-1">
                  {weekdays.map((day, index) => (
                    <span
                      key={index}
                      className="flex h-8 items-center justify-center text-xs font-medium text-muted-foreground"
                    >
                      {day}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {cells.map((day, index) => {
                    if (!day) return <span key={`empty-${index}`} />;
                    const cellDate = new Date(viewYear, viewMonth, day);
                    const selected = isSameDay(cellDate, value);
                    const isToday = isSameDay(cellDate, today);
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => pickDay(day)}
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm transition-colors ${
                          selected
                            ? "bg-primary text-primary-foreground"
                            : isToday
                              ? "bg-primary-tint text-primary"
                              : "text-foreground hover:bg-primary-tint"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
