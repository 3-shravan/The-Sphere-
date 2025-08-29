import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@lib/fetcher";
import { errorToast, successToast } from "@/utils";

const COMMENTS_QUERY_KEY = (postId) => ["comments", postId];

export const useGetPostComments = (postId) => {
  return useQuery({
    queryKey: COMMENTS_QUERY_KEY(postId),
    queryFn: () => fetcher({ endpoint: `/comments/${postId}` }),
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || "Error while getting the comments."
      );
    },
  });
};

export const useCreateComment = (postId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ comment, parentId = null }) =>
      fetcher({
        endpoint: `/comments/${postId}`,
        method: "POST",
        data: { comment, parentId },
      }),
    onSuccess: (data) => {
      successToast(data.message);
      queryClient.invalidateQueries({ queryKey: COMMENTS_QUERY_KEY(postId) });
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || "Error while creating comment"
      );
    },
  });
};

export const useDeleteComment = (postId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ commentId }) =>
      fetcher({
        endpoint: `/comments/${postId}/${commentId}`,
        method: "DELETE",
      }),
    onSuccess: (data) => {
      successToast(data.message)
      queryClient.invalidateQueries({ queryKey: COMMENTS_QUERY_KEY(postId) });
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || "Error while deleting comment"
      );
    },
  });
};
