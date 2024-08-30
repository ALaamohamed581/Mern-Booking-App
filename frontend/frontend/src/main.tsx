import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppContextProvider } from "./context/AppContext.tsx";
import { SearchContextProvider } from "./context/searchContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider
        childern={
          <SearchContextProvider Children={<App />}></SearchContextProvider>
        }
      ></AppContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
