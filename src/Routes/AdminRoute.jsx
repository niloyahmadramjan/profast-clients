import { Navigate, useLocation } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingAnimation from "../Pages/LoaderAnimation/LoadingAnimation";
import AuthUser from "../Hook/AuthUser";
import useAxiosSecure from "../Hook/UseAxiosSecure";

const AdminRoute = ({ children }) => {
  const { user, loading } = AuthUser();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Query to get user role
  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !!user?.email, // Run only if user email exists
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  // If auth loading or query loading
  if (loading || isLoading) {
    return (
      <p className="text-center py-8">
        <LoadingAnimation />
      </p>
    );
  }

  // If API failed
  if (isError) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  // Invalidate cache when needed (optional)
  queryClient.invalidateQueries(['user-role'])

  // Allow only if role === 'admin'
  if (userData?.role === "admin") {
    return children;
  }

  return <Navigate to="/unauthorized" state={{ from: location }} replace />;
};

export default AdminRoute;
