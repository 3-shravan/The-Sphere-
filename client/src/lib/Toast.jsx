import { Toaster } from "sonner";
import "@styles/toast.css";
export const Toast = () => {
  return (
    <Toaster
      position="top-right"
      duration={3000}
      theme="light"
      className="sonner-container"
    />
  );
};
