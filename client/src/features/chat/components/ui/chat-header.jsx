import { ChevronLeft } from "lucide-react";
import { ProfilePicture } from "@/components";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks";
import { useChatStore } from "../../store/chatStore";
import { useNavigate } from "react-router-dom";

export function ChatHeader() {
  const IS_MOBILE = useIsMobile();
  const navigate = useNavigate();

  const chat = useChatStore((s) => s.selectedChat);
  const onlineUsers = useChatStore((s) => s.onlineUsers);

  const user = chat?.users?.[0];
  const isOnline = onlineUsers?.some((u) => u._id === user?._id);

  function handleBackClick() {
    useChatStore.getState().setSelectedChat(null);
    if (IS_MOBILE) navigate("/conversations");
  }

  return (
    <header className="flex items-center gap-2 p-2 ">
      {IS_MOBILE && (
        <Button onClick={handleBackClick} variant="ghost" size="icon">
          <ChevronLeft />
        </Button>
      )}

      <ProfilePicture
        profilePicture={user?.profilePicture}
        username={user?.name}
        size="md"
      />

      <div className="flex flex-col leading-tight">
        <span className="font-Gilroy text-sm font-medium">{user?.name}</span>

        <span
          className={`flex items-center gap-1 font-mono text-[10px] ${
            isOnline ? "text-emerald-400" : "text-gray-500"
          }`}
        >
          {isOnline && <span className="text-[8px]">● active</span>}
        </span>
      </div>
    </header>
  );
}
