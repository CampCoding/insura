"use client";

import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import { buildWhatsAppLink, NOTIFICATIONS } from "@/lib/site-data";
import { useNotificationsRead } from "@/lib/useNotificationsRead";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import CoursesDropdown from "./CoursesDropdown";
import { useLanguage } from "./LanguageProvider";
import LanguageToggle from "./LanguageToggle";
import Logo from "./Logo";
import NavLink from "./NavLink";
import ThemeToggle from "./ThemeToggle";

gsap.registerPlugin(ScrollTrigger);

function NotificationsLabel({ label, unreadCount }) {
  return (
    <span className="relative inline-flex items-center">
      {label}
      {unreadCount > 0 && (
        <span className="absolute -top-2.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold leading-none text-white! ring-2 ring-background rtl:-right-3.5 ltr:-right-3.5">
          {unreadCount > 9 ? "9+" : unreadCount}
        </span>
      )}
    </span>
  );
}

export default function Header() {
  const { t } = useLanguage();
  const { isRead } = useNotificationsRead();
  const unreadCount = NOTIFICATIONS.filter((n) => !isRead(n.id)).length;
  const [open, setOpen] = useState(false);
  const barRef = useRef(null);
  const markRef = useRef(null);

  useLayoutEffect(() => {
    const bar = barRef.current;
    const mark = markRef.current;
    if (!bar || !mark) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "+=140",
            scrub: true,
          },
        })
        .to(bar, { height: 64, ease: "none" }, 0)
        .to(mark, { scale: 0.85, ease: "none" }, 0);
    });

    return () => ctx.revert();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <Container className="flex items-center justify-between">
        <div ref={barRef} className="flex h-20 items-center gap-6">
          <div ref={markRef} className="shrink-0">
            <Logo imageClassName="h-12" />
          </div>

          <nav className="hidden items-center gap-2.5 lg:flex">
            <NavLink href="/">{t("Home", "الرئيسية")}</NavLink>
            <CoursesDropdown />
            <NavLink href="/notifications">
              <NotificationsLabel
                label={t("Notifications", "الإشعارات")}
                unreadCount={unreadCount}
              />
            </NavLink>
            <NavLink href="/my-courses">{t("My Courses", "دوراتي")}</NavLink>
          </nav>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <LanguageToggle />
          <Link
            href="/login"
            className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-primary hover:text-primary-foreground"
          >
            {t("Log in", "تسجيل الدخول")}
          </Link>
          <Button
            href={buildWhatsAppLink(
              "Hi, I'd like to know more about the courses",
            )}
            fillColor="#25D366"
            className="!py-2.5 !px-5 whitespace-nowrap text-sm"
          >
            {t("Chat on WhatsApp", "تواصل عبر واتساب")}
          </Button>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <LanguageToggle />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg p-2 text-foreground"
            aria-label={t("Toggle menu", "تبديل القائمة")}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      {open && (
        <nav className="border-t border-border px-4 pb-4 lg:hidden">
          <div className="flex flex-col gap-1 pt-2">
            <NavLink href="/" onClick={() => setOpen(false)} mobile>
              {t("Home", "الرئيسية")}
            </NavLink>
            <NavLink href="/courses" onClick={() => setOpen(false)} mobile>
              {t("Courses", "الدورات")}
            </NavLink>
            <NavLink
              href="/notifications"
              onClick={() => setOpen(false)}
              mobile
            >
              <NotificationsLabel
                label={t("Notifications", "الإشعارات")}
                unreadCount={unreadCount}
              />
            </NavLink>
            <NavLink href="/my-courses" onClick={() => setOpen(false)} mobile>
              {t("My Courses", "كورساتي")}
            </NavLink>
            <NavLink href="/login" onClick={() => setOpen(false)} mobile>
              {t("Log in", "تسجيل الدخول")}
            </NavLink>
          </div>
          <Button
            href={buildWhatsAppLink(
              "Hi, I'd like to know more about the courses",
            )}
            fillColor="#25D366"
            className="mt-3 w-full text-sm"
          >
            {t("Chat on WhatsApp", "تواصل عبر واتساب")}
          </Button>
        </nav>
      )}
    </header>
  );
}
