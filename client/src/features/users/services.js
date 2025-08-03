import { fetcher } from "@/services/fetcher";
import { errorToast, successToast } from "@/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
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
    onError: (error) => {
      const errorMsg =
        error.response?.data?.message || "Failed to update profile.";
      errorToast(errorMsg);
    },
  });
};

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
  });
};

export const useGetProfile = (username) => {
  return useQuery({
    queryKey: ["profile", username],
    queryFn: () => fetcher({ endpoint: `/users/profile/${username}` }),
    enabled: !!username,
    onError: (error) => {
      const errorMsg =
        error.response.message || "Failed to fetch profile data.";
      errorToast(errorMsg);
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
      errorToast(
        error.response?.data?.message ||
          "Failed to follow user. Please try again later."
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["suggestedUsers"] });
    },
  });
};

export const useDeleteProfilePicture = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>
      fetcher({ endpoint: "/users/profile-picture", method: "DELETE" }),
    onSuccess: () => {
      successToast("Profile picture removed successfully.");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => {
      const errorMsg =
        error.response?.data?.message || "Failed to remove profile picture.";
      errorToast(errorMsg);
    },
  });
};
