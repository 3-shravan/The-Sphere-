import { useState } from "react";
import { Tally2 } from "lucide-react";
import { Confirm, Modal } from "@/components";
import { ShareModal, usePostFromCache } from "@/shared";
import { useDeletePost } from "@/features/posts/services";
import EditPost from "@/features/posts/post/EditPost";
import { useAuth } from "@/context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const PostOptions = ({ postId }) => {
  const post = usePostFromCache(postId);
  if (!post) return null;

  const [showModal, setShowModal] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const { currentUserId } = useAuth();
  const authorized = currentUserId === post?.author?._id;
  const isThoughts = !!post?.thoughts;

  const { mutate: deletePost } = useDeletePost();
  const handledeletePost = () => {
    deletePost(postId);
    setConfirmDelete(false);
  };

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
              onClick={() => setEditOpen(true)}
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

      {/* Edit Modal */}
      {editOpen && (
        <EditPost open={open} setOpen={setEditOpen} postId={postId} />
      )}
      {/* Share Modal */}
      {showModal && (
        <Modal onCancel={() => setShowModal(false)} title="Share Post">
          <ShareModal postId={postId} />
        </Modal>
      )}
      {/* Delete Confirm Modal */}
      {confirmDelete && (
        <Confirm
          onCancel={() => setConfirmDelete(false)}
          onConfirm={handledeletePost}
        />
      )}
    </>
  );
};

export default PostOptions;
