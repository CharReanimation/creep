import React, { createContext, useState, useEffect } from "react"; // React

// Hooks
import { useTokenCheck } from "./hooks/Hooks_Token_Check";

// Handlers
import { HandleLogin } from "./handlers/HandleLogin";
import { HandleLogout } from "./handlers/HandleLogout";

// Auth
const AuthContext = createContext();

// Auth Provider
const AuthProvider = ({ children }) => {
  // State
  const { isAuthenticated, user, loading, setIsAuthenticated, setUser } = useTokenCheck();

  // Login
  const login = (token) => HandleLogin(token, setIsAuthenticated, setUser);

  // Logout
  const logout = () => HandleLogout(setIsAuthenticated, setUser);

  // Return
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Export
export { AuthContext, AuthProvider };
