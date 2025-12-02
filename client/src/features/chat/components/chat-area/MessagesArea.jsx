import { Loading } from "@/components"
import { useAuth } from "@/context"
import { useChatMessages } from "../../hooks/useChatMessages"
import { useChatWindow } from "../../hooks/useChatWindow"

export default function MessagesArea() {
  const { currentUserId } = useAuth()

  const { messages, isLoading, loadOlder } = useChatMessages()
  const { autoScroll, containerRef, handleScroll, useReachToBottom } = useChatWindow()

  useReachToBottom(messages)

  if (isLoading) return <Loading message="Loading Messages.." />
  if (messages?.length === 0)
    return (
      <div className="min-h-0 flex-1 flex-center px-3 text-center text-muted-foreground text-sm">
        No messages yet. Start the conversation!{" "}
      </div>
    )

  return (
    <div
      ref={containerRef}
      onScroll={() => handleScroll(containerRef, autoScroll, loadOlder)}
      className="h-full flex-1 overflow-y-auto px-3 py-2"
    >
      <div className="flex flex-col gap-2 pb-6">
        {messages.map((msg) => {
          const mine = msg.sender?._id === currentUserId
          return (
            <div key={msg._id} className={`flex w-full ${mine ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs rounded-2xl px-3 py-1 font-medium text-sm shadow ${
                  mine
                    ? "rounded-br-none bg-primary text-primary-foreground"
                    : "rounded-bl-none bg-muted text-foreground"
                }
                `}
              >
                {msg.content}
                <p className="mt-1 text-right text-[9px] opacity-60">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
