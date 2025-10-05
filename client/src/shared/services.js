import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@lib/fetcher";
import { showErrorToast } from "@/lib/utils/api-responses";

const POSTS_QUERY_KEY = ["posts"];
const SAVED_POSTS_QUERY_KEY = ["savedPosts"];

export const useGetUsers = () => {
  return useMutation({
    mutationFn: ({ query }) => fetcher({ endpoint: `/users?search=${query}` }),
    onError: (err) => showErrorToast(err, "Error fetching users"),
  });
};

export const useGetSinglePost = (postId) => {
  return useQuery({
    queryKey: ["posts", postId],
    queryFn: () => fetcher({ endpoint: `/posts/${postId}` }),
    enabled: !!postId,
    onError: (error) => showErrorToast(error, "Error fetching post"),
  });
};

export const useToggleLikePost = ({ onMutate, onError } = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postId) =>
      fetcher({ endpoint: `/posts/${postId}/like`, method: "PUT" }),
    onMutate: () => onMutate(),
    onError: () => onError(),
    meta: {
      // showSuccess: true,
      successMessage: "Post 🗽 successfully",
      showError: true,
      errorMessage: "Error liking post",
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY });
    },
  });
};

export const useToggleSavePost = ({ onMutate, onError } = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postId) =>
      fetcher({ endpoint: `/posts/${postId}/save`, method: "PUT" }),
    onMutate: () => onMutate?.(),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: SAVED_POSTS_QUERY_KEY }),
    onError: (error) => {
      onError?.();
      showErrorToast(error, "Error saving post");
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
      showErrorToast(error, "Error while following user");
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
    onError: (error) => showErrorToast(error, "Error fetching saved posts"),
  });

// export const useToggleLikePostCache = () => {
//   const queryClient = useQueryClient();
//   const { currentUserId, auth } = useAuth();

//   return useMutation({
//     mutationFn: (postId) =>
//       fetcher({ endpoint: `/posts/${postId}/like`, method: "PUT" }),

//     onMutate: async (postId) => {
//       await queryClient.cancelQueries({ queryKey: POSTS_QUERY_KEY });
//       const prevPosts = queryClient.getQueryData(POSTS_QUERY_KEY);

//       queryClient.setQueryData(POSTS_QUERY_KEY, (old) => {
//         if (!old) return old;
//         return {
//           ...old,
//           pages: old.pages.map((page) => ({
//             ...page,
//             posts: page.posts.map((p) => {
//               if (String(p._id) !== String(postId)) return p;

//               const alreadyLiked = p.likes.some((u) => u._id === currentUserId);

//               const newLikes = alreadyLiked
//                 ? p.likes.filter((u) => u._id !== currentUserId)
//                 : [
//                     {
//                       _id: currentUserId,
//                       name: auth?.profile?.name,
//                       profilePicture: auth?.profile?.profilePicture,
//                     },
//                     ...p.likes.filter((u) => u._id !== currentUserId), // remove duplicates
//                   ];

//               return { ...p, likes: newLikes };
//             }),
//           })),
//         };
//       });
//       return { prevPosts };
//     },

//     onError: (err, postId, context) => {
//       if (context?.prevPosts) {
//         queryClient.setQueryData(POSTS_QUERY_KEY, context.prevPosts);
//       }
//      showErrorToast(err, "Error liking post");
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY });
//     },
//   });
// };
