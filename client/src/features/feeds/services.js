import { useInfiniteQuery } from "@tanstack/react-query";
import { errorToast } from "@/utils";
import { useApi } from "@/hooks";
const POSTS_QUERY_KEY = ["posts"];

export const usePosts = (limit = 10) => {
  const { fetcher } = useApi();
  return useInfiniteQuery({
    queryKey: POSTS_QUERY_KEY,
    queryFn: async ({ pageParam = 1 }) =>
      await fetcher({ endpoint: `/posts?page=${pageParam}&limit=${limit}` }),
    getNextPageParam: (lastPage) =>
      lastPage?.hasMore ? lastPage?.currentPage + 1 : undefined,
    onError: (error) => {
      errorToast(error.message);
    },
  });
};
