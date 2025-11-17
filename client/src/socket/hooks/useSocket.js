import { useEffect, useState } from "react"
import notificationEvents from "@/socket/events/notifications"
import presenceEvents from "@/socket/events/presence"
import { socket } from "@/socket/socket"
import chatEvents from "../events/chat"

export default function useSocket(userId, options = {}) {
  const [onlineUsers, setOnlineUsers] = useState([])

  useEffect(() => {
    if (!userId) return

    socket.emit("register", userId)

    const cleanups = []
    cleanups.push(presenceEvents(socket, setOnlineUsers))
    cleanups.push(notificationEvents(socket))
    if (options.chat) cleanups.push(chatEvents(socket, options.chat))

    return () => {
      cleanups.forEach((cleanup) => {
        if (cleanup) cleanup()
      })
    }
  }, [userId, options])

  return { socket, onlineUsers }
}
