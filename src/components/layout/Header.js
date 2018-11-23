import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Header = props => {
  const { branding } = props;

  function collapseNavOnRedirect() {
    const headerNavLinks = document.getElementById("headerNavLinks");
    if (headerNavLinks.classList.contains("show")) {
      headerNavLinks.classList.remove("show");
    }
  }
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-3 py-1">
      <div className="container">
        <Link to="/" className="navbar-brand" onClick={collapseNavOnRedirect}>
          {branding}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#headerNavLinks"
          aria-controls="headerNavLinks"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse"
          id="headerNavLinks"
          onClick={collapseNavOnRedirect}
        >
          <ul className="navbar-nav text-right ml-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <i className="fas fa-home fa-fw" aria-hidden="true" />
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact/add" className="nav-link">
                <i className="fas fa-plus fa-fw" aria-hidden="true" />
                Add Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                <i className="fas fa-question fa-fw" aria-hidden="true" />
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

Header.defaultProps = {
  branding: "My App"
};

Header.propTypes = {
  branding: PropTypes.string
};

export default Header;
