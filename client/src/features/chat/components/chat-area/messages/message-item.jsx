import { Trash } from "lucide-react"
import { ProfilePicture } from "@/components"
import { longPress } from "@/lib/utils/ui/longPress"
import { MessageBubble } from "./message-bubble"

export function MessageItem({ msg, mine, isActive, onActivate }) {
  const longPressHandlers = longPress(() => {
    onActivate()
    navigator.vibrate?.(20)
  })

  return (
    <div className={`flex w-full items-end gap-1 ${mine ? "justify-end" : "justify-start"}`}>
      {!mine && <ProfilePicture profilePicture={msg.sender?.profilePicture} size="sm" />}

      <div className="relative">
        <MessageOverlay show={mine && isActive} onDelete={() => console.log("delete", msg._id)} />
        <MessageBubble
          msg={msg}
          mine={mine}
          isActive={isActive}
          longPressHandlers={longPressHandlers}
          onContextMenu={onActivate}
        />
      </div>
    </div>
  )
}

function MessageOverlay({ show, onDelete }) {
  if (!show) return null

  return (
    <div className="-top-10 fade-in zoom-in-95 absolute right-0 z-20 flex animate-in gap-2 rounded-xl bg-background px-3 py-1 shadow-lg">
      <button
        onClick={(e) => {
          e.stopPropagation()
          onDelete()
        }}
        className="flex items-center gap-1 text-rose-500 text-sm hover:text-rose-600"
      >
        <Trash size={16} />
        Delete
      </button>
    </div>
  )
}
