import { Server } from "socket.io";
import { socketCore } from "../config/cors.js";
import { log } from "../utils/index.js";
import presenceHandler from "./handlers/presence.handler.js";
import { setIO } from "./utils/socketInstance.js";

export const initSocket = (server) => {
  const io = new Server(server, socketCore);
  setIO(io);

  io.on("connection", (socket) => {
    log("⚡ User connected:", socket.id);

    presenceHandler(io, socket);
  });
};
