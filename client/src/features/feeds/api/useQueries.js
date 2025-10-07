import { useInfiniteQuery } from "@tanstack/react-query";
import { feedApi } from "./posts.api";

export const usePosts = (type = "all", limit = 10) => {
  return useInfiniteQuery({
    queryKey: ["posts", type],
    queryFn: async ({ pageParam = 1 }) =>
      feedApi.getfeed({ type, page: pageParam, limit }),
    getNextPageParam: (lastPage) =>
      lastPage?.hasMore ? lastPage?.currentPage + 1 : undefined,
    meta: { showError: true },
  });
};
