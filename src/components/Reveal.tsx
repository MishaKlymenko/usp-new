"use client";

import {
  useEffect,
  useRef,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from "react";

type RevealProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  stagger?: boolean;
  children: ReactNode;
};

export function Reveal({
  as: Tag = "div",
  stagger = false,
  className,
  children,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("revealed");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const attrs = stagger
    ? { "data-reveal-stagger": "" }
    : { "data-reveal": "" };

  return (
    <Tag ref={ref} className={className} {...attrs} {...rest}>
      {children}
    </Tag>
  );
}
