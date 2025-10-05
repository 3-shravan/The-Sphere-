import axios from "@/lib/axios";

export const fetcher = async ({
  endpoint,
  method = "GET",
  data = null,
  params = null,
}) => {
  try {
    const res = await axios({
      url: endpoint,
      method,
      data,
      params,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
