import { useQuery } from "@tanstack/react-query";
import { api } from "./shared-api";
import { POSTS_QUERY_KEYS } from "./query-keys";

export const useGetSinglePost = (postId) =>
  useQuery({
    queryKey: POSTS_QUERY_KEYS.post(postId),
    queryFn: () => api.getSinglePost(postId),
    enabled: !!postId,
    meta: { showError: true },
  });

export const useSavedPosts = () =>
  useQuery({
    queryKey: POSTS_QUERY_KEYS.saved,
    queryFn: () => api.getSavedPosts(),
    meta: { showError: true },
  });
