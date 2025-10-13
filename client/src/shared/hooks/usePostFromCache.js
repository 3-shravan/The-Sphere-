import { useQueryClient } from "@tanstack/react-query";
import { usePost } from "@/context";
import { POSTS_QUERY_KEYS } from "@/lib/utils/global-query-keys";

export default function usePostFromCache(postId, source = "feed") {
  const queryClient = useQueryClient();
  const { dropdown } = usePost();

  const key = (() => {
    switch (source) {
      case "saved":
        return POSTS_QUERY_KEYS.saved();
      default:
        return POSTS_QUERY_KEYS.feed(dropdown);
    }
  })();

  const cache = queryClient.getQueryData(key);
  if (!cache) return undefined;

  const allPosts = cache.pages
    ? cache.pages.flatMap((page) => page.posts)
    : cache.posts || cache;

  return allPosts.find((p) => p._id === postId);
}
