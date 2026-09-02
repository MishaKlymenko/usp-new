"use client";

import { useEffect, useRef } from "react";
import { useTimelineStore } from "@/stores/timeline-store";

export type TimelineRow = {
  left: { title: string; text: string };
  right?: { title: string; text: string };
};

export function ServicesTimeline({ rows }: { rows: TimelineRow[] }) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  const active = useTimelineStore((s) => s.active);
  const activeRow = useTimelineStore((s) => s.activeRow);
  const visibleRows = useTimelineStore((s) => s.visibleRows);
  const spineHeight = useTimelineStore((s) => s.spineHeight);
  const activate = useTimelineStore((s) => s.activate);
  const markVisible = useTimelineStore((s) => s.markVisible);
  const setActiveRow = useTimelineStore((s) => s.setActiveRow);
  const setSpineHeight = useTimelineStore((s) => s.setSpineHeight);
  const reset = useTimelineStore((s) => s.reset);

  useEffect(() => {
    reset();
    const root = rootRef.current;
    if (!root) return;

    const tlObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          activate();
          tlObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.05 },
    );
    tlObserver.observe(root);

    const rowObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number((entry.target as HTMLElement).dataset.index);
          if (!Number.isNaN(index)) markVisible(index);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    rowRefs.current.forEach((row) => {
      if (row) rowObserver.observe(row);
    });

    const update = () => {
      const body = bodyRef.current;
      if (body) {
        const bodyRect = body.getBoundingClientRect();
        const viewMid = window.innerHeight * 0.65;
        const drawn = Math.max(0, viewMid - bodyRect.top);
        setSpineHeight(Math.min(drawn, body.scrollHeight));
      }

      let best = -1;
      let bestDist = Infinity;
      const centre = window.innerHeight * 0.5;
      rowRefs.current.forEach((row, i) => {
        if (!row) return;
        const rect = row.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const dist = Math.abs(mid - centre);
        if (dist < bestDist && rect.top < window.innerHeight && rect.bottom > 0) {
          bestDist = dist;
          best = i;
        }
      });
      setActiveRow(best);
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      tlObserver.disconnect();
      rowObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      reset();
    };
  }, [activate, markVisible, reset, setActiveRow, setSpineHeight]);

  return (
    <div
      ref={rootRef}
      className={`timeline${active ? " tl-active" : ""}`}
    >
      <div className="timeline__head">
        <h3 className="timeline__heading">Services</h3>
        <h3 className="timeline__heading">Networks</h3>
      </div>

      <div className="timeline__body" ref={bodyRef}>
        <div
          className="timeline__spine"
          aria-hidden="true"
          style={{ height: `${spineHeight}px` }}
        />

        {rows.map((row, i) => {
          const leftOnly = !row.right;
          const className = [
            "timeline__row",
            leftOnly ? "timeline__row--left-only" : "",
            visibleRows.includes(i) ? "tl-visible" : "",
            activeRow === i ? "tl-active-row" : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <div
              key={row.left.title}
              className={className}
              data-index={i}
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
            >
              <div
                className="timeline__card"
                onMouseEnter={() => setActiveRow(i)}
              >
                <h4>{row.left.title}</h4>
                <p>{row.left.text}</p>
              </div>
              <div className="timeline__branch timeline__branch--left" aria-hidden="true" />
              <div className="timeline__dot" aria-hidden="true" />
              {row.right ? (
                <>
                  <div
                    className="timeline__branch timeline__branch--right"
                    aria-hidden="true"
                  />
                  <div
                    className="timeline__card"
                    onMouseEnter={() => setActiveRow(i)}
                  >
                    <h4>{row.right.title}</h4>
                    <p>{row.right.text}</p>
                  </div>
                </>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
