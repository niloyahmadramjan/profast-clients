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
        <NavLink to="/" className={({ isActive }) => (isActive ? "text-lime-500 font-semibold" : "")}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/services" className={({ isActive }) => (isActive ? "text-lime-500 font-semibold" : "")}>
          Services
        </NavLink>
      </li>
      <li>
        <NavLink to="/coverage" className={({ isActive }) => (isActive ? "text-lime-500 font-semibold" : "")}>
          Coverage
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className={({ isActive }) => (isActive ? "text-lime-500 font-semibold" : "")}>
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink to="/pricing" className={({ isActive }) => (isActive ? "text-lime-500 font-semibold" : "")}>
          Pricing
        </NavLink>
      </li>
      <li>
        <NavLink to="/be-a-rider" className={({ isActive }) => (isActive ? "text-lime-500 font-semibold" : "")}>
          Be a Rider
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md px-5 md:px-8">
      <div className="navbar-start">
        <ProFastLogo />
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-gray-700">{navManu}</ul>
      </div>

      {/* Right Buttons */}
      <div className="navbar-end gap-2">
        {loading ? (
          <span className="loading loading-dots loading-xl"></span>
        ) : (
          <>
            {user?.email ? (
              <>
                <span className="text-lime-500 px-4 hidden md:inline">
                  {user?.email}
                </span>
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="User avatar"
                        src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                      />
                    </div>
                  </div>
                  <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
                    <li>
                      <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                      <Link to="/settings">Settings</Link>
                    </li>
                    <li>
                      <Link to="/logout">Logout</Link>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline btn-sm rounded-md hidden md:flex">
                  Sign In
                </Link>
                <Link to="/be-a-rider" className="btn btn-success btn-sm rounded-md hidden md:flex">
                  Be a rider
                </Link>
                <button className="btn btn-circle btn-sm bg-black text-white hidden md:flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    fill="none"
                  >
                    <path
                      d="M5 12h14M12 5l7 7-7 7"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </>
            )}
          </>
        )}

        {/* Mobile Hamburger Menu */}
        <div className="dropdown dropdown-end md:hidden">
          <button tabIndex={0} className="btn btn-circle btn-ghost">
            <BiMenu className="w-5 h-5" />
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
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
