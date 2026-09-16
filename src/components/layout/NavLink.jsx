"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, children, onClick, mobile = false }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  if (mobile) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={`rounded-lg px-3 py-2.5 text-base font-medium transition-colors ${
          isActive
            ? "bg-primary-tint text-primary"
            : "text-foreground hover:bg-primary-tint"
        }`}
      >
        {children}
      </Link>
    );
  }

  if (isActive) {
    return (
      <Link
        href={href}
        className="rounded-full bg-primary px-4 py-1.5 text-base font-medium text-primary-foreground"
      >
        {children}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="rounded-full px-4 py-1.5 text-base font-medium text-foreground transition-colors duration-200 hover:bg-primary hover:text-primary-foreground"
    >
      {children}
    </Link>
  );
}
