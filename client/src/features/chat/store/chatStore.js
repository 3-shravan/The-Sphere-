import { create } from "zustand"
import { sortByCreatedAtAsc } from "@/lib/utils/global/sort"

export const useChatStore = create((set) => ({
  limit: 30,
  page: 1,

  onlineUsers: [],
  setOnlineUsers: (users) => set({ onlineUsers: users }),

  selectedChat: null,
  setSelectedChat: (chat) => set({ selectedChat: chat, messages: [], page: 1 }),

  messages: [],
  setMessages: (msgs) =>
    set({
      messages: sortByCreatedAtAsc(msgs),
    }),

  addMessage: (msg) =>
    set((state) => {
      if (state.messages.some((m) => m._id === msg._id)) return state // prevent duplicates
      return { messages: sortByCreatedAtAsc([...state.messages, msg]) }
    }),

  prependMessages: (older) =>
    set((state) => ({
      messages: sortByCreatedAtAsc([...older, ...state.messages]),
    })),
}))
