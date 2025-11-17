import { MessageSquare } from "lucide-react"
import { Spinner } from "@/components"
import { useConnections } from "../../api/useQueries"
import ListConnections from "./ListConnections"

export default function Connections() {
  const { data, isLoading } = useConnections()
  if (isLoading) return <Spinner />
  return (
    <div className="flex h-full flex-col overflow-auto rounded-lg">
      <h1 className="flex items-center gap-2 px-4.5 py-4">
        <MessageSquare className="h-5 w-5 text-rose-400" />
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
