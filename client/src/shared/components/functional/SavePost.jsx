import useSavePost from "@/shared/hooks/useSavePost";

const SavePost = ({ postId, force = false }) => {
  const { toggleSave, isSaved, saveIsPending } = useSavePost(postId);
  return (
    <button
      className="text-xs py-0.5 text-second hover:text-rose-600 cursor-pointer"
      onClick={() => !saveIsPending && toggleSave(postId)}
    >
      {force ? "Unsave" : isSaved ? "Unsave" : "Save"}
    </button>
  );
};
export default SavePost;
