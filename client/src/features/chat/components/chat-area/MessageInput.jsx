import { Send } from "lucide-react"
import { useState } from "react"
import { Spinner } from "@/components"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useSendMessage } from "../../api/useMutations"
import { useChatStore } from "../../store/chatStore"

export default function MessageInput() {
  const [text, setText] = useState("")
  const chat = useChatStore((s) => s.selectedChat)
  const addMessage = useChatStore((s) => s.addMessage)
  const { mutateAsync, isPending } = useSendMessage(chat?._id)

  const send = async (e) => {
    e.preventDefault()
    if (!text.trim()) return

    const res = await mutateAsync({ receiverId: chat.users[0]._id, message: text })
    addMessage(res.sentMessage)
    setText("")
  }

  return (
    <form onSubmit={send} className="flex items-center gap-2 px-2">
      <Textarea
        value={text}
        variant="sendMessage"
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
      />
      <Button size="icon" className="rounded-full border bg-background hover:bg-muted">
        {isPending ? <Spinner size="5" /> : <Send className="text-emerald-400" size={18} />}
      </Button>{" "}
    </form>
  )
}
