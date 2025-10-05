import { useInfiniteQuery } from "@tanstack/react-query";
import { useApi } from "@/hooks";
import { getPosts } from "./posts.api";
import { showErrorToast } from "@/lib/utils/api-responses";

export const usePosts = (type = "all", limit = 10) => {
  const { fetcher } = useApi();
  return useInfiniteQuery({
    queryKey: ["posts", type],
    queryFn: async ({ pageParam = 1 }) =>
      getPosts(fetcher, { type, page: pageParam, limit }),
    getNextPageParam: (lastPage) =>
      lastPage?.hasMore ? lastPage?.currentPage + 1 : undefined,
    onError: (error) => showErrorToast(error),
  });
};
