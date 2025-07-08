import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import AuthUser from "../../Hook/AuthUser";
import Swal from "sweetalert2";
import LoadingAnimation from "../LoaderAnimation/LoadingAnimation";

const Logout = () => {
  const { signOutUser } = AuthUser();
  const navigate = useNavigate();

  useEffect(() => {
    signOutUser()
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Log out successful!",
          showConfirmButton: false,
          timer: 500,
        });
        // Redirect to homepage or login
        setTimeout(() => navigate("/"));
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
        // Optional: redirect anyway or stay on page
        setTimeout(() => navigate("/"));
      });
  }, [signOutUser, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen">
     <LoadingAnimation></LoadingAnimation>
    </div>
  );
};

export default Logout;
