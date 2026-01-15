import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <Link to="/" className="header__logo">
            <span className="header__logo-icon">👻</span>
            <span className="header__logo-text">HauntHub</span>
          </Link>

          <nav className="header__nav">
            <Link
              to="/"
              className={`header__nav-link ${
                location.pathname === "/" ? "header__nav-link--active" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`header__nav-link ${
                location.pathname === "/about" ? "header__nav-link--active" : ""
              }`}
            >
              About
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
