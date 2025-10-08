import { fetcher } from "@lib/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showErrorToast, showSuccessToast } from "@/lib/utils/api-responses";

const POSTS_QUERY_KEY = ["posts"];

export const useCreatePost = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (formData) =>
			fetcher({ endpoint: "/posts", method: "POST", data: formData }),
		onSuccess: (response) => {
			showSuccessToast(response);
			queryClient.invalidateQueries({
				queryKey: POSTS_QUERY_KEY,
				exact: false,
			});
		},
		onError: (error) => showErrorToast(error),
	});
};

export const useCreateThought = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (formData) =>
			fetcher({ endpoint: "/posts/thought", method: "POST", data: formData }),
		onSuccess: (response) => {
			showSuccessToast(response);
			queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY });
		},
		onError: (error) => showErrorToast(error),
	});
};

export const useUpdatePost = (postId) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (formData) =>
			fetcher({ endpoint: `/posts/${postId}`, method: "PUT", data: formData }),
		onSuccess: (response) => {
			showSuccessToast(response);
			queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY });
		},
		onError: (error) => showErrorToast(error),
	});
};

export const useDeletePost = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (postId) =>
			fetcher({ endpoint: `/posts/${postId}`, method: "DELETE" }),
		onSuccess: (response) => {
			showSuccessToast(response);
			queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY });
		},
		onError: (error) => showErrorToast(error),
	});
};
