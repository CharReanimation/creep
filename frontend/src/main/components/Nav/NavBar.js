import React, { useContext } from "react"; // React
import { Link } from "react-router-dom";

// Base Route
import { USER, ADMIN } from "../../../Base_Route"; // Base Route

// Components
import { AuthContext } from "../context/AuthContext";

// CSS
import "./css/NavBar.css";

// Nav
const NavBar = () => {
  // Auth
  const { isAuthenticated, logout } = useContext(AuthContext);

  // Nav
  const Nav = (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <img
          src="/img/webPageLogo.png"
          alt="Logo"
          className="navbar-logo-image"
        />{" "}
      </Link>
      <h1 className="navbar-title">CREEPING</h1>
      <ul className="navbar-links">
        <li>
          <Link to="/home" className="navbar-link">
            HOME
          </Link>
        </li>
        <li>
          <Link to="/about" className="navbar-link">
            ABOUT
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="navbar-link">
            JOBS
          </Link>
        </li>
        {isAuthenticated ? (
          <>
            {/* Authenticated */}
            {/* Dashboard */}
            <li>
              <Link to={`${USER}/dashboard`} className="navbar-link">
                DASHBOARD
              </Link>
            </li>

            {/*  */}

            {/* Logout */}
            <li>
              <button className="navbar-link logout-btn" onClick={logout}>
                LOGOUT
              </button>
            </li>
          </>
        ) : (
          <>
            {/* Not Authenticated */}
            <li>
              <Link to="/login" className="navbar-link">
                LOGIN
              </Link>
            </li>
            <li>
              <Link to="/register" className="navbar-link">
                REGISTER
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );

  // Return
  return Nav;
};

// Export
export default NavBar;
