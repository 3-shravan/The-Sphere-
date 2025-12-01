import { getOnlineUserSocketIds } from "../utils/onlineUsers.js";
import { getIO } from "../utils/socketInstance.js";

export function emitMessage(receiverId, messageData) {
  const receiverSockets = getOnlineUserSocketIds(receiverId);
  if (receiverSockets) {
    receiverSockets.forEach((socketId) => {
      getIO().to(socketId).emit("newMessage", messageData);
    });
  }
}
