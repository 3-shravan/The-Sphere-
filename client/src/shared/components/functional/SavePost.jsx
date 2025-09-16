import { Loading } from "@/components";
import { useAuth } from "@/context";
import { useErrorToast } from "@/hooks";
import useSavePost from "@/shared/hooks/useSavePost";

const SavePost = ({ postId }) => {
  const { toggleSave, isSaved, saveIsPending } = useSavePost(postId);
  const { auth } = useAuth();
  return (
    <button
      className="text-xs py-0.5 text-second hover:text-rose-600 cursor-pointer"
      onClick={() => {
        if (!auth?.isAuthenticated)
          return useErrorToast({}, "You need to be logged in to save posts");
        toggleSave(postId);
      }}
    >
      {saveIsPending ? <Loading size={3} /> : isSaved ? "Unsave" : "Save"}
    </button>
  );
};
export default SavePost;
