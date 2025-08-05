import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { fetcher } from "@lib/fetcher";
import { errorToast, successToast } from "@/utils";

const POSTS_QUERY_KEY = ["posts"];

export const usePosts = (limit = 2) => {
  return useInfiniteQuery({
    queryKey: POSTS_QUERY_KEY,
    queryFn: async ({ pageParam = 1 }) =>
      await fetcher({ endpoint: `/posts?page=${pageParam}&limit=${limit}` }),
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.currentPage + 1 : undefined,
  });
};
