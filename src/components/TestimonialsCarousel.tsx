"use client";

import { useEffect, useRef } from "react";
import { useCarouselStore } from "@/stores/carousel-store";

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export function TestimonialsCarousel({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const total = testimonials.length;
  const index = useCarouselStore((s) => s.index);
  const goTo = useCarouselStore((s) => s.goTo);
  const next = useCarouselStore((s) => s.next);
  const prev = useCarouselStore((s) => s.prev);
  const reset = useCarouselStore((s) => s.reset);
  const startX = useRef(0);
  const dragging = useRef(false);
  const intervalRef = useRef<number | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const indexRef = useRef(index);
  indexRef.current = index;

  useEffect(() => {
    reset();
    return () => reset();
  }, [reset]);

  useEffect(() => {
    const start = () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      intervalRef.current = window.setInterval(() => next(total), 6000);
    };
    start();
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [index, next, total]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onStart = (event: TouchEvent) => {
      startX.current = event.touches[0].clientX;
      dragging.current = true;
    };
    const onEnd = (event: TouchEvent) => {
      if (!dragging.current) return;
      const diff = startX.current - event.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        goTo(indexRef.current + (diff > 0 ? 1 : -1), total);
      }
      dragging.current = false;
    };

    track.addEventListener("touchstart", onStart, { passive: true });
    track.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      track.removeEventListener("touchstart", onStart);
      track.removeEventListener("touchend", onEnd);
    };
  }, [goTo, total]);

  return (
    <div
      className="carousel"
      tabIndex={0}
      onMouseEnter={() => {
        if (intervalRef.current) window.clearInterval(intervalRef.current);
      }}
      onMouseLeave={() => {
        if (intervalRef.current) window.clearInterval(intervalRef.current);
        intervalRef.current = window.setInterval(() => next(total), 6000);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") prev(total);
        if (event.key === "ArrowRight") next(total);
      }}
    >
      <div
        ref={trackRef}
        className="carousel__track"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {testimonials.map((item) => (
          <article className="carousel__slide" key={item.author}>
            <blockquote className="carousel__quote">{item.quote}</blockquote>
            <footer className="carousel__footer">
              <p className="carousel__author">{item.author}</p>
              <p className="carousel__role">{item.role}</p>
            </footer>
          </article>
        ))}
      </div>

      <div className="carousel__controls">
        <button
          type="button"
          className="carousel__btn carousel__btn--prev"
          aria-label="Previous testimonial"
          onClick={() => prev(total)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div className="carousel__dots">
          {testimonials.map((item, i) => (
            <button
              key={item.author}
              type="button"
              className={`carousel__dot${i === index ? " is-active" : ""}`}
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => goTo(i, total)}
            />
          ))}
        </div>
        <button
          type="button"
          className="carousel__btn carousel__btn--next"
          aria-label="Next testimonial"
          onClick={() => next(total)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
