import { useMutation } from "@tanstack/react-query";
import { CHAT_QUERY_KEYS } from "./keys";
import { chatApi } from "./conversation.api";

export const useSendMessage = (chatId) => {
  return useMutation({
    mutationKey: CHAT_QUERY_KEYS.messages(chatId),
    mutationFn: ({ receiverId, message }) =>
      chatApi.sendMessage(receiverId, message),
    meta: {
      showError: true,
      invalidateQuery: CHAT_QUERY_KEYS.messages(chatId),
    },
  });
};

export const useDeleteMessage = (chatId) => {
  return useMutation({
    mutationKey: CHAT_QUERY_KEYS.messages(chatId),
    mutationFn: ({ messageId }) => chatApi.deleteMessage(messageId),
    meta: {
      showError: true,
      invalidateQuery: CHAT_QUERY_KEYS.messages(chatId),
    },
  });
};
export const useDeleteChat = (chatId) => {
  return useMutation({
    queryKey: CHAT_QUERY_KEYS.chat(chatId),
    mutationFn: ({ chatId }) => chatApi.deleteChat(chatId),
    meta: {
      showError: true,
      showSuccess: true,
      invalidateQuery: CHAT_QUERY_KEYS.connections,
    },
  });
};
