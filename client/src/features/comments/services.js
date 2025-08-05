import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@lib/fetcher";
import { errorToast, successToast } from "@/utils";

const COMMENTS_QUERY_KEY = (postId) => ["comments", postId];

export const useGetPostComments = (postId) => {
  return useQuery({
    queryKey: COMMENTS_QUERY_KEY(postId),
    queryFn: () => fetcher({ endpoint: `/comments/${postId}` }),
  });
};

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
