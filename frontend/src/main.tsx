import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { HelmetProvider } from "react-helmet-async";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryProvider } from "./api/providers/QueryClient.tsx";
import App from "./App.tsx";
import { store, persistor } from "./redux/store.ts";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ErrorBoundary>
      <QueryProvider>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <ThemeProvider>
              <HelmetProvider>
                <App />
                {import.meta.env.DEV && (
                  <ReactQueryDevtools
                    initialIsOpen={false}
                  />
                )}
              </HelmetProvider>
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </QueryProvider>
    </ErrorBoundary>
  </BrowserRouter>
);
