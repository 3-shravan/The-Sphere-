import "./global.css";
import App from "./App.jsx";
import store from "./store/store.js";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ContextProvider, ThemeProvider, MenuProvider } from "@context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider>
          <ContextProvider>
            <MenuProvider>
              <App />
            </MenuProvider>
          </ContextProvider>
        </ThemeProvider>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </Provider>
    </QueryClientProvider>
  </BrowserRouter>
);
