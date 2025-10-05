import { useApi } from "@/hooks";
import { useQuery } from "@tanstack/react-query";

export const useTodaysBirthdays = () => {
  const { fetcher } = useApi();
  return useQuery({
    queryKey: ["todays-birthdays"],
    queryFn: () => fetcher({ endpoint: "/users/birthdays" }),
  });
};
