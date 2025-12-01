import { useState } from "react"
import { MdDeleteOutline, MdMoreVert } from "react-icons/md"
import { ProfilePicture } from "@/components"
import { Button } from "@/components/ui/button"
import { HandleClickOutsideWrapper } from "@/components/wrappers/HandleClickOutsideWrapper"
import { multiFormatDateString } from "@/utils"
import { useDeleteChat } from "../../api/useMutations"
import { useChatStore } from "../../store/chatStore"

export default function ListConnections({ connections }) {
  const setSelectedChat = useChatStore((state) => state.setSelectedChat)

  return (
    <div>
      {connections?.map((c) => {
        const user = c.users?.[0]
        const lastMessage = c.lastMessage?.content || " "

        const isUnread = c.unreadCount > 0

        if (!user) return null
        return (
          <div
            key={c._id}
            onClick={() => setSelectedChat(c)}
            className="flex cursor-pointer items-center gap-3 rounded-xl p-3 transition hover:bg-muted/50"
          >
            <ProfilePicture profilePicture={user.profilePicture} username={user.name} size="lg" />
            <div className="flex-1 overflow-hidden">
              <p className="truncate font-medium text-sm">{user.name}</p>
              <p className="truncate text-muted-foreground text-xs">{lastMessage}</p>
            </div>

            {/* timestamp + unread badge */}
            <div className="flex flex-col items-end gap-1">
              <span className="whitespace-nowrap text-[10px] text-muted-foreground">
                {c.updatedAt ? multiFormatDateString(c.updatedAt) : ""}
              </span>

              {isUnread && (
                <span className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-rose-500 font-semibold text-[10px] text-white">
                  {c.unreadCount}
                </span>
              )}
            </div>
            <ChatOptions chat={c} />
          </div>
        )
      })}
    </div>
  )
}

function ChatOptions({ chat }) {
  const [open, setOpen] = useState(false)
  const { mutate: deleteChat } = useDeleteChat(chat._id)

  const handleDelete = (e) => {
    e.stopPropagation()
    useChatStore.getState().setMessages([])
    deleteChat({ chatId: chat._id })
    setOpen(false)
  }

  return (
    <HandleClickOutsideWrapper onClickOutside={() => setOpen(false)}>
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        {/* 3-dot trigger */}
        <Button size="icon" variant="ghost" onClick={() => setOpen(!open)}>
          <MdMoreVert size={18} className="text-muted-foreground" />
        </Button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 z-50 mt-2 w-35 overflow-hidden rounded-md border bg-background shadow-lg">
            <button
              onClick={handleDelete}
              className="flex w-full items-center gap-2 px-3 py-2 text-rose-400 text-sm hover:bg-muted"
            >
              <MdDeleteOutline size={16} /> Delete Chat
            </button>
          </div>
        )}
      </div>
    </HandleClickOutsideWrapper>
  )
}
