import React from "react";
import { Link, Outlet } from "react-router";
import { FaHome, FaClipboardList, FaUserCircle, FaBars } from "react-icons/fa";
import AuthUser from "../Hook/AuthUser";

const Dashboard = () => {
  const { user } = AuthUser();

  return (
    <div className="min-h-screen">
      {/* ========== Navbar (Always at Top) ========== */}
      <div className="navbar bg-base-100 shadow-sm px-4 flex justify-between lg:justify-start">
        {/* 👇 Mobile menu button (only on small screens) */}
        <div className="lg:hidden">
          <label htmlFor="mobile-drawer" className="btn btn-ghost btn-circle">
            <FaBars className="text-xl" />
          </label>
        </div>

        {/* ✅ Horizontal Navbar Links (only on large screens) */}
        <div className="hidden lg:flex lg:gap-6 lg:ml-4 text-base font-medium">
          <Link to="/dashboard/home" className="btn btn-ghost">
            <FaHome className="mr-2" /> Dashboard Home
          </Link>
          <Link to="/dashboard/myparcels" className="btn btn-ghost">
            <FaClipboardList className="mr-2" /> My Parcels
          </Link>
          <Link to="/dashboard/profile" className="btn btn-ghost">
            <FaUserCircle className="mr-2" /> My Profile
          </Link>
          <Link to="/" className="btn btn-ghost">
            <FaHome className="mr-2" /> Profast Home
          </Link>
        </div>

        {/* 👤 Profile (right side) */}
        <div className="ml-auto flex items-center gap-2">
          <img
            src={
              user?.photoURL ||
              "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            }
            alt="User Profile"
          />
          <span className="text-sm">{user?.displayName || "User"}</span>
        </div>
      </div>

      {/* ========== Outlet/Page Content ========== */}
      <div className="p-4">
        <Outlet />
      </div>

      {/* ========== Drawer for Mobile (vertical nav) ========== */}
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
