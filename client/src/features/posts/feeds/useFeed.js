import { useDispatch, useSelector } from "react-redux";
import { usePosts, useSavedPosts } from "../services";
import { setPosts, setSavedPosts } from "../postSlice";
import { useEffect } from "react";

const useFeed = () => {
   const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } = usePosts();
   const { data: savedPosts } = useSavedPosts();

   const dispatch = useDispatch();
   useEffect(() => {
      if (data?.pages) {
         const allPosts = data.pages.flatMap((page) => page.posts);
         dispatch(setPosts(allPosts));
      }
      if (savedPosts?.savedPosts) dispatch(setSavedPosts(savedPosts.savedPosts));
   }, [data, savedPosts, dispatch]);

   // Extract posts from the Redux state
   const { posts } = useSelector((state) => state.posts || []);
   return { posts, status, hasNextPage, fetchNextPage, isFetchingNextPage };
}

export default useFeed
