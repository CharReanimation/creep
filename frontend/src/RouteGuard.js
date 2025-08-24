import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./main/components/context/AuthContext";

// Route Guard
const RouteGuard = ({ children, requireAuth = true }) => {
  const { isAuthenticated } = useContext(AuthContext);

  // Login Required
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />; // Navigate to login page
  }
  
  // Has Logged in
  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/home" replace />; // Navigate to home page
  }

  // Return
  return children;
};

// Export
export default RouteGuard;
