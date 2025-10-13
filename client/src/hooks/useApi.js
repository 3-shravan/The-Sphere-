import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "@/lib/axios";
import { MODE } from "@/lib/utils/api";
import { showErrorToast } from "@/lib/utils/api-responses";

export default function useApi() {
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
          if (redirectUrl) navigate(redirectUrl, { replace: true });
          return response;
        }
      } catch (err) {
        MODE === "development" && console.error(err);
        showErrorToast(err, "⚙ Server failed to respond");
      } finally {
        setLoading(false);
      }
    },
    [navigate]
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
}
