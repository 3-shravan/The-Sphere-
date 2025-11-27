import { create } from "zustand"
import { MODE } from "@/lib/utils/api"

export const useDeveloperStore = create((set) => ({
  isChat: MODE  === "development",
  setIsChat: (value) => set({ isChat: value }),
}))
