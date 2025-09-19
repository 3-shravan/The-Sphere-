import { useEffect } from "react";
import { io } from "socket.io-client";
import { BASE_API_URL } from "@/lib/api";
import notify from "@/features/notifications/notify";

const socket = io(BASE_API_URL, {
  transports: ["websocket"],
  withCredentials: true,
});

export default function useSocket(userId) {
  useEffect(() => {
    if (!userId) return;

    socket.emit("register", userId);
    const handleNotification = (data) => data && notify(data);

    socket.on("notification", handleNotification);
    return () => socket.off("notification", handleNotification);
  }, [userId]);
}
