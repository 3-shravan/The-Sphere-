import { Toaster } from "@lib";
import "@styles/toast.css";
const ToastConfig = () => {
  return (
    <Toaster
      position="bottom-right"
      duration={3000}
      theme="light"
      className="sonner-container"
    />
  );
};

export default ToastConfig;
