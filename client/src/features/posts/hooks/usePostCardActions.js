import { useAuth } from "@/context";
import {
   useDeletePost,
   useToggleLikePost,
   useToggleSavePost,
} from "../services";
import { useSelector } from "react-redux";
const usePostCardActions = (postId) => {
   const { auth } = useAuth();
   const { mutate: toggleLike } = useToggleLikePost();
   const { mutate: toggleSave } = useToggleSavePost();
   const { mutate: deletePost } = useDeletePost();

   const { posts } = useSelector((state) => state.posts);
   const updatedPost = posts.find((p) => p._id === postId);
   const isLiked =
      updatedPost?.likes.some((user) => user._id === auth.profile?._id) || false;

   const { savedPosts } = useSelector((state) => state.posts);
   const isSaved = savedPosts.some((p) => postId === p._id);


   return {
      auth,
      toggleLike,
      toggleSave,
      deletePost,
      isLiked,
      isSaved,
      updatedPost,
   };
}

export default usePostCardActions
