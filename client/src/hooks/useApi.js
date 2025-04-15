import { useNavigate, axios, useState, useCallback } from "@lib";
import { errorToast, successToast } from "@utils";
import { useAuth } from '@context';

const BASE_URL = "http://localhost:8000/api/v1/auth";

const useApi = (endpoint, method = "GET", redirectUrl = null) => {

   const navigate = useNavigate();
   const { auth } = useAuth();

   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   const execute = useCallback(async (body = null) => {
      setLoading(true);
      setError(null);
      try {
         const response = await axios({
            url: `${BASE_URL}${endpoint}`,
            method,
            data: body,
            headers: {
               Authorization: `Bearer ${auth.token}`,
               "Content-Type": "application/json"
            }
         });
         if (response.status === 200) {
            setData(response.data);
            if (response.data?.message) successToast(response.data.message);
            if (redirectUrl) navigate(redirectUrl, { replace: true });

            return response;
         }
      } catch (err) {
         const errorMessage = err.response?.data?.message || "Server is down right now.";
         errorToast(errorMessage);
         setError(errorMessage);

         return errorMessage;
      } finally { setLoading(false) }

   }, [endpoint, method, redirectUrl, navigate]);

   return { execute, data, loading, error };
};

export default useApi;

