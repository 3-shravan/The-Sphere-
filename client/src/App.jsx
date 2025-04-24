import ToastConfig from "@config/ToastConfig";
import { ReactLenis, useLenis } from "lenis/react";
import AppRoutes from "@routes/AppRoutes";
const App = () => {
  const lenis = useLenis(({ scroll }) => {});
  return (
    <>
      <ReactLenis root>
        <ToastConfig />
        <AppRoutes />
      </ReactLenis>
    </>
  );
};

export default App;
