import "./global.css";
import App from "./App.jsx";
import store from "./store/store.js";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ContextProvider, ThemeProvider, MenuProvider } from "@/context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";

import { registerSW } from "virtual:pwa-register";
registerSW({
  onNeedRefresh() {
    console.log("New content available. Refresh!");
  },
  onOfflineReady() {
    console.log("App ready to work offline.");
  },
});

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ContextProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ThemeProvider>
            <MenuProvider>
              <App />
            </MenuProvider>
          </ThemeProvider>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </Provider>
      </QueryClientProvider>
    </ContextProvider>
  </BrowserRouter>
);
