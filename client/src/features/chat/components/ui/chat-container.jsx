import { useChatStore } from "../../store/chatStore";

export default function Container({ children }) {
  const selectedChat = useChatStore((state) => state.selectedChat);

  return (
    <div
      className={`flex h-[100svh] w-full flex-1 overflow-y-auto ${
        !selectedChat && "pt-12"
      } pb-2 md:gap-10 md:px-8 md:py-4 lg:px-4 lg:py-2.5`}
    >
      {children}
    </div>
  );
}
