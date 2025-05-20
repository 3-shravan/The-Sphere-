import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@services/fetcher";
import { useDispatch } from "react-redux";
import { updatePostLikes, updateSavedPosts } from "./postSlice";
import { useAuth } from "@/context";

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

