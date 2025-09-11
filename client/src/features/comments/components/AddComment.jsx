import { Button } from "@/components/ui/button";
import useComment from "../hooks/useComment";
import { BiSend } from "react-icons/bi";
import { Textarea } from "@/components/ui/textarea";

const AddComment = ({ postId }) => {
  const { comment, setComment, handleCreate } = useComment(postId);
  return (
    <div className="-mb-2 pb-1 flex items-center space-x-2">
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
      <BiSend />
      </Button>
    </div>
  );
};

export default AddComment;
