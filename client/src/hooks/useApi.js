import { useNavigate, useState, useCallback } from "@lib";
import { successToast } from "@utils";
import axios from "@/lib/axios";
import { useErrorToast } from "./useResponse";

const useApi = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const request = useCallback(
    async ({ endpoint, method = "GET", body = null, redirectUrl = null }) => {
      setLoading(true);
      try {
        const response = await axios({
          url: endpoint,
          method,
          data: body,
        });
        if (response?.data?.success) {
          if (response.data.message) successToast(response.data.message);
          if (redirectUrl) navigate(redirectUrl, { replace: true });
          return response;
        }
      } catch (err) {
        if (import.meta.env.VITE_MODE == "development") console.error(err);
        useErrorToast(err, "⚙ Server failed to respond");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const fetcher = useCallback(
    async ({ endpoint, method = "GET", data = null, params = null }) => {
      const res = await axios({
        url: endpoint,
        method,
        data,
        params,
      });
      return res.data;
    },
    []
  );

  return { request, loading, fetcher };
};

export default useApi;
