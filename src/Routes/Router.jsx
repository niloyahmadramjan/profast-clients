import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/AuthPages/Login";
import Register from "../Pages/AuthPages/Register";
import ForgerPassword from "../Pages/AuthPages/ForgetPassword";
import Logout from "../Pages/AuthPages/Logout";
import Coverage from "../Pages/coverageMap/Coverage";
import LoadingAnimation from "../Pages/LoaderAnimation/LoadingAnimation";
import AddParcel from "../Pages/AddParcel";

// Route guards
import PrivateRoutes from "./PrivateRoutes"; // for all logged in users
import AdminRoute from "./AdminRoute"; // for admin
import RiderRoute from "./RiderRoute"; // for riders

// Dashboard layouts and pages
import Dashboard from "../Layout/Dashboard";
import DashboardHome from "../Pages/UserDashBoard/DashboardHome";
import MyParcels from "../Pages/UserDashBoard/MyParcels";
import MyProfile from "../Pages/UserDashBoard/MyProfile";
import Payment from "../Pages/UserDashBoard/Payment/payment";
import PaymentHistory from "../Pages/UserDashBoard/PaymentHistory";
import RiderApplicationForm from "../Pages/RiderApplicationForm";
import MyApplication from "../Pages/UserDashBoard/Admin/MyApplication";
import AllRiders from "../Pages/UserDashBoard/Admin/AllRider";
import ActiveRiders from "../Pages/UserDashBoard/Admin/ActiveRiders";
import PendingRider from "../Pages/UserDashBoard/Admin/PendingRider";
import AdminManagement from "../Pages/UserDashBoard/Admin/AdminManagement ";
import Unauthorized from "../Pages/Unauthorized";
import PaidUnassignedParcels from "../Pages/UserDashBoard/Admin/PaidUnassignedParcels";
import RiderPickup from "../Pages/UserDashBoard/Rider/RiderPickup";
import RiderEarning from "../Pages/UserDashBoard/Rider/RiderEarning";
import TotalEarning from "../Pages/UserDashBoard/Rider/TotalEarning";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home, // 🌐 Public Route
      },
      {
        path: "/coverage",
        loader: () => fetch("/districts.json"),
        hydrateFallbackElement: <LoadingAnimation />, // 🌐 Public Route
        Component: Coverage,
      },
      {
        path: "/addparcel",
        element: (
          <PrivateRoutes>
            {" "}
            {/* ✅ Logged in user route */}
            <AddParcel />
          </PrivateRoutes>
        ),
        loader: () => fetch("/districts.json"),
        hydrateFallbackElement: <LoadingAnimation />,
      },
      {
        path: "/riderApplicationForm",
        element: (
          <PrivateRoutes>
            {" "}
            {/* ✅ Any logged-in user can apply */}
            <RiderApplicationForm />
          </PrivateRoutes>
        ),
        loader: () => fetch("/districts.json"),
        hydrateFallbackElement: <LoadingAnimation />,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login, // 🌐 Public
      },
      {
        path: "register",
        Component: Register, // 🌐 Public
      },
      {
        path: "/forgerPassword",
        Component: ForgerPassword, // 🌐 Public
      },
    ],
  },
  {
    path: "/logout",
    Component: Logout, // ✅ Private route (user must be logged in)
  },
  {
    path: "/unauthorized",
    Component: Unauthorized,
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        {" "}
        {/* ✅ Only logged-in users can access dashboard */}
        <Dashboard />
      </PrivateRoutes>
    ),
    children: [
      { path: "home", element: <DashboardHome /> }, // ✅ All logged-in users
      {
        path: "myparcels",
        element: (
          <PrivateRoutes>
            <MyParcels />
          </PrivateRoutes>
        ),
      },
      {
        path: "myApplication",
        element: (
          <PrivateRoutes>
            <MyApplication />
          </PrivateRoutes>
        ),
      },
      {
        path: "payment/:parcelId",
        element: (
          <PrivateRoutes>
            <Payment />
          </PrivateRoutes>
        ),
      },
      {
        path: "paymentHistory",
        element: (
          <PrivateRoutes>
            <PaymentHistory />
          </PrivateRoutes>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoutes>
            <MyProfile />
          </PrivateRoutes>
        ),
      },

      // ✅ Admin-only routes
      {
        path: "allRider",
        element: (
          <AdminRoute>
            <AllRiders />
          </AdminRoute>
        ),
      },
      {
        path: "activeRider",
        element: (
          <AdminRoute>
            <ActiveRiders />
          </AdminRoute>
        ),
      },
      {
        path: "pendingRider",
        element: (
          <AdminRoute>
            <PendingRider />
          </AdminRoute>
        ),
      },
      {
        path: "adminManagement",
        element: (
          <AdminRoute>
            <AdminManagement />
          </AdminRoute>
        ),
      },
      {
        path: "paidUnassignedParcels",
        element: (
          <AdminRoute>
            <PaidUnassignedParcels />
          </AdminRoute>
        ),
      },

      // 🔐  rider-only routes 
      // Example:
      { path: "rider-pickup", element: <RiderRoute><RiderPickup></RiderPickup></RiderRoute> },
      { path: "rider-earning", element: <RiderRoute><RiderEarning></RiderEarning></RiderRoute> },
      { path: "total-earning", element: <RiderRoute><TotalEarning></TotalEarning></RiderRoute> },
    ],
  },
]);
