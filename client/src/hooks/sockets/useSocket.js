import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { BASE_API_URL } from "@/lib/api";
import notify from "@/features/notifications/notify";

const socket = io(BASE_API_URL, {
  transports: ["websocket"],
  withCredentials: true,
});

export default function useSocket(userId) {
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (!userId) return;

    socket.emit("register", userId);
    const handleNotification = (data) => data && notify(data);
    const handleOnlineUsers = (users) => setOnlineUsers(users);

    socket.on("online-users", handleOnlineUsers);
    socket.on("notification", handleNotification);

    return () => {
      socket.off("notification", handleNotification);
      socket.off("online-users", handleOnlineUsers);
    };
  }, [userId]);
  return { socket, onlineUsers };
}
