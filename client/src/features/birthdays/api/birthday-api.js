import { fetcher } from "@/lib/fetcher";
export const birthdayApi = {
  getTodaysBirthdays: () => fetcher({ endpoint: "/users/birthdays" }),
};
