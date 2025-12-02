import { ChevronLeft } from "lucide-react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { ProfilePicture } from "@/components"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks"
import MessageInput from "../components/chat-area/MessageInput"
import MessagesArea from "../components/chat-area/MessagesArea"
import NoSelectedChat from "../components/chat-area/NoSelectedChat"
import { useChatStore } from "../store/chatStore"

export default function ChatArea() {
  // const { chatId } = useParams()
  const navigate = useNavigate()
  const IS_MOBILE = useIsMobile()

  const { selectedChat, setSelectedChat, onlineUsers } = useChatStore()

  function handleBackClick() {
    setSelectedChat(null)
    if (IS_MOBILE) navigate("/conversations")
  }

  useEffect(() => {
    if (!selectedChat && IS_MOBILE) navigate("/conversations")
  }, [selectedChat, IS_MOBILE, navigate])

  if (!selectedChat) return <NoSelectedChat />

  const user = selectedChat?.users?.[0]
  const isOnline = onlineUsers?.some((u) => u._id === user?._id)

  return (
    <div className="flex h-full w-full flex-col rounded-xl p-1 pb-2 md:bg-input/5">
      <Header
        user={user}
        isOnline={isOnline}
        handleBackClick={handleBackClick}
        IS_MOBILE={IS_MOBILE}
      />
      <MessagesArea />
      <MessageInput />
    </div>
  )
}

function Header({ user, isOnline, handleBackClick, IS_MOBILE }) {
  return (
    <header className="flex items-center gap-2 p-2">
      {IS_MOBILE && (
        <Button onClick={handleBackClick} variant="ghost" size="icon">
          <ChevronLeft />
        </Button>
      )}

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
  )
}
