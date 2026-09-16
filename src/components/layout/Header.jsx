"use client";

import { buildWhatsAppLink } from "@/lib/site-data";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import CoursesDropdown from "./CoursesDropdown";
import Logo from "./Logo";
import NavLink from "./NavLink";
import ThemeToggle from "./ThemeToggle";

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
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
          <div ref={markRef}>
            <Logo imageClassName="h-12" />
          </div>

          <nav className="hidden items-center gap-2.5 md:flex">
            <NavLink href="/">Home</NavLink>
            <CoursesDropdown />
            <NavLink href="/updates">Announcements</NavLink>
            <NavLink href="/my-courses">My Courses</NavLink>
          </nav>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Link
            href="/login"
            className="rounded-full px-4 py-2 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-primary hover:text-primary-foreground"
          >
            Log in
          </Link>
          <Button
            href={buildWhatsAppLink(
              "Hi, I'd like to know more about the courses",
            )}
            fillColor="#25D366"
            className="!py-2.5 !px-5 text-sm"
          >
            Chat on WhatsApp
          </Button>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      {open && (
        <nav className="border-t border-border px-4 pb-4 md:hidden">
          <div className="flex flex-col gap-1 pt-2">
            <NavLink href="/" onClick={() => setOpen(false)} mobile>
              Home
            </NavLink>
            <NavLink href="/courses" onClick={() => setOpen(false)} mobile>
              Courses
            </NavLink>
            <NavLink href="/updates" onClick={() => setOpen(false)} mobile>
              Announcements
            </NavLink>
            <NavLink href="/my-courses" onClick={() => setOpen(false)} mobile>
              My Courses
            </NavLink>
            <NavLink href="/login" onClick={() => setOpen(false)} mobile>
              Log in
            </NavLink>
          </div>
          <Button
            href={buildWhatsAppLink(
              "Hi, I'd like to know more about the courses",
            )}
            fillColor="#25D366"
            className="mt-3 w-full text-sm"
          >
            Chat on WhatsApp
          </Button>
        </nav>
      )}
    </header>
  );
}
