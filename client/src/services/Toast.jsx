import { Toaster } from "sonner";
import "@styles/toast.css";
export const Toast = () => {
  return (
    <Toaster
      position="bottom-right"
      duration={3000}
      theme="dark"
      className="sonner-container"
    />
  );
};
