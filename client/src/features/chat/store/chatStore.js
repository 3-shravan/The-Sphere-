import { create } from "zustand"

export const useChatStore = create((set) => ({
  selectedChat: null,
  limit: 100,
  page: 1,
  onlineUsers: [],
  setOnlineUsers: (users) => set({ onlineUsers: users }),
  setSelectedChat: (chat) => set({ selectedChat: chat }),
  messages: [],
  setMessages: (update) =>
    set((state) => ({
      messages:
        typeof update === "function"
          ? update(Array.isArray(state.messages) ? state.messages : [])
          : Array.isArray(update)
            ? update
            : [],
    })),
}))
