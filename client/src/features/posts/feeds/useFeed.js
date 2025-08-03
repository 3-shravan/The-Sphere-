import { useDispatch } from "react-redux";
import { usePosts, useSavedPosts } from "../services";
import { setPosts, setSavedPosts } from "../postSlice";
import { useEffect } from "react";

const useFeed = () => {
  const dispatch = useDispatch();
  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePosts();
  const posts = data?.pages.flatMap((page) => page.posts);
  const { data: savedPosts } = useSavedPosts();
  
  useEffect(() => {
    if (posts) dispatch(setPosts(posts));
    if (savedPosts?.savedPosts) dispatch(setSavedPosts(savedPosts.savedPosts));
  }, [savedPosts]);

  return { posts, status, hasNextPage, fetchNextPage, isFetchingNextPage };
};

export default useFeed;
