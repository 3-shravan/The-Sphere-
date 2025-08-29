// import { useSelector } from "react-redux";
import { useSavedPosts, useToggleSavePost } from "../services";
import { useState } from "react";

const useSavePost = (postId) => {
  // const { savedPosts } = useSelector((state) => state.posts);
  const { data } = useSavedPosts();
  const [isSaved, setIsSaved] = useState(
    data?.savedPosts.some((p) => p._id === postId)
  );
  const { mutate: toggleSave, isPending: saveIsPending } = useToggleSavePost({
    onMutate: () => setIsSaved((prev) => !prev),
    onError: () => setIsSaved((prev) => !prev),
  });

  return { toggleSave, isSaved, saveIsPending };
};
export default useSavePost;
