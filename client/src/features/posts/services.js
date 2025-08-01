import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { fetcher } from "@services/fetcher";
import { errorToast, successToast } from "@/utils";
const POSTS_QUERY_KEY = ["posts"];
const MY_POSTS_QUERY_KEY = ["myposts"];
const SAVED_POSTS_QUERY_KEY = ["savedPosts"];
const COMMENTS_QUERY_KEY = (postId) => ["comments", postId];

// 🟢 GET ALL POSTS (with pagination)
export const usePosts = (limit = 2) => {
  return useInfiniteQuery({
    queryKey: POSTS_QUERY_KEY,
    queryFn: async ({ pageParam = 1 }) =>
      await fetcher({ endpoint: `/posts?page=${pageParam}&limit=${limit}` }),
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.currentPage + 1 : undefined,
  });
};

// 🟢 CREATE POST
export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) =>
      fetcher({ endpoint: "/posts", method: "POST", data: formData }),
    onSuccess: (response) => {
      successToast(response?.message);
      queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY });
    },
    onError: (error) =>
      errorToast(
        error.response?.data?.message || "Failed to share your thoughts"
      ),
  });
};

// 🟢 UPDATE POST
export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) =>
      fetcher({ endpoint: "", method: "PUT", data: formData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY });
    },
  });
};

// 🟢 GET MY POSTS
export const useMyPosts = () =>
  useQuery({
    queryKey: MY_POSTS_QUERY_KEY,
    queryFn: () => fetcher({ endpoint: "/posts/me" }),
  });

// 🟢 TOGGLE LIKE POST
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

// 🟢 GET SAVED POSTS
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

// 🟢 TOGGLE SAVE POST
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

// 🟢 GET COMMENTS FOR POST
export const useGetPostComments = (postId) => {
  return useQuery({
    queryKey: COMMENTS_QUERY_KEY(postId),
    queryFn: () => fetcher({ endpoint: `/comments/${postId}` }),
  });
};

// 🟢 CREATE COMMENT
export const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ comment, postId }) =>
      fetcher({
        endpoint: `/comments/${postId}`,
        method: "POST",
        data: { comment },
      }),
    onSuccess: (response, postId) => {
      queryClient.invalidateQueries({ queryKey: COMMENTS_QUERY_KEY(postId) });
    },
    onError: (error) => {
      errorToast(error?.response?.data?.message || "Error creating comment");
    },
  });
};

// 🟢 DELETE COMMENT
export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, commentId }) =>
      fetcher({
        endpoint: `/comments/${postId}/${commentId}`,
        method: "DELETE",
      }),
    onSuccess: (res, postId) => {
      queryClient.invalidateQueries({ queryKey: COMMENTS_QUERY_KEY(postId) });
      successToast("Comment successfully deleted");
    },
    onError: (error) => {
      errorToast(error?.response?.data?.message || "Error deleting comment");
    },
  });
};

// 🟢 DELETE POST
export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postId) =>
      fetcher({ endpoint: `/posts/${postId}`, method: "DELETE" }),
    onSuccess: (response) => {
      successToast(response.message);
      queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY });
    },
    onError: (error) => {
      errorToast(
        error.response?.data?.message || "Some error while deleting post."
      );
    },
  });
};
