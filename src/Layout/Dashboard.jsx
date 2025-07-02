import React from "react";
import { Link, Outlet } from "react-router";
import {
  FaHome,
  FaClipboardList,
  FaUserCircle,
  FaBars,
} from "react-icons/fa";
import AuthUser from "../Hook/AuthUser";

const Dashboard = () => {
  const { user } = AuthUser();

  return (
    <div className="min-h-screen flex">
      {/* ✅ Vertical Sidebar for Desktop */}
      <div className="hidden lg:flex flex-col w-64 bg-base-200 p-4 space-y-2">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <Link to="home" className="btn btn-ghost justify-start">
          <FaHome className="mr-2" /> Dashboard Home
        </Link>
        <Link to="myparcels" className="btn btn-ghost justify-start">
          <FaClipboardList className="mr-2" /> My Parcels
        </Link>
        <Link
          to="paymentHistory"
          className="btn btn-ghost justify-start"
        >
          <FaClipboardList className="mr-2" /> Payment History
        </Link>
        <Link to="profile" className="btn btn-ghost justify-start">
          <FaUserCircle className="mr-2" /> My Profile
        </Link>
        <Link to="/" className="btn btn-ghost justify-start">
          <FaHome className="mr-2" /> Profast Home
        </Link>
        <Link to="myApplication" className="btn btn-ghost justify-start">
          <FaHome className="mr-2" /> My Application
        </Link>
      </div>

      {/* ✅ Main content */}
      <div className="flex-1">
        {/* ✅ Top Navbar for Mobile */}
        <div className="navbar bg-base-100 shadow-sm px-4 flex justify-between lg:hidden">
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

        {/* ✅ Main page content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* ✅ Mobile Drawer (already working) */}
      <div className="drawer drawer-start lg:hidden z-50">
        <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label htmlFor="mobile-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-64 min-h-full bg-base-200 text-base-content">
            <li>
              <Link
                to="/dashboard/home"
                onClick={() =>
                  (document.getElementById("mobile-drawer").checked = false)
                }
              >
                <FaHome className="mr-2" /> Dashboard Home
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/myparcels"
                onClick={() =>
                  (document.getElementById("mobile-drawer").checked = false)
                }
              >
                <FaClipboardList className="mr-2" /> My Parcels
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/profile"
                onClick={() =>
                  (document.getElementById("mobile-drawer").checked = false)
                }
              >
                <FaUserCircle className="mr-2" /> My Profile
              </Link>
            </li>
            <li>
              <Link to="/">
                <FaHome className="mr-2" /> Profast Home
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
