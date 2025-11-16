import { Send } from "lucide-react"
import { useState } from "react"
import { Spinner } from "@/components"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useSendMessage } from "../api/useMutations"
import { useChatStore } from "../store/chatStore"

export default function MessageInput() {
  const [message, setMessage] = useState("")

  const selectedChat = useChatStore((state) => state.selectedChat)
  const { mutateAsync, isPending } = useSendMessage(selectedChat?._id)

  const sendMessage = async (e) => {
    e.preventDefault()
    if (message.trim() === "") return
    await mutateAsync({ receiverId: selectedChat.users[0]._id, message })
    setMessage("")
  }

  return (
    <form onSubmit={sendMessage} className="flex items-center gap-2 px-2">
      <Textarea
        placeholder="type a message 😀"
        variant="sendMessage"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button size="icon" className="rounded-full border bg-background hover:bg-muted">
        {isPending ? <Spinner size="5" /> : <Send className="text-emerald-400" size={18} />}
      </Button>
    </form>
  )
}
