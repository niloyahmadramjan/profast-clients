import React from "react";
import { BiMenu } from "react-icons/bi";
import { Link, NavLink } from "react-router";
import ProFastLogo from "../Pages/ProFastLogo";
import AuthUser from "../Hook/AuthUser";

const Navbar = () => {
  const { user, loading } = AuthUser();

  const navManu = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `transition-colors duration-200 font-medium ${
              isActive ? "text-lime-500" : "text-gray-600 hover:text-lime-600"
            }`
          }
        >
          Home
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink
              to="/addparcel"
              className={({ isActive }) =>
                `transition-colors duration-200 font-medium ${
                  isActive
                    ? "text-lime-500"
                    : "text-gray-600 hover:text-lime-600"
                }`
              }
            >
              Add Parcel
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `transition-colors duration-200 font-medium ${
                  isActive
                    ? "text-lime-500"
                    : "text-gray-600 hover:text-lime-600"
                }`
              }
            >
              Dashboard
            </NavLink>
          </li>
        </>
      )}

      <li>
        <NavLink
          to="/coverage"
          className={({ isActive }) =>
            `transition-colors duration-200 font-medium ${
              isActive ? "text-lime-500" : "text-gray-600 hover:text-lime-600"
            }`
          }
        >
          Coverage
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `transition-colors duration-200 font-medium ${
              isActive ? "text-lime-500" : "text-gray-600 hover:text-lime-600"
            }`
          }
        >
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/pricing"
          className={({ isActive }) =>
            `transition-colors duration-200 font-medium ${
              isActive ? "text-lime-500" : "text-gray-600 hover:text-lime-600"
            }`
          }
        >
          Pricing
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/be-a-rider"
          className={({ isActive }) =>
            `transition-colors duration-200 font-medium ${
              isActive ? "text-lime-500" : "text-gray-600 hover:text-lime-600"
            }`
          }
        >
          Be a Rider
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-white shadow-sm px-5 md:px-8 z-50 sticky top-0">
      {/* Logo */}
      <div className="navbar-start">
        <ProFastLogo />
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">{navManu}</ul>
      </div>

      {/* Right Side */}
      <div className="navbar-end gap-2">
        {loading ? (
          <span className="loading loading-dots loading-sm"></span>
        ) : user?.email ? (
          <>
            {/* Display name (optional) */}
            <span className="text-sm text-lime-500 font-medium hidden md:inline">
              {user?.displayName || user?.email}
            </span>

            {/* Profile dropdown */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-9 h-9 rounded-full border border-gray-200 overflow-hidden">
                  <img
                    src={
                      user?.photoURL ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                    alt="User Profile"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52"
              >
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/settings">Settings</Link>
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/logout">Logout</Link>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="btn btn-outline btn-sm rounded-md hidden md:flex"
            >
              Sign In
            </Link>
            <Link
              to="/be-a-rider"
              className="btn btn-success btn-sm rounded-md hidden md:flex"
            >
              Be a Rider
            </Link>
          </>
        )}

        {/* Mobile Hamburger Menu */}
        <div className="dropdown dropdown-end lg:hidden">
          <label tabIndex={0} className="btn btn-circle btn-ghost">
            <BiMenu className="w-5 h-5" />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow bg-white rounded-box w-56"
          >
            {navManu}
            {!loading && user?.email && (
              <>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/logout">Logout</Link>
                </li>
              </>
            )}
            {!user?.email && !loading && (
              <li>
                <Link to="/login">Sign In</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
