import { MessageSquare } from "lucide-react"
import { Spinner } from "@/components"
import { useConnections } from "../../api/useQueries"
import ListConnections from "./ListConnections"

export default function Connections() {
  const { data, isLoading } = useConnections()
  if (isLoading) return <Spinner />
  return (
    <div className="flex h-full flex-col overflow-auto rounded-lg bg-black">
      <h1 className="flex items-center gap-2 p-2">
        <MessageSquare className="h-5 w-5 text-gray-400" />
        Chats
      </h1>
      <main>
        <div className="flex flex-col overflow-auto">
          <ListConnections connections={data?.connections} />
        </div>
      </main>
    </div>
  )
}
