import { useState } from "react";
import { usePosts } from "../services";

export default function useFeed() {
  const [dropdown, setDropdown] = useState("following");

  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePosts(dropdown, 10);

  const posts = data?.pages?.flatMap((page) => page?.posts);
  return {
    posts,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    dropdown,
    setDropdown,
  };
}
