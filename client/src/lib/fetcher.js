import axios, { publicAxiosInstance } from "@/lib/axios"
export const fetcher = async ({
  endpoint,
  method = "GET",
  data = null,
  params = null,
  publicApi = false,
}) =>
  publicApi
    ? await publicAxiosInstance({
        url: endpoint,
        method,
        data,
        params,
      }).then((res) => res.data)
    : await axios({
        url: endpoint,
        method,
        data,
        params,
      }).then((res) => res.data)
