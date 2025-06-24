import React from "react";
import logo from "../assets/Logo.png";
import { Link } from "react-router";

const ProFastLogo = () => {
  return (
    <Link to='/'>
      <div className="flex items-center gap-2">
        <img src={logo} alt="Profast Logo" className="w-8" />
        <span className="text-xl font-bold -ml-4 mt-5">Profast</span>
      </div>
    </Link>
  );
};

export default ProFastLogo;
