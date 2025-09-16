import { useApi, useErrorToast, useSuccessToast } from "@/hooks";
import { fetcher } from "@/lib/fetcher";

import { errorToast, successToast } from "@/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { fetcher } = useApi();
  const naviagte = useNavigate();
  return useMutation({
    mutationFn: (formData) =>
      fetcher({ endpoint: "/users/update", method: "PUT", data: formData }),
    onSuccess: (data) => {
      successToast(data.message || "Profile updated Successfully");
      const updatedUsername = data?.user?.name;
      if (updatedUsername) {
        naviagte(`/profile/${updatedUsername}`);
        queryClient.invalidateQueries({
          queryKey: ["profile", updatedUsername],
        });
      }
    },
    onError: (error) => useErrorToast(error),
  });
};

export const useSuggestedUsers = () => {
  const { fetcher } = useApi();
  return useQuery({
    queryKey: ["suggestedUsers"],
    queryFn: () => fetcher({ endpoint: "/users/suggested" }),
  });
};

export const useGetProfile = (username) => {
  return useQuery({
    queryKey: ["profile", username],
    queryFn: () => fetcher({ endpoint: `/users/profile/${username}` }),
    enabled: !!username,
    onError: (error) => useErrorToast(error),
  });
};

export const useDeleteProfilePicture = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>
      fetcher({ endpoint: "/users/profile-picture", method: "DELETE" }),
    onSuccess: (data) => {
      useSuccessToast(data);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => useErrorToast(error),
  });
};
