import { useMutation } from "@tanstack/react-query";
import { CHAT_QUERY_KEYS } from "./keys";
import { chatApi } from "./conversation.api";
import tryCatch from "@/lib/utils/try-catch";

export const useSendMessage = (receiverId) => {
  return useMutation({
    mutationKey: CHAT_QUERY_KEYS.messages(receiverId),
    mutationFn: ({ receiverId, message }) =>
      tryCatch(chatApi.sendMessage(receiverId, message)),
  });
};

export const useDeleteMessage = (messageId) => {
  return useMutation({
    mutationKey: CHAT_QUERY_KEYS.messages(messageId),
    mutationFn: ({ messageId }) => tryCatch(chatApi.deleteMessage(messageId)),
  });
};
export const useDeleteChat = (chatId) => {
  return useMutation({
    queryKey: CHAT_QUERY_KEYS.chat(chatId),
    mutationFn: ({ chatId }) => tryCatch(chatApi.deleteChat(chatId)),
  });
};
