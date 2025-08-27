import { useState, useEffect } from "react"; // React
import { jwtDecode } from "jwt-decode"; // JWT

// Use Token Check
export const useTokenCheck = () => {
  // State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Hook
  useEffect(() => {
    // Check Token
    const checkToken = async () => {
      const token = localStorage.getItem("token"); // Restore from local storage
      if (!token) return;
      if (token) {
        try {
          // Token
          const decoded = jwtDecode(token);

          // Check if token is expired
          if (decoded.exp * 1000 > Date.now()) {
            setIsAuthenticated(true);
            setUser({ token, ...decoded });
          } else {
            // Remove token from local storage if expired
            localStorage.removeItem("token");
            setIsAuthenticated(false);
            setUser(null);
          }
        }
        // Error
        catch (err) 
        {
          console.error("Invalid token:", err);
          localStorage.removeItem("token");
          setIsAuthenticated(false);
          setUser(null);
        }
      }
    };
    checkToken();
  }, []);

  // Return
  return { isAuthenticated, user, setIsAuthenticated, setUser };
};
