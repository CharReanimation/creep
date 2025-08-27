export const HandleLogout = (setIsAuthenticated, setUser) => {
  // Logout
  localStorage.removeItem("token");
  setIsAuthenticated(false);
  setUser(null);
};
