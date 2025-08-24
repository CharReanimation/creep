import React from "react"; // React
import { Link } from "react-router-dom";

// CSS
import "./css/NavBar.css";

// Nav
const NavBar = () => {
  const Nav = (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <img
          src="./img/webPageLogo.png"
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
          <Link to="/ecomSearch" className="navbar-link">
            ECOM SEARCH
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="navbar-link">
            JOBS
          </Link>
        </li>
        <li>
          <Link to="/register" className="navbar-link">
            REGISTER
          </Link>
        </li>
        <li>
          <Link to="/login" className="navbar-link">
            LOGIN
          </Link>
        </li>
      </ul>
    </nav>
  );

  // Return
  return Nav;
};

// Export
export default NavBar;
