import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@services/fetcher";
import { useDispatch } from "react-redux";
import { updatePostLikes, updateSavedPosts } from "./postSlice";
import { useAuth } from "@/context";
import { errorToast, successToast } from "@/utils";

const POSTS_QUERY_KEY = ["posts"];

export const usePosts = () =>
   useQuery({
      queryKey: POSTS_QUERY_KEY,
      queryFn: () => fetcher({ endpoint: "/posts" }),
   });
export const useCreatePost = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: (formData) => fetcher({ endpoint: "/posts", method: "POST", data: formData }),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY });
      },
   });
};
export const useUpdatePost = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: (formData) => fetcher({ endpoint: '', method: 'PUT', data: formData }),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY });
      }
   })
}
export const useMyPosts = () =>
   useQuery({
      queryKey: ['myposts'],
      queryFn: () => fetcher({ endpoint: '/posts/me' })
   })
export const useToggleLikePost = () => {
   const queryClient = useQueryClient();
   const dispatch = useDispatch();
   const { auth } = useAuth();
   const userId = auth.profile?._id;

   return useMutation({
      mutationFn: (postId) => fetcher({ endpoint: `/posts/${postId}/like`, method: "PUT" }),
      onSuccess: (_, postId) => {
         dispatch(updatePostLikes({ postId, userId }));
         queryClient.invalidateQueries("posts");
      },
   });
};
export const useSavedPosts = () =>
   useQuery({
      queryKey: ["savedPosts"],
      queryFn: () => fetcher({ endpoint: '/posts/saved' })
   })
export const useToggleSavePost = () => {
   const queryClient = useQueryClient();
   const dispatch = useDispatch();
   return useMutation({
      mutationFn: (postId) => fetcher({ endpoint: `/posts/${postId}/save`, method: 'PUT' }),
      onSuccess: (_, postId) => {
         dispatch(updateSavedPosts(postId))
         queryClient.invalidateQueries({ queryKey: ['savedPosts'] })
      }
   })
}
export const useGetPostComments = (postId) => {
   return useQuery({
      queryKey: ['comments', postId],
      queryFn: () => fetcher({ endpoint: `/posts/comments/${postId}` })
   })
}
export const useCreateComment = () => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: ({ comment, postId }) => fetcher({
         endpoint: `/posts/comments/${postId}`, method: 'POST', data: { comment }
      }),
      onSuccess: (response, postId) => {
         queryClient.invalidateQueries({ queryKey: ['comments', postId] })
      },
      onError: (error) => {
         console.error(error.response);
         errorToast(error?.response?.data?.message || "Error creating comment");
      }
   })
}
export const useDeleteComment = () => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: ({ postId, commentId }) => fetcher({
         endpoint: `/posts/comments/${postId}/${commentId} `, method: 'DELETE'
      }),
      onSuccess: (res, postId) => {
         queryClient.invalidateQueries({ queryKey: ['comments', postId] });
         successToast('Comment successfully deleted')
      },
      onError: (error) => {
         errorToast(error?.response?.data?.message || "Error deleting comment");
      }
   })
}




