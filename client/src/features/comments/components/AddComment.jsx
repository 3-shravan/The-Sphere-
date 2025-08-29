import { Button } from "@/components/ui/button";
import useComment from "../hooks/useComment";
import { MessageSquare } from "lucide-react";

const AddComment = ({ postId }) => {
  const { comment, setComment, handleCreate } = useComment(postId);
  return (
    <div className="mt-4 pb-1 flex items-center space-x-2">
      <MessageSquare size={22} className="text-muted-foreground" />
      <textarea
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
        className="flex-1 resize-none h-9 border px-2 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-muted"
        rows={1}
      />
      <Button
        variant="outline"
        className=" text-second px-3 py-2  text-xs hover:bg-muted"
        onClick={() => handleCreate()}
      >
        Comment
      </Button>
    </div>
  );
};

export default AddComment;
