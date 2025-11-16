import { create } from "zustand"

export const useChatStore = create((set) => ({
  selectedChat: null,
  limit: 100,
  page: 1,
  onlineUsers: [],
  setOnlineUsers: (users) => set({ onlineUsers: users }),
  setSelectedChat: (chat) => set({ selectedChat: chat }),
  messages: null,
  setMessages: (messages) => set({ messages }),
}))
