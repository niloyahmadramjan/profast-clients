import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./Routes/Router";
import "aos/dist/aos.css";
import Aos from "aos";
import AuthProvider from "./AuthContex/AuthProvider";
Aos.init();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
    <div className="fontUrbanist bg-gray-100">
      <RouterProvider router={router} />
    </div>
    </AuthProvider>
  </StrictMode>
);
