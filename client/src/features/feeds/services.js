import { useInfiniteQuery } from "@tanstack/react-query";
import { errorToast } from "@/utils";
import { useApi, useErrorToast } from "@/hooks";

const POSTS_QUERY_KEY = ["posts", "all"];
const FOLLOWING_POSTS_QUERY_KEY = ["posts", "following"];

export const usePosts = (type = "all", limit = 10) => {
  const { fetcher } = useApi();

  return useInfiniteQuery({
    queryKey: ["posts", type],
    queryFn: async ({ pageParam = 1 }) => {
      const endpoint =
        type === "following"
          ? `/posts/following?page=${pageParam}&limit=${limit}`
          : `/posts?page=${pageParam}&limit=${limit}`;
      return await fetcher({ endpoint });
    },
    getNextPageParam: (lastPage) =>
      lastPage?.hasMore ? lastPage?.currentPage + 1 : undefined,
    onError: (error) => useErrorToast(error),
  });
};

// export const usePosts = (limit = 10) => {
//   const { fetcher } = useApi();
//   return useInfiniteQuery({
//     queryKey: POSTS_QUERY_KEY,
//     queryFn: async ({ pageParam = 1 }) =>
//       await fetcher({ endpoint: `/posts?page=${pageParam}&limit=${limit}` }),
//     getNextPageParam: (lastPage) =>
//       lastPage?.hasMore ? lastPage?.currentPage + 1 : undefined,
//     onError: (error) => {
//       errorToast(error.message);
//     },
//   });
// };

// function fetchPosts({ pageParam = 1 }) {
//   const { fetcher } = useApi();
//   return fetcher({
//     endpoint: `/posts/following?page=${pageParam}&limit=10`,
//   });
// }

// export const useFollowingPosts = (limit=10) => {
//   return useInfiniteQuery({
//     queryKey: FOLLOWING_POSTS_QUERY_KEY,
//     queryFn: fetchPosts,
//     getNextPageParam: (lastPage) =>
//       lastPage?.hasMore ? lastPage?.currentPage + 1 : undefined,
//     onError: (err) => useErrorToast(err),
//   });
// };
