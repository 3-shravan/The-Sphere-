import { fetcher } from "@/lib/fetcher"

export const chatApi = {
  connections: () => fetcher({ endpoint: "/chats/connections" }),
  searchUsers: (q) => fetcher({ endpoint: `/chats/search?q=${q}` }),
  chatDetails: (chatId) => fetcher({ endpoint: `/chats/${chatId}` }),
  messages: (chatId) => fetcher({ endpoint: `/chats/${chatId}/messages` }),
  sendMessage: (receiverId, message) =>
    fetcher({
      endpoint: `/chats/${receiverId}/message`,
      method: "POST",
      data: { content: message },
    }),
  deleteMessage: (messageId) =>
    fetcher({ endpoint: `/chats/message/${messageId}`, method: "DELETE" }),
  deleteChat: (chatId) => fetcher({ endpoint: `/chats/${chatId}`, method: "DELETE" }),
}
