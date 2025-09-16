import { errorToast, successToast } from "@/utils";

export const useSuccessMessage = (response, customErrMessage) => {
  return (
    response?.data?.message ||
    response?.message ||
    response ||
    customErrMessage ||
    "Request successful 🗽"
  );
};
export const useSuccessToast = (response, customErrMessage) => {
  const message = useSuccessMessage(response, customErrMessage);
  successToast(message);
};

export const useErrorMessage = (error, customErrMessage) => {
  return (
    error.response?.data?.message ||
    error?.response?.data?.errors[0] ||
    error?.message ||
    customErrMessage ||
    "An Error while doing so 😢"
  );
};

export const useErrorToast = (error, customErrMessage) => {
  const message = useErrorMessage(error, customErrMessage);
  errorToast(message);
};
