import { useDeveloperStore } from "@/features/developer/store/developerStore"
import ChatArea from "../components/chat-area/ChatArea"
import SearchUsers from "../components/chats-search/SearchUsers"
import Connections from "../components/connections/Connections"
import Container from "../components/ui/chat-container"
import { useChatStore } from "../store/chatStore"

export default function Conversations() {
  const { selectedChat } = useChatStore()
  const { isChat } = useDeveloperStore()
  return (
    <Container>
      {isChat ? (
        <>
          <div
            className={`${selectedChat && "hidden md:flex"} w-full flex-col gap-5 rounded-lg p-1 md:max-w-[33%]`}
          >
            <SearchUsers />
            <Connections />
          </div>
          <div className={`${!selectedChat && "hidden md:flex"} w-full rounded-xl bg-accent/20`}>
            <ChatArea />
          </div>
        </>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-center font-medium text-gray-500 text-lg">
            Chat feature will be available soon!
          </p>
        </div>
      )}
    </Container>
  )
}
