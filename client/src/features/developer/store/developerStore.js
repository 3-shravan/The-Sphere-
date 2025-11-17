import { create } from "zustand"

export const useDeveloperStore = create((set) => ({
  isChat: false,
  setIsChat: (value) => set({ isChat: value }),
}))
