import { useQuery } from "@tanstack/react-query";
import { CHAT_QUERY_KEYS } from "./keys";
import { chatApi } from "./conversation.api";
import tryCatch from "@/lib/utils/try-catch";

export function useConnections() {
  return useQuery({
    queryKey: CHAT_QUERY_KEYS.connections,
    queryFn: () => chatApi.connections(),
    meta: { showError: true },
  });
}

export function useChatDetails(chatId) {
  return useQuery({
    queryKey: CHAT_QUERY_KEYS.chat(chatId),
    queryFn: () => tryCatch(chatApi.chatDetails(chatId)),
    meta: { showError: true },
  });
}

export function useMessages(chatId) {
  return useQuery({
    queryKey: CHAT_QUERY_KEYS.messages(chatId),
    queryFn: () => chatApi.messages(chatId),
    meta: { showError: true },
  });
}
