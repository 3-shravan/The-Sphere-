import { io, onlineUsers } from "./socket.js"

export const sendNotification = async (userId, payload) => {
  try {
    const socketId = onlineUsers.get(userId.toString())
    if (socketId) {
      io.to(socketId).emit("notification", payload)

      if (process.env.NODE_ENV === "development")
        console.log(`📨 Notification sent to ${userId}`, payload)
    } else {
      if (process.env.NODE_ENV === "development") console.log(`⚠️ User ${userId} is offline`)
    }
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.error("❌ Error sending notification:", err)
  }
}
