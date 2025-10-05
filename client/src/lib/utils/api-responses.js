import { errorToast, successToast } from "../Toast";

export const successMessage = (response, customErrMessage) => {
  return (
    response?.data?.message ||
    response?.message ||
    response ||
    customErrMessage ||
    "Request successful 🗽"
  );
};
export const showSuccessToast = (response, customErrMessage) => {
  const message = successMessage(response, customErrMessage);
  successToast(message);
};

export const errorMessage = (error, customErrMessage) => {
  return (
    error.response?.data?.message ||
    error?.response?.data?.errors[0] ||
    error?.message ||
    customErrMessage ||
    "An Error while doing so 😢"
  );
};

export const showErrorToast = (error, customErrMessage) => {
  const message = errorMessage(error, customErrMessage);
  errorToast(message);
};
