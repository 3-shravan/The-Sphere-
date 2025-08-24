import { useSelector } from "react-redux";
import { useToggleSavePost } from "../services";

const useSavePost = (postId) => {
  const { mutate: toggleSave, isPending: saveIsPending } = useToggleSavePost();
  const { savedPosts } = useSelector((state) => state.posts);
  const isSaved = savedPosts.some((p) => postId === p._id);

  return { toggleSave, isSaved, saveIsPending };
};
export default useSavePost;
