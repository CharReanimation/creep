import React, { createContext, useState, useEffect } from "react";

// Auth
const AuthContext = createContext();

// Auth Provider
const AuthProvider = ({ children }) => {
  // State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Restore from local storage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      setUser({ token });
    }
  }, []);

  // Login
  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    setUser({ token });
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Export
export { AuthContext, AuthProvider };
