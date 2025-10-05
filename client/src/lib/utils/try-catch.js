import { useErrorMessage, useErrorToast } from "@/hooks";
export default async function tryCatch(
  promise,
  options = { rethrow: true, toast: false }
) {
  try {
    const response = await promise;
    if (!response?.success)
      throw new Error(response.message || "API responded with failure");
    return response;
  } catch (error) {
    console.error("tryCatch", useErrorMessage(error));
    if (options.toast) useErrorToast(error);
    if (options.rethrow) throw error;
    return { response: null, error };
  }
}
