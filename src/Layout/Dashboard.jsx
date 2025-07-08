import React from "react";
import { Link, Outlet } from "react-router";
import {
  FaHome,
  FaClipboardList,
  FaUserCircle,
  FaUsers,
  FaUserCheck,
  FaUserClock,
  FaMoneyCheckAlt,
  FaBox,
  FaGlobe,
  FaSignOutAlt,
} from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import AuthUser from "../Hook/AuthUser";
import useAxiosSecure from "../Hook/UseAxiosSecure";

const Dashboard = () => {
  const { user } = AuthUser();
  const axiosSecure = useAxiosSecure();

  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !!user?.email, // query runs only if email exists
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <span className="loading loading-spinner text-error"></span>;
  }

  if (isError) {
    return <p className="text-center text-red-500">Failed to fetch role.</p>;
  }

  const role = userData?.role;

  return (
    <div className="min-h-screen w-full flex">
      {/* ✅ Fixed Vertical Sidebar for Desktop */}
      <div className="hidden lg:flex flex-col w-64 fixed top-0 left-0 h-full inset-0 bg-opacity-40 backdrop-blur-sm bg-base-200 shadow-md p-4 z-30">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <Link to="home" className="btn btn-ghost justify-start">
          <FaHome className="mr-2" /> Dashboard Home
        </Link>

        <Link to="myparcels" className="btn btn-ghost justify-start">
          <FaBox className="mr-2" /> My Parcels
        </Link>

        <Link to="myApplication" className="btn btn-ghost justify-start">
          <FaUserCircle className="mr-2" /> My Application
        </Link>

        <Link to="paymentHistory" className="btn btn-ghost justify-start">
          <FaMoneyCheckAlt className="mr-2" /> Payment History
        </Link>

        {role === "admin" && (
          <>
            <Link to="adminManagement" className="btn btn-ghost justify-start">
              <FaClipboardList className="mr-2" /> Admin Management
            </Link>

            <Link
              to="paidUnassignedParcels"
              className="btn btn-ghost justify-start"
            >
              <FaBox className="mr-2" /> Assigned Parcel
            </Link>

            <Link to="allRider" className="btn btn-ghost justify-start">
              <FaUsers className="mr-2" /> All Riders
            </Link>

            <Link to="activeRider" className="btn btn-ghost justify-start">
              <FaUserCheck className="mr-2" /> Active Riders
            </Link>

            <Link to="pendingRider" className="btn btn-ghost justify-start">
              <FaUserClock className="mr-2" /> Pending Riders
            </Link>
          </>
        )}

        {role === "rider" && (
          <>
            <Link to="rider-pickup" className="btn btn-ghost justify-start">
              <FaClipboardList className="mr-2" /> Rider Task
            </Link>
            <Link to="rider-earning" className="btn btn-ghost justify-start">
              <FaClipboardList className="mr-2" />
              My Earning
            </Link>
            <Link to="total-earning" className="btn btn-ghost justify-start">
              <FaClipboardList className="mr-2" />
              My Total Earning
            </Link>
          </>
        )}

        <Link to="/" className="btn btn-ghost justify-start">
          <FaGlobe className="mr-2" /> Profast Home
        </Link>

        <Link to="/logOut" className="btn btn-ghost justify-start">
          <FaSignOutAlt className="mr-2" /> Log Out
        </Link>
      </div>

      {/* ✅ Main Content Area */}
      <div className="flex-1 lg:ml-64 w-full">
        {/* ✅ Top Navbar for Mobile Only */}
        <div className="navbar inset-0 bg-opacity-40 backdrop-blur-sm shadow-sm px-4 flex justify-between lg:hidden sticky top-0 z-40">
          <label htmlFor="mobile-drawer" className="btn btn-ghost btn-circle">
            <FaBars className="text-xl" />
          </label>
          <div className="flex items-center gap-2">
            <img
              className="w-8 h-8 rounded-full object-cover"
              src={
                user?.photoURL ||
                "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              }
              alt="User"
            />
            <span className="text-sm font-medium">
              {user?.displayName || "User"}
            </span>
          </div>
        </div>

        {/* ✅ Main Page Content */}
        <div className="p-4 min-h-[calc(100vh-64px)] overflow-auto">
          <Outlet />
        </div>

        {/* ✅ Mobile Drawer Navigation */}
        <div className="h-screen drawer drawer-start lg:hidden z-50 ">
          <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-side">
            <label htmlFor="mobile-drawer" className="drawer-overlay"></label>
            <ul className="menu p-2 w-52 max-w-xs h-screen text-black font-bold backdrop-blur-sm z-50">
              <li>
                <Link
                  to="home"
                  onClick={() =>
                    (document.getElementById("mobile-drawer").checked = false)
                  }
                >
                  <FaHome className="mr-2" /> Dashboard Home
                </Link>
              </li>

              <li>
                <Link
                  to="myparcels"
                  onClick={() =>
                    (document.getElementById("mobile-drawer").checked = false)
                  }
                >
                  <FaBox className="mr-2" /> My Parcels
                </Link>
              </li>

              <li>
                <Link
                  to="myApplication"
                  onClick={() =>
                    (document.getElementById("mobile-drawer").checked = false)
                  }
                >
                  <FaUserCircle className="mr-2" /> My Application
                </Link>
              </li>

              <li>
                <Link
                  to="paymentHistory"
                  onClick={() =>
                    (document.getElementById("mobile-drawer").checked = false)
                  }
                >
                  <FaMoneyCheckAlt className="mr-2" /> Payment History
                </Link>
              </li>

              {role === "admin" && (
                <>
                  <li>
                    <Link
                      to="adminManagement"
                      onClick={() =>
                        (document.getElementById(
                          "mobile-drawer"
                        ).checked = false)
                      }
                    >
                      <FaHome className="mr-2" /> Admin Management
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="paidUnassignedParcels"
                      onClick={() =>
                        (document.getElementById(
                          "mobile-drawer"
                        ).checked = false)
                      }
                    >
                      <FaClipboardList className="mr-2" /> Assigned Parcel
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="allRider"
                      onClick={() =>
                        (document.getElementById(
                          "mobile-drawer"
                        ).checked = false)
                      }
                    >
                      <FaUsers className="mr-2" /> All Rider
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="activeRider"
                      onClick={() =>
                        (document.getElementById(
                          "mobile-drawer"
                        ).checked = false)
                      }
                    >
                      <FaUserCheck className="mr-2" /> Active Rider
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="pendingRider"
                      onClick={() =>
                        (document.getElementById(
                          "mobile-drawer"
                        ).checked = false)
                      }
                    >
                      <FaUserClock className="mr-2" /> Pending Rider
                    </Link>
                  </li>
                </>
              )}

              {role === "rider" && (
                <li>
                  <Link
                    to="rider-pickup"
                    onClick={() =>
                      (document.getElementById("mobile-drawer").checked = false)
                    }
                  >
                    <FaClipboardList className="mr-2" /> Rider Task
                  </Link>
                </li>
              )}

              <li>
                <Link
                  to="/"
                  onClick={() =>
                    (document.getElementById("mobile-drawer").checked = false)
                  }
                >
                  <FaHome className="mr-2" /> Profast Home
                </Link>
              </li>
              <li>
                <Link
                  to="/logout"
                  onClick={() =>
                    (document.getElementById("mobile-drawer").checked = false)
                  }
                >
                  <FaUserCircle className="mr-2" /> Log Out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
