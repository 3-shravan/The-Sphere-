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
      errorToast(error.response?.data?.message || "Failed to upload your post"),
  });
};

export const useUpdatePost = (postId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) =>
      fetcher({ endpoint: `/posts/${postId}`, method: "PUT", data: formData }),
    onSuccess: (data) => {
      successToast(data?.message || "Post updated successfully");
      queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY });
    },
    onError: (error) =>
      errorToast(error.response?.data?.message || "Failed to update post"),
  });
};

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
