import { Loading } from "@/components";
import { useAuth } from "@/context";
import { useChatMessages } from "../../hooks/useChatMessages";
import { useChatWindow } from "../../hooks/useChatWindow";

export function MessagesArea() {
  const { currentUserId } = useAuth();
  const { messages, isLoading, loadOlder } = useChatMessages();
  const { autoScroll, containerRef, handleScroll, useReachToBottom } =
    useChatWindow();

  useReachToBottom(messages);

  if (isLoading) return <Loading message="Loading Messages.." />;

  if (!messages?.length) {
    return (
      <div className="min-h-0 flex-1 flex-center px-3 text-center text-muted-foreground text-sm">
        No messages yet. Start the conversation!
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onScroll={() => handleScroll(containerRef, autoScroll, loadOlder)}
      className="h-full flex-1 overflow-y-auto px-3 py-2"
    >
      <div className="flex flex-col gap-2 pb-6">
        {messages.map((msg) => {
          const mine = msg.sender?._id === currentUserId;

          return (
            <div
              key={msg._id}
              className={`flex w-full items-end gap-1 ${
                mine ? "justify-end" : "justify-start"
              }`}
            >
              {!mine && (
                <img
                  src={msg.sender?.profilePicture}
                  alt=""
                  className="h-5 w-5 rounded-full object-cover"
                />
              )}

              <div
                className={`max-w-xs rounded-2xl px-3 py-1  font-mono text-sm shadow
                  ${
                    mine
                      ? "rounded-br-none bg-primary text-primary-foreground"
                      : "rounded-bl-none bg-muted text-foreground"
                  }`}
              >
                {msg.content}

                <div className="mt-1 flex items-center justify-end text-[9px] opacity-60">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  {mine && <MessageStatus status={msg.status} />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MessageStatus({ status }) {
  if (status === "sending") return <span className="ml-1">…</span>;
  if (status === "sent") return <span className="ml-1">✓</span>;
  if (status === "failed") return <span className="ml-1 text-red-500">!</span>;
  return null;
}
