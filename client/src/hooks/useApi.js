import { useNavigate, useState, useCallback } from "@lib";
import { errorToast, successToast } from "@utils";
import axios from "@lib/axios";

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
        console.log(err);
        const msg = err.response?.data?.message || "Server failed to respond";
        errorToast(msg);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { request, loading };
};

export default useApi;
