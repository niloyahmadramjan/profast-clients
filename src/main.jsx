import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./Routes/Router";
import "aos/dist/aos.css";
import Aos from "aos";
import AuthProvider from "./AuthContex/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
Aos.init();

//  Create a QueryClient instance
const queryClient = new QueryClient();



createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Provide React Query to the app */}
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
          <div className="fontUrbanist bg-gray-100">
            <RouterProvider router={router} />
          </div>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
