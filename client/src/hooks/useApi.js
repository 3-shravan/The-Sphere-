import { useNavigate, useState, useCallback } from "@lib";
import { errorToast, successToast } from "@utils";
import axios from "@services/axios";

const useApi = () => {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async ({ endpoint, method = "GET", body = null, redirectUrl = null }) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios({
          url: endpoint,
          method,
          data: body,
        });
        if (response.status === 200) {
          setData(response.data);
          if (response.data?.message) successToast(response.data.message);
          if (redirectUrl) navigate(redirectUrl, { replace: true });
          return response;
        }
      } catch (err) {
        console.log(err.response)
        const msg = err.response?.data?.message || "Something went wrong";
        errorToast(msg);
        setError(msg);
        return msg;
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  return { request, data, loading, error };
};

export default useApi;
