import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@lib/fetcher";
import { useErrorToast, useSuccessToast } from "@/hooks";

const POSTS_QUERY_KEY = ["posts"];

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData) =>
      fetcher({ endpoint: "/posts", method: "POST", data: formData }),
    onSuccess: (response) => {
      useSuccessToast(response);
      queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY });
    },
    onError: (error) => useErrorToast(error),
  });
};

export const useCreateThought = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) =>
      fetcher({ endpoint: "/posts/thought", method: "POST", data: formData }),
    onSuccess: (response) => {
      useSuccessToast(response);
      queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY });
    },
    onError: (error) => useErrorToast(error),
  });
};

export const useUpdatePost = (postId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) =>
      fetcher({ endpoint: `/posts/${postId}`, method: "PUT", data: formData }),
    onSuccess: (response) => {
      useSuccessToast(response);
      queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY });
    },
    onError: (error) => useErrorToast(error),
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postId) =>
      fetcher({ endpoint: `/posts/${postId}`, method: "DELETE" }),
    onSuccess: (response) => {
      useSuccessToast(response);
      queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY });
    },
    onError: (error) => useErrorToast(error),
  });
};
