import { fetcher } from "@/services/fetcher";
import { errorToast } from "@/utils";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

export const useMyPosts = () =>
   useQuery({
      queryKey: ['myposts', 'profile'],
      queryFn: () => fetcher({ endpoint: '/posts/me' })
   })

export const useUpdateProfile = () => {
   const queryClient = new QueryClient();
   return useMutation({
      mutatonFn: (formData) => fetcher({ endpoint: '/users/update', method: 'PUT', data: formData }
      ),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['profile'] });
      },
      onError: () => {
         errorToast("Failed to update profile. Please try again later.");
      }

   })
}

export const useSuggestedUsers = () => {
   return useQuery({
      queryKey: ["suggestedUsers"],
      queryFn: () => fetcher({ endpoint: "/users/suggested" }),
   });
};

export const useGetUsers = () => {
   return useMutation({
      mutationFn: ({ query }) => fetcher({ endpoint: `/users?search=${query}` }),
      onError: () => {
         errorToast("Failed to fetch user. Please try again later.");
      },
   })
}
export const useFollowUser = () => { }
export const useBlockUser = () => { }


