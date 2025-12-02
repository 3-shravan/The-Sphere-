import { MessageSquare } from "lucide-react"
import { useEffect } from "react"
import { Loading } from "@/components"
import { useConnections } from "../../api/useQueries"
import { useChatListStore } from "../../store/chatListStore"
import ListConnections from "./ListConnections"

export default function Connections() {
  const { data, isLoading } = useConnections()

  useEffect(() => {
    if (data?.connections) useChatListStore.getState().setChats(data.connections)
  }, [data])
  const chats = useChatListStore((state) => state.chats)

  if (isLoading) return <Loading />

  return (
    <div className="flex flex-1 flex-col overflow-auto rounded-lg">
      <h1 className="flex items-center gap-2 px-4.5 py-4">
        <MessageSquare className="h-5 w-5 text-rose-400" />
        Chats
      </h1>
      <main>
        <div className="flex flex-col overflow-auto pb-10">
          <ListConnections connections={chats} />
        </div>
      </main>
    </div>
  )
}
