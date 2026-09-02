import { create } from "zustand";

type TeamState = {
  activeId: string | null;
  toggle: (id: string) => void;
  clear: () => void;
};

export const useTeamStore = create<TeamState>((set, get) => ({
  activeId: null,
  toggle: (id) => set({ activeId: get().activeId === id ? null : id }),
  clear: () => set({ activeId: null }),
}));
