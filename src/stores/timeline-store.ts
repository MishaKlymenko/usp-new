import { create } from "zustand";

type TimelineState = {
  active: boolean;
  activeRow: number;
  visibleRows: number[];
  spineHeight: number;
  activate: () => void;
  markVisible: (index: number) => void;
  setActiveRow: (index: number) => void;
  setSpineHeight: (height: number) => void;
  reset: () => void;
};

export const useTimelineStore = create<TimelineState>((set, get) => ({
  active: false,
  activeRow: -1,
  visibleRows: [],
  spineHeight: 0,
  activate: () => set({ active: true }),
  markVisible: (index) => {
    const { visibleRows } = get();
    if (visibleRows.includes(index)) return;
    set({ visibleRows: [...visibleRows, index] });
  },
  setActiveRow: (index) => set({ activeRow: index }),
  setSpineHeight: (height) => set({ spineHeight: height }),
  reset: () =>
    set({
      active: false,
      activeRow: -1,
      visibleRows: [],
      spineHeight: 0,
    }),
}));
