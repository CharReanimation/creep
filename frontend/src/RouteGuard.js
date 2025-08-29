import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./main/components/context/AuthContext";

// Route Guard
const RouteGuard = ({
  children,
  requireAuth = false,
  requireRole = null,
  publicOnly = false,
}) => {
  // Auth Context
  const { isAuthenticated, user, loading } = useContext(AuthContext);

  // Loading
  if (loading) {
    return <div>正在加载...</div>;
  }

  // Login Required: cannot access dashboard
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Role Required
  if (requireRole && (!user?.roles || !user.roles.includes(requireRole))) {
    return <Navigate to="/403" replace />;
  }

  // Has Logged in: cannot login, register
  if (publicOnly && isAuthenticated) {
    return <Navigate to="/user/dashboard" replace />;
  }

  // Return
  return children;
};

// Export
export default RouteGuard;
