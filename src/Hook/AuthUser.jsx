import React, { use } from "react";
import { AuthContext } from "../AuthContex/AuthContext";

const AuthUser = () => {
  const userAuth = use(AuthContext);
  return userAuth;
};

export default AuthUser;
