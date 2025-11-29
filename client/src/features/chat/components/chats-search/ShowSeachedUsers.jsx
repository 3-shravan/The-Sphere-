import { ProfilePicture } from "@/components"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useChatExists } from "../../api/useQueries"
import { useChatStore } from "../../store/chatStore"

export default function ShowSearchedUsers({ users = [] }) {
  return (
    <div className="fade-in slide-in-from-top-2 absolute top-full left-0 z-50 mt-2 w-full animate-in rounded border border-border bg-black shadow-lg">
      <ScrollArea className="custom-scrollbar-hide max-h-72 w-full overflow-y-auto">
        {users.length === 0 ? (
          <div className="flex items-center justify-center py-6 text-muted-foreground text-sm">
            No users found
          </div>
        ) : (
          users.map((user) => <User key={user._id} user={user} />)
        )}
      </ScrollArea>
    </div>
  )
}

const User = ({ user }) => {
  const setSelectedChat = useChatStore((state) => state.setSelectedChat)
  const { refetch } = useChatExists(user._id, { enabled: false })

  const handleNewChat = async () => {
    const { data } = await refetch()

    if (data?.isExists) return setSelectedChat(data.chat)

    setSelectedChat({
      isGroupChat: false,
      users: [user],
      _id: user._id,
      name: user.fullName,
      profilePicture: user.profilePicture,
    })
  }
  return (
    <div
      key={user._id}
      onClick={handleNewChat}
      className="flex cursor-pointer items-center gap-3 rounded-xl border-border/40 border-b px-4 py-3 transition-colors last:border-none hover:bg-background hover:text-accent-foreground"
    >
      <ProfilePicture profilePicture={user.profilePicture} />

      <div className="flex flex-col overflow-hidden">
        <p className="truncate font-medium text-sm">{user.fullName}</p>
        <p className="truncate font-medium text-accent-foreground/50 text-xs">{user.name}</p>
      </div>
    </div>
  )
}
