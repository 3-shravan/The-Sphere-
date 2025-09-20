import { usePosts } from "@/features/feeds/services";
import { createContext, useContext, useEffect, useState } from "react";

export const PostContext = createContext();

export function PostProvider({ children }) {
  const [dropdown, setDropdown] = useState("following");
  const [posts, setPosts] = useState([]);

  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePosts(dropdown, 5);

  useEffect(() => {
    const allPostsFromData = data?.pages?.flatMap((page) => page?.posts) || [];
    setPosts(allPostsFromData);
  }, [data]);

  const fetchInfinite = {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };

  return (
    <PostContext.Provider
      value={{ posts, status, fetchInfinite, dropdown, setDropdown }}
    >
      {children}
    </PostContext.Provider>
  );
}

export const usePost = () => useContext(PostContext);
