"use client";

import { useEffect, useRef, useState } from "react";

export type Partner = {
  name: string;
  href: string;
  src: string;
  width: number;
  height: number;
};

function wrap(index: number, total: number): number {
  if (total <= 0) return 0;
  return ((index % total) + total) % total;
}

function pageCount(total: number, visible: number): number {
  return Math.max(1, Math.floor(total - visible) + 1);
}

function isCenteredViewport(): boolean {
  return typeof window === "undefined"
    ? true
    : window.matchMedia("(max-width: 639px)").matches;
}

function visibleCount(): number {
  if (typeof window === "undefined") return 2;
  if (window.matchMedia("(min-width: 900px)").matches) return 3;
  return 2;
}

export function PartnersCarousel({ partners }: { partners: Partner[] }) {
  const total = partners.length;
  const [index, setIndex] = useState(1);
  const [visible, setVisible] = useState(2);
  const [centered, setCentered] = useState(true);
  const [instant, setInstant] = useState(false);
  const startX = useRef(0);
  const dragging = useRef(false);
  const intervalRef = useRef<number | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const indexRef = useRef(index);
  indexRef.current = index;
  const centeredRef = useRef(centered);
  centeredRef.current = centered;
  const totalRef = useRef(total);
  totalRef.current = total;

  const looped = total > 1 ? [partners[total - 1], ...partners, partners[0]] : partners;
  const pages = centered ? total : pageCount(total, visible);
  const pagesRef = useRef(pages);
  pagesRef.current = pages;
  // one clone on each side is enough since the window only ever moves one step past its bounds
  const desktopLooping = !centered && pages > 1;
  const desktopRenderIndex = desktopLooping ? index + 1 : index;

  const realIndex = centered
    ? index === 0
      ? total - 1
      : index === total + 1
        ? 0
        : index - 1
    : index === -1
      ? pages - 1
      : index === pages
        ? 0
        : index;

  useEffect(() => {
    const sync = () => {
      const nextCentered = isCenteredViewport();
      const nextVisible = visibleCount();
      setCentered(nextCentered);
      setVisible(nextVisible);
      setInstant(true);
      setIndex(nextCentered ? 1 : 0);
    };
    sync();
    const mqCenter = window.matchMedia("(max-width: 639px)");
    const mq3 = window.matchMedia("(min-width: 900px)");
    mqCenter.addEventListener("change", sync);
    mq3.addEventListener("change", sync);
    return () => {
      mqCenter.removeEventListener("change", sync);
      mq3.removeEventListener("change", sync);
    };
  }, [total]);

  useEffect(() => {
    if (!instant) return;
    const frame = requestAnimationFrame(() => setInstant(false));
    return () => cancelAnimationFrame(frame);
  }, [instant]);

  const goTo = (nextIndex: number) => {
    if (centeredRef.current) {
      setIndex(nextIndex);
      return;
    }
    setIndex(wrap(nextIndex, pageCount(totalRef.current, visibleCount())));
  };

  const next = () => {
    if (centeredRef.current) {
      setIndex((current) => {
        const max = totalRef.current + 1;
        return current >= max ? 2 : current + 1;
      });
      return;
    }
    if (!desktopLooping) {
      goTo(indexRef.current + 1);
      return;
    }
    setIndex((current) => (current >= pagesRef.current ? 0 : current + 1));
  };

  const prev = () => {
    if (centeredRef.current) {
      setIndex((current) => {
        const max = totalRef.current + 1;
        return current <= 0 ? max - 2 : current - 1;
      });
      return;
    }
    if (!desktopLooping) {
      goTo(indexRef.current - 1);
      return;
    }
    setIndex((current) => (current <= -1 ? pagesRef.current - 1 : current - 1));
  };

  const goToDot = (page: number) => {
    if (centeredRef.current) {
      setIndex(page + 1);
      return;
    }
    goTo(page);
  };

  useEffect(() => {
    const start = () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      if (pages <= 1) return;
      intervalRef.current = window.setInterval(() => next(), 5000);
    };
    start();
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [index, pages]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || pages <= 1) return;

    const onStart = (event: TouchEvent) => {
      startX.current = event.touches[0].clientX;
      dragging.current = true;
    };
    const onEnd = (event: TouchEvent) => {
      if (!dragging.current) return;
      const diff = startX.current - event.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) next();
        else prev();
      }
      dragging.current = false;
    };

    viewport.addEventListener("touchstart", onStart, { passive: true });
    viewport.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      viewport.removeEventListener("touchstart", onStart);
      viewport.removeEventListener("touchend", onEnd);
    };
  }, [pages]);

  const onTrackTransitionEnd = () => {
    if (centeredRef.current) {
      if (indexRef.current === 0) {
        setInstant(true);
        setIndex(totalRef.current);
      } else if (indexRef.current === totalRef.current + 1) {
        setInstant(true);
        setIndex(1);
      }
      return;
    }
    if (indexRef.current === -1) {
      setInstant(true);
      setIndex(pagesRef.current - 1);
    } else if (indexRef.current === pagesRef.current) {
      setInstant(true);
      setIndex(0);
    }
  };

  const transform = centered
    ? `translateX(calc(100% / var(--pc-visible) / 2 - ${index} * 100% / var(--pc-visible)))`
    : `translateX(calc(-${desktopRenderIndex} * 100% / var(--pc-visible)))`;

  return (
    <div
      className={`carousel partners-carousel${centered ? " partners-carousel--centered" : ""}`}
      tabIndex={0}
      onMouseEnter={() => {
        if (intervalRef.current) window.clearInterval(intervalRef.current);
      }}
      onMouseLeave={() => {
        if (intervalRef.current) window.clearInterval(intervalRef.current);
        if (pages > 1) {
          intervalRef.current = window.setInterval(() => next(), 5000);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") prev();
        if (event.key === "ArrowRight") next();
      }}
    >
      <div ref={viewportRef} className="partners-carousel__viewport">
        <div
          className={`carousel__track${instant ? " partners-carousel__track--instant" : ""}`}
          style={{ transform }}
          onTransitionEnd={(event) => {
            if (event.target !== event.currentTarget) return;
            onTrackTransitionEnd();
          }}
        >
          {(centered || desktopLooping ? looped : partners).map((partner, slideIndex) => {
            const isActive = centered
              ? slideIndex === index
              : slideIndex >= desktopRenderIndex && slideIndex < desktopRenderIndex + visible;
            return (
              <article
                className={`partners-carousel__slide${isActive ? " is-active" : ""}`}
                key={`${partner.href}-${slideIndex}`}
              >
                <a
                  href={partner.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={partner.name}
                  tabIndex={isActive ? 0 : -1}
                  onClick={(event) => {
                    if (centered && !isActive) {
                      event.preventDefault();
                      setIndex(slideIndex);
                    }
                  }}
                >
                  <div className="partners-list__logo">
                    <img
                      src={partner.src}
                      alt={partner.name}
                      loading="lazy"
                      width={partner.width}
                      height={partner.height}
                    />
                  </div>
                  <span className="partners-list__name">{partner.name}</span>
                </a>
              </article>
            );
          })}
        </div>
      </div>

      {pages > 1 ? (
        <div className="carousel__controls">
          <button
            type="button"
            className="carousel__btn carousel__btn--prev"
            aria-label="Previous partners"
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
            {Array.from({ length: pages }, (_, i) => (
              <button
                key={i}
                type="button"
                className={`carousel__dot${i === realIndex ? " is-active" : ""}`}
                aria-label={`Go to partner ${i + 1}`}
                aria-current={i === realIndex ? "true" : undefined}
                onClick={() => goToDot(i)}
              />
            ))}
          </div>
          <button
            type="button"
            className="carousel__btn carousel__btn--next"
            aria-label="Next partners"
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
        </div>
      ) : null}
    </div>
  );
}
