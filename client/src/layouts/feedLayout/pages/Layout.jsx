import { Outlet } from "react-router-dom"
import { useChatStore } from "@/features/chat/store/chatStore"
import { Dock, PhoneHeader, Sidebar } from "../components"

export default function Layout() {
  const selectedChat = useChatStore((state) => state.selectedChat)
  return (
    <div className="h-[100svh] w-full md:flex">
      {!selectedChat && <PhoneHeader />}
      <Sidebar />
      <main className="flex h-full flex-1 md:h-screen md:min-w-[70vw]">
        <Outlet />
      </main>
      {!selectedChat && <Dock />}
    </div>
  )
}
