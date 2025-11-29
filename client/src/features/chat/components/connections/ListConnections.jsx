import { MdDeleteOutline } from "react-icons/md"
import { ProfilePicture } from "@/components"
import { Button } from "@/components/ui/button"
import { useDeleteChat } from "../../api/useMutations"
import { useChatStore } from "../../store/chatStore"

export default function ListConnections({ connections }) {
  const setSelectedChat = useChatStore((state) => state.setSelectedChat)
  return (
    <div>
      {connections?.map((c) => {
        const user = c?.users[0]
        const lastMessage = c.lastMessage?.content || "No messages yet"
        const isUnread = !c.lastMessage?.isSeen && c.lastMessage?.sender?._id !== user?._id

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
              <p className="truncate font-Futura text-primary text-xs">{lastMessage}</p>
            </div>

            <div className="flex flex-col items-end gap-1">
              <p className="whitespace-nowrap text-[10px] text-muted-foreground">
                {c.updatedAt ? new Date(c.updatedAt).toLocaleDateString() : ""}
              </p>
              {isUnread && <span className="h-2 w-2 rounded bg-rose-400"></span>}
            </div>
            <DeleteChat chat={c} />
          </div>
        )
      })}
    </div>
  )
}

const DeleteChat = ({ chat }) => {
  const { mutate: deleteChat } = useDeleteChat(chat._id)

  return (
    <Button
      onClick={() => deleteChat({ chatId: chat._id })}
      size="sm"
      className="rounded-full border bg-background hover:bg-muted"
    >
      <MdDeleteOutline className="text-red-400" size={10} />
    </Button>
  )
}
