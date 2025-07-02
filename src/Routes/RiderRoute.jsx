import { useLocation } from "react-router";
import AuthUser from "../Hook/AuthUser";

const RiderRoute = ({ children }) => {
  const { user, loading, userRole } = AuthUser();
  const location = useLocation();

  if (loading) return <p>Loading...</p>;

  if (user && userRole === "rider") return children;

  return <Navigate to="/unauthorized" state={{ from: location }} replace />;
};
export default RiderRoute;
