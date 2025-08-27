export const HandleLogin = (token, setIsAuthenticated, setUser) => {
  // Login
  localStorage.setItem("token", token);
  setIsAuthenticated(true);
  setUser({ token });
};
