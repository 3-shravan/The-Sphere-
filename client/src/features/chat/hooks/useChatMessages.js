import { useEffect, useMemo } from "react"
import { useMessages } from "../api/useQueries"
import { useChatStore } from "../store/chatStore"

export function useChatMessages() {
  const { selectedChat, limit, page, setMessages, messages } = useChatStore()
  const params = useMemo(() => ({ limit, page }), [limit, page])

  const { data, isLoading, refetch } = useMessages(selectedChat?._id, params)

  useEffect(() => {
    if (data?.messages) {
      setMessages(data.messages.reverse())
    }
  }, [data, setMessages])

  return {
    messages,
    isLoading,
    refetch,
  }
}
