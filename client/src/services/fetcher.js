import axios from "@services/axios";
export const fetcher = async ({ endpoint, method = "GET", data = null, params = null }) => {
   const res = await axios({
      url: endpoint,
      method,
      data,
      params,
   });
   return res.data;
};
