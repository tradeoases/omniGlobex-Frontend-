import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import "./index.css";
import "./styles/custom.module.css";
import { ThemeProvider } from "./components/theme-provider.tsx";
import AppLayout from "./components/app-layout.tsx";
import RoutesConfig from "./route.tsx";
import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <BrowserRouter>
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <AppLayout>
              <RoutesConfig />
            </AppLayout>
          </ThemeProvider>
        </BrowserRouter>
      </RecoilRoot>
    </QueryClientProvider>
  </React.StrictMode>
);
