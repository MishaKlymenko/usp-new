"use client";

import { useEffect, useRef } from "react";

type LazyImageProps = {
  src: string;
  alt?: string;
  width: number;
  height: number;
};

export function LazyImage({ src, alt = "", width, height }: LazyImageProps) {
  const ref = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = ref.current;
    if (!img) return;

    const hydrate = () => {
      img.src = src;
    };

    if (typeof IntersectionObserver === "undefined") {
      hydrate();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          hydrate();
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "200px 0px" },
    );

    observer.observe(img);
    return () => observer.disconnect();
  }, [src]);

  return (
    <img
      ref={ref}
      alt={alt}
      width={width}
      height={height}
      decoding="async"
      fetchPriority="low"
    />
  );
}
