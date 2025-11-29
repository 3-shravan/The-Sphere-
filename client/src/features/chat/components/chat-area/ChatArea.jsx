import { ProfilePicture } from "@/components"
import { Button } from "@/components/ui/button"
import { useChatStore } from "../../store/chatStore"
import MessageInput from "../MessageInput"
import MessagesArea from "./MessagesArea"
import NoSelectedChat from "./NoSelectedChat"

export default function ChatArea() {
  const { selectedChat, setSelectedChat, onlineUsers } = useChatStore()
  const user = selectedChat?.users?.[0]

  const isOnline = onlineUsers?.some((u) => u._id === user?._id)

  if (!selectedChat) return <NoSelectedChat />

  return (
    <div className="flex h-full w-full flex-col rounded-xl p-1 pb-2 md:bg-input/5">
      <header className="flex items-center gap-2 p-2">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setSelectedChat(null)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </Button>

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
