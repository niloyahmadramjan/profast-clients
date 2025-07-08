import { Navigate, useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";;
import AuthUser from "../Hook/AuthUser";
import LoadingAnimation from "../Pages/LoaderAnimation/LoadingAnimation";
import useAxiosSecure from "../Hook/UseAxiosSecure";

const RiderRoute = ({ children }) => {
  const { user, loading } = AuthUser();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  if (loading || isLoading) {
    return (
      <div className="text-center py-10">
        <LoadingAnimation />
      </div>
    );
  }

  if (isError || userData?.role !== "rider") {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return children;
};

export default RiderRoute;
