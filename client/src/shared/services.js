import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { fetcher } from "@lib/fetcher";
import { errorToast, successToast } from "@/utils";

const POSTS_QUERY_KEY = ["posts"];
const SAVED_POSTS_QUERY_KEY = ["savedPosts"];
const COMMENTS_QUERY_KEY = (postId) => ["comments", postId];

export const useGetUsers = () => {
  return useMutation({
    mutationFn: ({ query }) => fetcher({ endpoint: `/users?search=${query}` }),
    onError: () => {
      errorToast("Failed to fetch user. Please try again later.");
    },
  });
};

export const useGetSinglePost = (postId) => {
  return useQuery({
    queryKey: ["posts", postId],
    queryFn: () => fetcher({ endpoint: `/posts/${postId}` }),
    enabled: !!postId,
    onError: (error) => {
      errorToast(error?.response?.data?.message || "Error fetching the post");
    },
  });
};

export const useToggleLikePost = ({ onMutate, onError } = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postId) =>
      fetcher({ endpoint: `/posts/${postId}/like`, method: "PUT" }),
    onMutate: () => {
      onMutate?.();
    },
    onError: (error) => {
      onError?.();
      errorToast(error?.response?.data?.message || "Error liking post");
    },
    onSuccess: (_, postId) => {
      queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY });
    },
  });
};

export const useToggleSavePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postId) =>
      fetcher({ endpoint: `/posts/${postId}/save`, method: "PUT" }),
    onSuccess: (_, postId) => {
      queryClient.invalidateQueries({ queryKey: SAVED_POSTS_QUERY_KEY });
    },
    onError: (error) => {
      errorToast(error?.response?.data?.message || "Error saving post");
    },
  });
};

export const useFollowUser = ({ onMutate, onError }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId) =>
      fetcher({ endpoint: `/users/${userId}/follow`, method: "PUT" }),
    onMutate: () => {
      onMutate?.();
    },
    onError: (error) => {
      onError?.();
      errorToast(
        error.response?.data?.message ||
          "Failed to follow user. Please try again later."
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["suggestedUsers"] });
    },
  });
};

export const useSavedPosts = () =>
  useQuery({
    queryKey: SAVED_POSTS_QUERY_KEY,
    queryFn: () => fetcher({ endpoint: "/posts/saved" }),
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || "Error fetching saved posts"
      );
    },
  });
