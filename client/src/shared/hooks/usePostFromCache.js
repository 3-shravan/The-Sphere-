import { useQueryClient } from "@tanstack/react-query";

export default function usePostFromCache(postId) {
  const queryClient = useQueryClient();
  const cache = queryClient.getQueryData(["posts", "following"]);

  if (!cache) return undefined;
  const allPosts = cache.pages.flatMap((page) => page.posts);
  return allPosts.find((p) => p._id === postId);
}
