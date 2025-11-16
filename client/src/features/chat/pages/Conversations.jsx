import ChatArea from "../components/chat-area/ChatArea"
import SearchUsers from "../components/chats-search/SearchUsers"
import Connections from "../components/connections/Connections"
import Container from "../components/ui/chat-container"

export default function Conversations() {
  return (
    <Container>
      <div className="flex w-full max-w-sm flex-col gap-5 rounded-lg p-1 md:max-w-[33%]">
        <SearchUsers />
        <Connections />
      </div>
      <ChatArea />
    </Container>
  )
}
