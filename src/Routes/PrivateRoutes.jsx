import React from "react";
import AuthUser from "../Hook/AuthUser";
import LoadingAnimation from "../Pages/LoaderAnimation/LoadingAnimation";
import { Navigate, useLocation } from "react-router";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = AuthUser();
  const location = useLocation();

  if (loading) {
    return <LoadingAnimation></LoadingAnimation>;
  }
  if (!user) {
    return <Navigate state={location.pathname} to="/login"></Navigate>;
  }

  return children;
};

export default PrivateRoutes;
