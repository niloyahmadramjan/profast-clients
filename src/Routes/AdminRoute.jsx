import { Navigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import useAxiosSecure from "../Hook/UseAxiosSecure";
import AuthUser from "../Hook/AuthUser";

const AdminRoute = ({ children }) => {
  const { user, loading } = AuthUser();
  const location = useLocation();
  const [role, setRole] = useState(null);
  const [checking, setChecking] = useState(true); // extra loader check
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/${user.email}`).then((res) => {
        setRole(res.data.role);
        setChecking(false);
      }).catch(() => {
        setChecking(false);
      });
    } else {
      setChecking(false);
    }
  }, [user?.email, axiosSecure]);

  if (loading || checking) return <p className="text-center py-8">Loading...</p>;

  if (role === "admin") return children;

  return <Navigate to="/unauthorized" state={{ from: location }} replace />;
};

export default AdminRoute;
