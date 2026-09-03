"use client";

import { useEffect, useRef, useState } from "react";

export type Engagement = {
  src: string;
  title: string;
  caption: string;
};

function wrap(index: number, total: number): number {
  if (total <= 0) return 0;
  return ((index % total) + total) % total;
}

export function EngagementsGallery({ items }: { items: Engagement[] }) {
  const total = items.length;
  const [index, setIndex] = useState(0);
  const startX = useRef(0);
  const dragging = useRef(false);
  const intervalRef = useRef<number | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const indexRef = useRef(index);
  indexRef.current = index;

  const goTo = (nextIndex: number) => setIndex(wrap(nextIndex, total));
  const next = () => goTo(indexRef.current + 1);
  const prev = () => goTo(indexRef.current - 1);

  useEffect(() => {
    const start = () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      if (total <= 1) return;
      intervalRef.current = window.setInterval(() => next(), 7000);
    };
    start();
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [index, total]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || total <= 1) return;

    const onStart = (event: TouchEvent) => {
      startX.current = event.touches[0].clientX;
      dragging.current = true;
    };
    const onEnd = (event: TouchEvent) => {
      if (!dragging.current) return;
      const diff = startX.current - event.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        goTo(indexRef.current + (diff > 0 ? 1 : -1));
      }
      dragging.current = false;
    };

    viewport.addEventListener("touchstart", onStart, { passive: true });
    viewport.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      viewport.removeEventListener("touchstart", onStart);
      viewport.removeEventListener("touchend", onEnd);
    };
  }, [total]);

  const current = items[index];
  if (!current) return null;

  return (
    <div
      className="gallery"
      tabIndex={0}
      onMouseEnter={() => {
        if (intervalRef.current) window.clearInterval(intervalRef.current);
      }}
      onMouseLeave={() => {
        if (intervalRef.current) window.clearInterval(intervalRef.current);
        if (total > 1) {
          intervalRef.current = window.setInterval(() => next(), 7000);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") prev();
        if (event.key === "ArrowRight") next();
      }}
    >
      <div ref={viewportRef} className="gallery__viewport">
        <div
          className="gallery__track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {items.map((item) => (
            <figure className="gallery__slide" key={item.src}>
              <div className="gallery__photo">
                <img
                  src={item.src}
                  alt={item.title}
                  width={1600}
                  height={1000}
                />
              </div>
              <figcaption className="gallery__caption">
                <h3>{item.title}</h3>
                <p>{item.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {total > 1 ? (
        <>
          <button
            type="button"
            className="carousel__btn carousel__btn--prev"
            aria-label="Previous photo"
            onClick={prev}
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
            {items.map((item, i) => (
              <button
                key={item.src}
                type="button"
                className={`carousel__dot${i === index ? " is-active" : ""}`}
                aria-label={`Show photo: ${item.title}`}
                aria-current={i === index ? "true" : undefined}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
          <button
            type="button"
            className="carousel__btn carousel__btn--next"
            aria-label="Next photo"
            onClick={next}
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
        </>
      ) : null}
    </div>
  );
}
