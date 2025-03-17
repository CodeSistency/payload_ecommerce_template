import { create } from "zustand";

interface DarkModeState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const useDarkModeStore = create<DarkModeState>((set) => ({
  isDarkMode: false, // Default to light mode
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}));