import React from "react";
import loginImg from "../assets/authImage.png"; 
import { Outlet } from "react-router";


const AuthLayout = () => {
  return (
    <div className="min-h-screen flex  flex-col md:flex-row gap-5">
        <Outlet></Outlet>
      {/* Right Side - Image */}
      <div className="md:w-1/2 w-full bg-lime-50 flex items-center justify-center p-6">
        <img
          src={loginImg}
          alt="Delivery"
          className="w-full max-w-md md:max-w-lg"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
