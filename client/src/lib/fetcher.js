import axios from "@/lib/axios";
export const fetcher = async ({
  endpoint,
  method = "GET",
  data = null,
  params = null,
}) =>
  await axios({
    url: endpoint,
    method,
    data,
    params,
  }).then((res) => res.data);
