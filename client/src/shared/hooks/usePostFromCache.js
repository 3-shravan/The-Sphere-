import { useQueryClient } from "@tanstack/react-query";

const usePostFromCache = (postId) => {
  const queryClient = useQueryClient();
  const cache = queryClient.getQueryData(["posts"]);

  if (!cache) return undefined;
  const allPosts = cache.pages.flatMap((page) => page.posts);
  return allPosts.find((p) => p._id === postId);
};

export default usePostFromCache;
