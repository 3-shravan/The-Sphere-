// import { useSelector } from "react-redux";
import { useSavedPosts, useToggleSavePost } from "../services";
import { useState } from "react";

const useSavePost = (postId) => {
  const { data } = useSavedPosts();
  // const { savedPosts } = useSelector((state) => state.posts);
  // console.log(data?.savedPosts);
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
