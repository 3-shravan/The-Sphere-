import { useApi } from "@/hooks";
import { showErrorToast, showSuccessToast } from "@/lib/utils/api-responses";
import { fetcher } from "@/lib/fetcher";
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
      showSuccessToast(data.message || "Profile updated Successfully");
      const updatedUsername = data?.user?.name;
      if (updatedUsername) {
        naviagte(`/profile/${updatedUsername}`);
        queryClient.invalidateQueries({
          queryKey: ["profile", updatedUsername],
        });
      }
    },
    onError: (error) => showErrorToast(error),
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
    onError: (error) => showErrorToast(error),
  });
};

export const useDeleteProfilePicture = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>
      fetcher({ endpoint: "/users/profile-picture", method: "DELETE" }),
    onSuccess: (data) => {
      showSuccessToast(data);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => showErrorToast(error),
  });
};
