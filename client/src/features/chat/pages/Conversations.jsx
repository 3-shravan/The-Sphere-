import ChatArea from "../components/chat-area/ChatArea"
import SearchUsers from "../components/chats-search/SearchUsers"
import Connections from "../components/connections/Connections"
import Container from "../components/ui/chat-container"

export default function Conversations() {
  return (
    <Container>
      <div className="flex w-full max-w-sm flex-col gap-6 md:max-w-[35%]">
        <SearchUsers />
        <Connections />
      </div>
      <ChatArea />
    </Container>
  )
}
