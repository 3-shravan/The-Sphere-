import { Toaster, toast } from "sonner";
import "@/styles/toast.css";

export const Toast = () => (
  <Toaster
    position="top-right"
    duration={3000}
    theme="light"
    className="sonner-container"
  />
);

export const successToast = (message) =>
  toast.success(message, {
    className: "h-10",
  });

export const errorToast = (message) => toast.error(message);

export const infoToast = (message) =>
  toast.info(message, {
    className: "h-10",
  });
