"use client";

import { Star } from "lucide-react";
import { useLanguage } from "@/components/layout/LanguageProvider";

function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function ReviewCard({ review }) {
  const { tf } = useLanguage();

  return (
    <div className="flex h-full gap-4 rounded-card border border-border bg-surface p-6">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-tint text-sm font-semibold text-primary">
        {getInitials(review.name)}
      </span>

      <div className="min-w-0">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              size={14}
              className="fill-primary text-primary"
            />
          ))}
        </div>

        <p className="mt-2 text-base leading-7 text-foreground">
          &quot;{tf(review.quote)}&quot;
        </p>

        <p className="mt-4 text-base font-semibold text-foreground">
          {review.name}
        </p>
        <p className="text-base text-muted-foreground">{tf(review.role)}</p>
      </div>
    </div>
  );
}
