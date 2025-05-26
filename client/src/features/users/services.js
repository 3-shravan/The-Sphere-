import { fetcher } from "@/services/fetcher";
import { useQuery } from "@tanstack/react-query";

export const useSuggestedUsers = () => {
   return useQuery({
      queryKey: ["suggestedUsers"],
      queryFn: () => fetcher({ endpoint: "/users/suggested" }),
   });
};