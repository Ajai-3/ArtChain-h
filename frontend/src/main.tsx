import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import { QueryProvider } from "./api/providers/QueryClient.tsx";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { SplashScreen } from "./components/SplashScreen.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ErrorBoundary>
      <QueryProvider>
        <Provider store={store}>
          <PersistGate loading={<SplashScreen />} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </QueryProvider>
    </ErrorBoundary>
  </BrowserRouter>
);
