import { useState } from "react"
import { Loading } from "@/components"
import { useAuth } from "@/context"
import { useChatMessages } from "../../hooks/useChatMessages"
import { useChatWindow } from "../../hooks/useChatWindow"
import { MessageItem } from "./messages/message-item"

export function Messages() {
  const { currentUserId } = useAuth()
  const { messages, isLoading, loadOlder } = useChatMessages()
  const { autoScroll, containerRef, handleScroll, useReachToBottom } = useChatWindow()

  const [activeMsgId, setActiveMsgId] = useState(null)

  useReachToBottom(messages)

  if (isLoading) return <Loading message="Loading Messages.." />
  if (!messages?.length) {
    return (
      <div className="min-h-0 flex-1 flex-center px-3 text-center text-muted-foreground text-sm">
        No messages yet. Start the conversation!
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      onClick={() => setActiveMsgId(null)}
      onScroll={() => handleScroll(containerRef, autoScroll, loadOlder)}
      className="h-full flex-1 overflow-y-auto px-3 py-2"
    >
      <div className="flex flex-col gap-2">
        {messages.map((msg) => (
          <MessageItem
            key={msg._id}
            msg={msg}
            mine={msg.sender?._id === currentUserId}
            isActive={activeMsgId === msg._id}
            onActivate={() => setActiveMsgId(msg._id)}
          />
        ))}
      </div>
    </div>
  )
}
