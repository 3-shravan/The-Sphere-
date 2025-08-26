// import { useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { setPosts, setSavedPosts } from "@/features/posts/postSlice";
import { usePosts } from "../services";

const useFeed = () => {
  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePosts();
  const posts = data?.pages.flatMap((page) => page.posts);

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   if (posts) dispatch(setPosts(posts));
  //   if (savedPosts?.savedPosts) dispatch(setSavedPosts(savedPosts.savedPosts));
  // }, [savedPosts]);

  return { posts, status, hasNextPage, fetchNextPage, isFetchingNextPage };
};

export default useFeed;
