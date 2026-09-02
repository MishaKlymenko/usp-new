import { create } from "zustand";

type UiState = {
  menuOpen: boolean;
  headerMenuOpen: boolean;
  scrolled: boolean;
  headerHidden: boolean;
  lockedScrollY: number;
  skipMenuTransition: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  closeMenuInstant: () => void;
  releaseScrollLock: () => void;
  setScrolled: (value: boolean) => void;
  setHeaderHidden: (value: boolean) => void;
};

function lockBody(scrollY: number) {
  if (typeof document === "undefined") return;
  document.body.classList.add("menu-open");
  document.body.style.top = `-${scrollY}px`;
}

function unlockBody(scrollY: number, restore: boolean) {
  if (typeof document === "undefined") return;
  document.body.classList.remove("menu-open");
  document.body.style.top = "";
  if (restore) window.scrollTo(0, scrollY);
}

export const useUiStore = create<UiState>((set, get) => ({
  menuOpen: false,
  headerMenuOpen: false,
  scrolled: false,
  headerHidden: false,
  lockedScrollY: 0,
  skipMenuTransition: false,

  openMenu: () => {
    const scrollY = typeof window === "undefined" ? 0 : window.scrollY;
    lockBody(scrollY);
    set({
      menuOpen: true,
      headerMenuOpen: true,
      headerHidden: false,
      lockedScrollY: scrollY,
      skipMenuTransition: false,
    });
  },

  closeMenu: () => {
    const scrollY = get().lockedScrollY;
    unlockBody(scrollY, true);
    set({
      menuOpen: false,
      headerMenuOpen: false,
      skipMenuTransition: false,
    });
  },

  closeMenuInstant: () => {
    const scrollY = get().lockedScrollY;
    unlockBody(scrollY, false);
    set({
      menuOpen: false,
      headerMenuOpen: false,
      skipMenuTransition: true,
    });
    requestAnimationFrame(() => {
      if (get().skipMenuTransition) {
        set({ skipMenuTransition: false });
      }
    });
  },

  releaseScrollLock: () => {
    const scrollY = get().lockedScrollY;
    unlockBody(scrollY, false);
    set({
      headerMenuOpen: false,
    });
  },

  setScrolled: (value) => set({ scrolled: value }),
  setHeaderHidden: (value) => set({ headerHidden: value }),
}));
