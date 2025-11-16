import { User } from "../../models/user/user.model.js";
import { log } from "../../utils/index.js";
import {
  addOnlineUser,
  getOnlineUsersList,
  removeOnlineUser,
} from "../utils/onlineUsers.js";

export default function presenceHandler(io, socket) {
  socket.on("register", async (userId) => {
    const user = await User.findById(userId)
      .select("name fullName profilePicture")
      .lean();

    log(`✅ ${user.name} is online`);
    
    addOnlineUser(userId, socket.id, user);
    const list = getOnlineUsersList();
    io.emit("online-users", list);
  });

  socket.on("disconnect", () => {
    const removedUserId = removeOnlineUser(socket.id);
    if (removedUserId) {
      const list = getOnlineUsersList();
      io.emit("online-users", list);
      log(`❌ User ${removedUserId} went offline`);
    }
  });
}
