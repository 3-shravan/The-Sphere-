import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";
import { toast } from "sonner";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },

  queryCache: new QueryCache({
    onError: (error, query) => {
      const meta = query?.meta || {};
      if (meta.showError !== false) {
        toast.error(
          meta.errorMessage || error.message || "Something went wrong!"
        );
      }
    },
    onSuccess: (data, query) => {
      const meta = query?.meta || {};
      if (meta.showSuccess) {
        toast.success(meta.successMessage || "Query succeeded!");
      }
    },
  }),

  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      const meta = mutation?.meta || {};
      if (meta.showError !== false) {
        toast.error(
          meta.errorMessage || error.message || "Something went wrong!"
        );
      }
    },
    onSuccess: (data, _variables, _context, mutation) => {
      const meta = mutation?.meta || {};
      if (meta.showSuccess) {
        toast.success(meta.successMessage || "Mutation succeeded!");
      }
    },
  }),
});
