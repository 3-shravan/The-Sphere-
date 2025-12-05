import { fetcher } from "@/lib/api/fetcher"

export const chatApi = {
  connections: () => fetcher({ endpoint: "/chats/connections" }),
  searchUsers: (q) => fetcher({ endpoint: `/chats/search?q=${q}` }),
  chatDetails: (chatId) => fetcher({ endpoint: `/chats/${chatId}` }),
  chatExists: (userId) => fetcher({ endpoint: `/chats/check/${userId}` }),
  messages: (chatId, params) =>
    fetcher({ endpoint: `/chats/${chatId}/messages?limit=${params?.limit}&page=${params?.page}` }),
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
