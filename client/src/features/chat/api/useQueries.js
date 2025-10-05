import { useQuery } from "@tanstack/react-query";
import { CHAT_QUERY_KEYS } from "./keys";
import { chatApi } from "./conversation.api";
import tryCatch from "@/lib/utils/try-catch";

export function useConnections() {
  return useQuery({
    queryKey: CHAT_QUERY_KEYS.connections,
    staleTime: 0,
    queryFn: () => tryCatch(chatApi.connections()),
  });
}

export function useChatDetails(chatId = "67ea8544ac4ed256c1ba3afb") {
  return useQuery({
    queryKey: CHAT_QUERY_KEYS.chat(chatId),
    queryFn: () => tryCatch(chatApi.chatDetails(chatId)),
    staleTime: 0,
    retry: false,
  });
}

export function useMessages(chatId = "68e14efb456d6a9948842147") {
  return useQuery({
    queryKey: CHAT_QUERY_KEYS.messages(chatId),
    staleTime: 0,
    queryFn: () => tryCatch(chatApi.messages(chatId)),
  });
}
