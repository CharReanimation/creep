import React from "react"; // React
import { useLocation } from "react-router-dom";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

// Components
import NavBar from "./main/components/Nav/NavBar"; // NavBar
import Header from "./main/components/Header/Header"; // Header
import Footer from "./main/components/Footer/Footer"; // Footer
import Error from "./main/components/Error/Error"; // Error
import { AuthProvider } from "./main/components/context/AuthContext";
import RouteGuard from "./RouteGuard";

// Pages
import Home from "./main/pages/Home/Home";
import About from "./main/pages/About/About";

// User
import Login from "./main/pages/User/Login"; // Login
import Register from "./main/pages/User/Register"; // Register

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
  };

  const headerText = headerTitles[location.pathname] || "DEFAULT";

  // Return
  return (
    <div>
      {/* Header */}
      <div className="App-Header">
        {headerText !== "ERROR" && <Header HeaderText={headerText} />}
      </div>

      {/* Routes */}
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/ecomSearch" element={<EcomSearch />} />
        <Route
          path="/jobs"
          element={
            <RouteGuard requireAuth={true}>
              <JobList />
            </RouteGuard>
          }
        />
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
      </Routes>

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
