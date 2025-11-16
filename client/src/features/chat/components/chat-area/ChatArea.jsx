import { ProfilePicture } from "@/components"
import { useChatStore } from "../../store/chatStore"
import MessageInput from "../MessageInput"
import MessagesArea from "./MessagesArea"
import NoSelectedChat from "./NoSelectedChat"

export default function ChatArea() {
  const { selectedChat, onlineUsers } = useChatStore()
  const user = selectedChat?.users?.[0]

  const isOnline = onlineUsers?.some((u) => u._id === user?._id)

  if (!selectedChat) return <NoSelectedChat />

  return (
    <div className="flex h-full w-full flex-col rounded-xl bg-input/5 p-2">
      <header className="flex items-center gap-2 p-2">
        <ProfilePicture profilePicture={user?.profilePicture} username={user?.name} size="md" />

        <p className="flex items-center gap-2 font-Gilroy font-medium">
          {user?.name}

          {isOnline ? (
            <span className="font-bold font-mono text-[10px] text-emerald-300">● online</span>
          ) : (
            <span className="font-bold font-mono text-[10px] text-gray-500">● offline</span>
          )}
        </p>
      </header>

      <MessagesArea />
      <MessageInput />
    </div>
  )
}
