import { Loading } from "@/components"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAuth } from "@/context"
import { useChatMessages } from "../../hooks/useChatMessages"

export default function MessagesArea() {
  const { currentUserId } = useAuth()
  const { messages, isLoading } = useChatMessages()

  if (isLoading)
    return (
      <div className="h-full flex-center">
        <Loading message="Loading Messages.." />
      </div>
    )
  return (
    <ScrollArea className="h-[75vh] flex-1 px-4 py-2">
      <div className="flex flex-col gap-3">
        {messages?.map((msg) => {
          const isMe = msg.sender?._id === currentUserId
          return (
            <div key={msg._id} className={`flex w-full ${isMe ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs rounded-2xl px-3 py-1 font-Gilroy font-medium text-sm shadow transition-all duration-200 ${isMe ? "rounded-br-none bg-rose-100 text-primary-foreground" : "rounded-bl-none bg-muted text-foreground"}`}
              >
                {msg.content}
                <p className="text-right text-[9px] opacity-60">
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
    </ScrollArea>
  )
}
