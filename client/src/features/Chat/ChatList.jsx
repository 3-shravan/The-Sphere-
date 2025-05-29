import React, { useState } from "react";
import {
  CircleDot,
  Search,
  MessageSquareText,
  X,
  UserRound,
} from "lucide-react";

const conversations = [
  {
    id: 1,
    name: "Sonu",
    username: "@sonu",
    lastMessage: "Let's catch up tomorrow!",
    unread: 2,
    online: true,
    avatar: "/avatars/sonu.jpg",
  },
  {
    id: 2,
    name: "Raosahab",
    username: "@shanu",
    lastMessage: "Check the new post",
    unread: 0,
    online: false,
    avatar: "/avatars/shanu.jpg",
  },
  {
    id: 3,
    name: "Shantanu",
    username: "@raosahab",
    lastMessage: "Haha that was crazy 😂",
    unread: 1,
    online: true,
    avatar: "/avatars/rao.jpg",
  },
];

const ChatList = () => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="  p-4 font-Poppins lg:flex flex-col w-full  rounded-lg border-2 bg-card border-border lg:p-3 gap-2">
      {expanded ? (
        <div className="bg-neutral-900 text-white rounded-xl shadow-xl overflow-hidden border border-neutral-800">
          <div className="flex items-center justify-between px-4 py-3 bg-neutral-800 border-neutral-700">
            <div className="flex items-center gap-2 text-rose-300 font-semibold text-sm">
              <MessageSquareText size={18} />
              Messages
            </div>
            <button
              onClick={() => setExpanded(false)}
              className="text-neutral-400 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          <div className="px-3 py-2  border-neutral-700 bg-neutral-900">
            <div className="flex items-center bg-neutral-800 px-3 py-2 rounded-full">
              <Search size={16} className="text-neutral-400 mr-2" />
              <input
                type="text"
                placeholder=""
                className="bg-transparent outline-none text-sm text-white placeholder:text-neutral-500 w-full"
              />
            </div>
          </div>

          <div className="h-64 overflow-y-auto px-2 py-2 bg-neutral-900 space-y-1">
            {conversations.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-neutral-800 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <UserRound />
                    {c.online && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-neutral-900 rounded-full" />
                    )}
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-white">{c.name}</div>
                    <div className="text-neutral-500 text-[10px] truncate w-40">
                      {c.lastMessage}
                    </div>
                  </div>
                </div>
                {c.unread > 0 && (
                  <div className="text-xs  text-rose-400   rounded-full">
                    {c.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <button
          onClick={() => setExpanded(true)}
          className="bg-rose-400 text-muted text-xs px-4 py-2 rounded-full shadow-lg hover:bg-rose-500 transition-all flex items-center gap-2"
        >
          <MessageSquareText size={18} />
          Messages
        </button>
      )}
    </div>
  );
};

export default ChatList;
