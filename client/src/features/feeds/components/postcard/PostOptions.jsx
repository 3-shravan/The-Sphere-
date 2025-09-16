import { useState } from "react";
import { Tally2 } from "lucide-react";
import { Modal } from "@/components";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ShareModal } from "@/shared";

const PostOptions = ({
  setConfirmDelete,
  setOpen,
  isThoughts,
  postId,
  authorized,
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Dropdown Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer outline-hidden">
          <Tally2 />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="font-Poppins bg-card cursor-pointer">
          {authorized && !isThoughts && (
            <DropdownMenuItem
              className="cursor-pointer px-3"
              onClick={() => setOpen(true)}
            >
              ⚙ Edit
            </DropdownMenuItem>
          )}
          {authorized && (
            <>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setConfirmDelete(true)}
              >
                ❌ Delete
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            🚀 Share
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Share Modal */}
      {showModal && (
        <Modal onCancel={() => setShowModal(false)} title="Share Post">
          <ShareModal postId={postId} />
        </Modal>
      )}
    </>
  );
};

export default PostOptions;
