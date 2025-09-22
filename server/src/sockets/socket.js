import { Server } from "socket.io";

export let io = null;
export const onlineUsers = new Map();

const log = (...args) => {
  if (process.env.NODE_ENV === "production") {
    console.log(...args);
  }
};

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    log("⚡ User connected:", socket.id);

    socket.on("register", (userId) => {
      onlineUsers.set(userId, socket.id);
      log(`✅ ${userId} is online`);
    });

    socket.on("disconnect", () => {
      for (let [uid, sid] of onlineUsers.entries()) {
        if (sid === socket.id) {
          onlineUsers.delete(uid);
          log(`❌ ${uid} went offline`);
          break;
        }
      }
    });
  });
};
