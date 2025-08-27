import React from "react"; // React
import { useLocation } from "react-router-dom";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

// Base Route
import { USER, ADMIN } from "./Base_Route"; // Base Route

// Components
import NavBar from "./main/components/Nav/NavBar"; // NavBar
import Header from "./main/components/Header/Header"; // Header
import Footer from "./main/components/Footer/Footer"; // Footer
import Error from "./main/components/Error/Error"; // Error
import { AuthProvider } from "./main/components/context/AuthContext";
import RouteGuard from "./RouteGuard";
import HealthStatus from "./connection/HealthStatus";

// Pages
import Home from "./main/pages/Home/Home";
import About from "./main/pages/About/About";

// User
import Login from "./main/pages/User/Login"; // Login
import Register from "./main/pages/User/Register"; // Register
import Profile from "./main/pages/User/Profile"; // Profile
import Dashboard from "./main/pages/User/Dashboard"; // Dashboard
import Dashboard_Edit from "./main/pages/User/Dashboard_Edit"; // Dashboard Edit

// Admin

// Search
import Search from "./main/pages/Search/Search";
import EcomSearch from "./main/pages/Search/EcomSearch";

// Jobs
import JobList from "./main/pages/Job/JobList";

// CSS
import "./main/global/css/global_anim.css";

// RouteLayout
const RouteLayout = () => {
  // Location
  const location = useLocation();

  // Map pathnames to header text
  const headerTitles = {
    "/": "ERROR",
    "/home": "HOME",
    "/about": "ABOUT",
    "/search": "SEARCH",
    "/ecomSearch": "ECOM SEARCH",
    "/jobs": "JOB LIST",
    "/login": "LOGIN",
    "/register": "REGISTER",
    "/user/dashboard": "DASHBOARD",
    "/user/dashboard/edit": "NONE",
  };

  const headerText = headerTitles[location.pathname] || "DEFAULT";

  // Return
  return (
    <div>
      {/* Header */}
      <div className="App-Header">
        {(headerText !== "ERROR") && (headerText !== "NONE") && (<Header HeaderText={headerText} />)}
      </div>

      {/* Routes */}
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/ecomSearch" element={<EcomSearch />} />
        <Route path="/jobs" element={<JobList />} />

        {/* Registration */}
        <Route
          path="/login"
          element={
            <RouteGuard requireAuth={false}>
              <Login />
            </RouteGuard>
          }
        />
        <Route
          path="/register"
          element={
            <RouteGuard requireAuth={false}>
              <Register />
            </RouteGuard>
          }
        />

        {/* Login Required */}

        {/* Dashboard */}
        <Route
          path={`${USER}/dashboard`}
          element={
            <RouteGuard requireAuth={true}>
              <Dashboard />
            </RouteGuard>
          }
        />
        <Route
          path={`${USER}/dashboard/edit`}
          element={
            <RouteGuard requireAuth={true}>
              <Dashboard_Edit />
            </RouteGuard>
          }
        />
      </Routes>

      {/* Server Connection */}
      <HealthStatus />

      {/* Footer */}
      <Footer />
    </div>
  );
};

const App = () => {
  // Return
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          {/* Nav */}
          <NavBar />

          {/* Routes */}
          <RouteLayout />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

// Export
export default App;
