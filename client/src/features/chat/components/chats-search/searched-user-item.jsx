import { useCallback, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { ProfilePicture } from "@/components"
import { useAuth } from "@/context"
import { useIsMobile } from "@/hooks"
import { useChatExists } from "../../api/useQueries"
import { useChatStore } from "../../store/chatStore"

export const UserItem = ({ user, closeDropdown }) => {
  const setSelectedChat = useChatStore((s) => s.setSelectedChat)
  const currentChat = useChatStore((s) => s.selectedChat)

  const { currentUserId } = useAuth()
  const { refetch } = useChatExists(user._id, { enabled: false })

  const isMobile = useIsMobile()
  const navigate = useNavigate()
  const isFetchingRef = useRef(false)

  const handleNewChat = useCallback(async () => {
    if (isFetchingRef.current) return
    isFetchingRef.current = true

    try {
      const { data } = await refetch()
      let chat

      if (data?.isExists) chat = data.chat
      else {
        const isSelfChat = user._id === currentUserId

        chat = {
          _id: user._id,
          isGroupChat: false,
          users: [user],
          name: isSelfChat ? "Saved Messages" : user.name,
          profilePicture: user.profilePicture,
          isSelfChat,
        }
      }

      if (currentChat?._id === chat._id) {
        if (isMobile) navigate(`/conversations/chat/${chat._id}`)
        closeDropdown()
        return
      }

      setSelectedChat(chat)
      if (isMobile) navigate(`/conversations/chat/${chat._id}`)
    } finally {
      isFetchingRef.current = false
      closeDropdown()
    }
  }, [
    refetch,
    setSelectedChat,
    currentChat,
    isMobile,
    navigate,
    user,
    currentUserId,
    closeDropdown,
  ])

  return (
    <div
      onClick={handleNewChat}
      className="flex cursor-pointer items-center gap-3 rounded-xl border-border/40 border-b px-4 py-3 transition-colors last:border-none hover:bg-background hover:text-accent-foreground"
    >
      <ProfilePicture profilePicture={user.profilePicture} />

      <div className="flex flex-col overflow-hidden">
        <p className="truncate font-medium text-sm">
          {user._id === currentUserId ? "Saved Messages" : user.fullName}
        </p>
        <p className="truncate text-accent-foreground/50 text-xs">{user.name}</p>
      </div>
    </div>
  )
}
