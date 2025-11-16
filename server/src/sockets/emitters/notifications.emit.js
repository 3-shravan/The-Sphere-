import { getOnlineUserSocketIds } from "../utils/onlineUsers.js";
import { getIO } from "../utils/socketInstance.js";

export const sendNotification = async (userId, payload) => {
  const io = getIO();
  if (!io) return;

  const socketIds = getOnlineUserSocketIds(userId.toString());
  socketIds.forEach((sid) => {
    io.to(sid).emit("notification", payload);
  });
};
