import { useState } from "react";

const ReplyBox = ({ handleCreateReply, parentId, setReplyInput }) => {
  const [reply, setReply] = useState("");
  const createReply = () => {
    handleCreateReply(parentId, reply);
    setReplyInput((prev) => !prev);
    setReply("");
  };
  return (
    <div className="my-1 flex w-[50%] gap-2">
      <input
        type="text"
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        className="flex-1 border rounded-md ml-10 px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-200"
      />
      <button className="text-xs" onClick={createReply}>
        Reply
      </button>
    </div>
  );
};
export default ReplyBox;
