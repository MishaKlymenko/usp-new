import { create } from "zustand";

type CarouselState = {
  index: number;
  goTo: (index: number, total: number) => void;
  next: (total: number) => void;
  prev: (total: number) => void;
  reset: () => void;
};

function wrap(index: number, total: number): number {
  if (total <= 0) return 0;
  return ((index % total) + total) % total;
}

export const useCarouselStore = create<CarouselState>((set, get) => ({
  index: 0,
  goTo: (index, total) => set({ index: wrap(index, total) }),
  next: (total) => set({ index: wrap(get().index + 1, total) }),
  prev: (total) => set({ index: wrap(get().index - 1, total) }),
  reset: () => set({ index: 0 }),
}));
