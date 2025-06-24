import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/AuthPages/Login";
import Register from "../Pages/AuthPages/Register";
import ForgerPassword from "../Pages/AuthPages/ForgetPassword";
import Logout from "../Pages/AuthPages/Logout";
import Coverage from "../Pages/coverageMap/Coverage";
import LoadingAnimation from "../Pages/LoadingAnimation";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/coverage",
        loader: ()=>fetch('/districts.json'),
        hydrateFallbackElement: <LoadingAnimation></LoadingAnimation>,
        Component: Coverage,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "/forgerPassword",
        Component: ForgerPassword,
      },
    ],
  },
  {
    path: "/logout",
    Component: Logout,
  },
]);
