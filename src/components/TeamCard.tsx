"use client";

import { useEffect, useState } from "react";
import { useTeamStore } from "@/stores/team-store";

function TapHint() {
  return (
    <span className="team-card__tap-hint" aria-hidden="true">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    </span>
  );
}

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  image: string;
  alt: string;
  bio: string;
  label: string;
};

export function TeamCard({ member }: { member: TeamMember }) {
  const activeId = useTeamStore((s) => s.activeId);
  const toggle = useTeamStore((s) => s.toggle);
  const clear = useTeamStore((s) => s.clear);
  const isActive = activeId === member.id;
  const [tapReveal, setTapReveal] = useState(false);
  const [mobileLayout, setMobileLayout] = useState(false);

  useEffect(() => {
    const mobileMq = window.matchMedia("(max-width: 767px)");
    const touchMq = window.matchMedia("(hover: none)");

    const sync = () => {
      const isMobile = mobileMq.matches;
      setMobileLayout(isMobile);
      setTapReveal(touchMq.matches && !isMobile);
      if (!(touchMq.matches && !isMobile)) {
        useTeamStore.getState().clear();
      }
    };

    sync();
    mobileMq.addEventListener("change", sync);
    touchMq.addEventListener("change", sync);
    return () => {
      mobileMq.removeEventListener("change", sync);
      touchMq.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!tapReveal) return;

    const onDocClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (!target?.closest(".team-card")) clear();
    };

    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [tapReveal, clear]);

  return (
    <article
      className={`team-card${isActive ? " is-active" : ""}`}
      tabIndex={0}
      aria-label={member.label}
      onClick={() => {
        if (!tapReveal) return;
        toggle(member.id);
      }}
      onKeyDown={(event) => {
        if (!tapReveal) return;
        if (event.key === "Escape" && isActive) clear();
      }}
    >
      <div className="team-card__img">
        <img
          src={member.image}
          alt={member.alt}
          loading="lazy"
          width={400}
          height={500}
        />
      </div>
      <div className="team-card__info">
        <h3 className="team-card__name">{member.name}</h3>
        <p className="team-card__role">{member.role}</p>
      </div>
      <div
        className="team-card__overlay"
        aria-hidden={mobileLayout ? "false" : "true"}
      >
        <h3 className="team-card__name">{member.name}</h3>
        <p className="team-card__role">{member.role}</p>
        <p className="team-card__bio">{member.bio}</p>
      </div>
      <TapHint />
    </article>
  );
}
