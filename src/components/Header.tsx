"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import {
  EMAIL,
  NAV_ITEMS,
  PHONES,
  isActivePath,
} from "@/lib/site";
import { useUiStore } from "@/stores/ui-store";

export function Header() {
  const pathname = usePathname();
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const prevPathname = useRef(pathname);

  const menuOpen = useUiStore((s) => s.menuOpen);
  const headerMenuOpen = useUiStore((s) => s.headerMenuOpen);
  const scrolled = useUiStore((s) => s.scrolled);
  const headerHidden = useUiStore((s) => s.headerHidden);
  const skipMenuTransition = useUiStore((s) => s.skipMenuTransition);
  const openMenu = useUiStore((s) => s.openMenu);
  const closeMenu = useUiStore((s) => s.closeMenu);
  const closeMenuInstant = useUiStore((s) => s.closeMenuInstant);
  const releaseScrollLock = useUiStore((s) => s.releaseScrollLock);
  const setScrolled = useUiStore((s) => s.setScrolled);
  const setHeaderHidden = useUiStore((s) => s.setHeaderHidden);

  useEffect(() => {
    if (prevPathname.current === pathname) return;
    prevPathname.current = pathname;
    if (useUiStore.getState().menuOpen) {
      closeMenuInstant();
    }
  }, [pathname, closeMenuInstant]);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        if (useUiStore.getState().menuOpen) {
          setHeaderHidden(false);
          ticking.current = false;
          return;
        }

        const y = window.scrollY;
        setScrolled(y > 10);

        if (y > 100) {
          if (y > lastScrollY.current + 5) setHeaderHidden(true);
          else if (y < lastScrollY.current - 5) setHeaderHidden(false);
        } else {
          setHeaderHidden(false);
        }

        lastScrollY.current = y;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [setHeaderHidden, setScrolled]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && useUiStore.getState().menuOpen) {
        closeMenu();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeMenu]);

  const headerClass = [
    "site-header",
    scrolled ? "scrolled" : "",
    headerHidden ? "header--hidden" : "",
    headerMenuOpen ? "menu-open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const menuClass = [
    "nav__menu",
    menuOpen ? "is-open" : "",
    skipMenuTransition ? "nav__menu--instant" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={headerClass} role="banner">
      <nav className="nav" aria-label="Main navigation">
        <Link href="/" className="nav__logo">
          <img
            src="/images/logo-header.png"
            alt="Ukraine Strategic Partners"
            width={473}
            height={454}
          />
        </Link>
        <button
          type="button"
          className="nav__toggle"
          aria-expanded={menuOpen}
          aria-controls="nav-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => {
            if (menuOpen) closeMenu();
            else openMenu();
          }}
        >
          <span />
          <span />
          <span />
        </button>
        <ul id="nav-menu" className={menuClass} role="list">
          {NAV_ITEMS.map((item) => {
            const external = "external" in item && item.external;
            const active = !external && isActivePath(pathname, item.href);

            if (external) {
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      if (menuOpen) closeMenu();
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              );
            }

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={(event) => {
                    if (active) {
                      event.preventDefault();
                      closeMenu();
                      return;
                    }
                    if (menuOpen) releaseScrollLock();
                  }}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li className="nav__menu-contacts" role="none">
            {PHONES.map((phone) => (
              <a
                key={phone.href}
                href={phone.href}
                onClick={() => {
                  if (menuOpen) closeMenu();
                }}
              >
                {phone.label}
              </a>
            ))}
            <a
              href={EMAIL.href}
              onClick={() => {
                if (menuOpen) closeMenu();
              }}
            >
              {EMAIL.label}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
