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
import AddParcel from "../Pages/AddParcel";
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from "../Layout/Dashboard";
import DashboardHome from "../Pages/UserDashBoard/DashboardHome";
import MyParcels from "../Pages/UserDashBoard/MyParcels";
import MyProfile from "../Pages/UserDashBoard/MyProfile";
import Payment from "../Pages/UserDashBoard/Payment/payment";

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
        loader: () => fetch("/districts.json"),
        hydrateFallbackElement: <LoadingAnimation></LoadingAnimation>,
        Component: Coverage,
      },
      {
        path: "/addparcel",
        element: (
          <PrivateRoutes>
            <AddParcel></AddParcel>
          </PrivateRoutes>
        ),
        loader: () => fetch("/districts.json"),
        hydrateFallbackElement: <LoadingAnimation></LoadingAnimation>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <Dashboard />
      </PrivateRoutes>
    ),
    children: [
      { path: "/dashboard/home", element: <DashboardHome /> },
      { path: "/dashboard/myparcels", element: <MyParcels /> },
      { path: "/dashboard/profile", element: <MyProfile /> },
      {
        path: "/dashboard/payment/:parcelId",
        Component: Payment,
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
