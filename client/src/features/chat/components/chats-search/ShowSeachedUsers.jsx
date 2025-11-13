import { ProfilePicture } from "@/components"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function ShowSearchedUsers({ users = [] }) {
  return (
    <div className="fade-in slide-in-from-top-2 absolute top-full left-0 z-50 mt-2 w-full animate-in rounded border border-border bg-black shadow-lg">
      <ScrollArea className="custom-scrollbar-hide max-h-72 w-full overflow-y-auto rounded">
        {users.length === 0 ? (
          <div className="flex items-center justify-center py-6 text-muted-foreground text-sm">
            No users found
          </div>
        ) : (
          users.map((user) => (
            <div
              key={user._id}
              className="flex cursor-pointer items-center gap-3 border-border/40 border-b px-4 py-3 transition-colors last:border-none hover:bg-accent hover:text-accent-foreground"
            >
              <ProfilePicture profilePicture={user.profilePicture} />

              <div className="flex flex-col overflow-hidden">
                <p className="truncate font-medium text-sm">{user.name}</p>
              </div>
            </div>
          ))
        )}
      </ScrollArea>
    </div>
  )
}
