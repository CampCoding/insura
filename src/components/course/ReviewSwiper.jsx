"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReviewCard from "./ReviewCard";
import "swiper/css";
import "swiper/css/navigation";

export default function ReviewSwiper({ reviews }) {
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);

  return (
    <div>
      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2, spaceBetween: 20 },
        }}
        navigation={{ prevEl, nextEl }}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.name}>
            <ReviewCard review={review} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-5 flex items-center justify-center gap-4">
        <button
          ref={setPrevEl}
          type="button"
          aria-label="Previous review"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary/40 hover:text-primary"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          ref={setNextEl}
          type="button"
          aria-label="Next review"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary/40 hover:text-primary"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
