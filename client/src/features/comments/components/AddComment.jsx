import { Button } from "@/components/ui/button";
import useComment from "../hooks/useComment";
import { BsSendFill } from "react-icons/bs";
import { Textarea } from "@/components/ui/textarea";

const AddComment = ({ postId }) => {
  const { comment, setComment, handleCreate } = useComment(postId);
  return (
    <div className="mt-4 pb-1 flex items-center space-x-2">
      <Textarea
        type="text"
        value={comment}
        variant="reply"
        onChange={(e) => setComment(e.target.value)}
        placeholder="whats your thought on this ? "
        className="flex-1 resize-none h-9 custom-scrollbar-hide border px-2 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-muted"
        rows={1}
      />
      <Button variant="outline" onClick={() => handleCreate()}>
        <BsSendFill />
      </Button>
    </div>
  );
};

export default AddComment;
