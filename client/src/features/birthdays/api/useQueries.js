import { useApi } from "@/hooks";
import { useQuery } from "@tanstack/react-query";
import { BIRTHDAY_QUERY_KEYS } from "./query-keys";

export const useTodaysBirthdays = () => {
  const { fetcher } = useApi();
  return useQuery({
    queryKey: BIRTHDAY_QUERY_KEYS.todaysBirthdays,
    queryFn: () => fetcher({ endpoint: "/users/birthdays" }),
    meta: {
      showError: true,
    },
  });
};
