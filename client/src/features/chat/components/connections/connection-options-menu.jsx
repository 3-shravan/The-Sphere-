import { CirclesThreePlus } from "phosphor-react";
import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { HandleClickOutsideWrapper } from "@/components/wrappers/HandleClickOutsideWrapper";
import { useDeleteChat } from "../../api/useMutations";
import { useChatStore } from "../../store/chatStore";

export function ConnectionOptionsMenu({ chatId }) {
  const [open, setOpen] = useState(false);
  const { mutate: deleteChat } = useDeleteChat(chatId);

  const handleDelete = (e) => {
    e.stopPropagation();
    useChatStore.getState().setMessages([]);
    deleteChat({ chatId });
    setOpen(false);
  };

  return (
    <HandleClickOutsideWrapper onClickOutside={() => setOpen(false)}>
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        <Button size="icon" variant="ghost" onClick={() => setOpen(!open)}>
          <CirclesThreePlus size={32} />
        </Button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 z-50 mt-2 w-35 overflow-hidden rounded-md border bg-background shadow-lg">
            <button
              onClick={handleDelete}
              className="flex w-full items-center gap-2 px-3 py-2 text-rose-400 text-sm hover:bg-muted"
            >
              <MdDeleteOutline size={16} /> Delete Chat
            </button>
          </div>
        )}
      </div>
    </HandleClickOutsideWrapper>
  );
}
