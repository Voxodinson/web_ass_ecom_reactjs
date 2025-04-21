import { NavLink, useLocation } from "react-router-dom";
import "../../src/index.css";
import { useState } from "react";

const Narbar = () => {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <header className="header_section">
        <div className="container">
          <nav className="navbar navbar-expand-lg custom_nav-container">
            <NavLink className="navbar-brand" to="/">
              <img width={250} src="images/logo.png" alt="Logo" />
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded={!isDropdownOpen ? "false" : "true"}
              aria-label="Toggle navigation"
              onClick={toggleDropdown}
            >
              <span></span>
            </button>
            <div className={`collapse navbar-collapse ${isDropdownOpen ? "show" : ""}`} id="navbarSupportedContent">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink
                    to="/"
                    className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Home
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    to="/product"
                    className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Products
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    to="/Blog"
                    className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Blog
                  </NavLink>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className={`nav-link dropdown-toggle ${
                      location.pathname === "/About" || location.pathname === "/testimonial" || location.pathname === "/feedback" || location.pathname === "/Contact" ? "active" : ""
                    }`}
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded={isDropdownOpen ? "true" : "false"}
                    onClick={toggleDropdown}
                  >
                    <span className="nav-label">
                      More about us <span className="caret" />
                    </span>
                  </a>
                  <ul className={`dropdown-menu w-fit ${isDropdownOpen ? "show" : ""}`}>
                    <li>
                      <NavLink
                        to="/About"
                        className={({ isActive }) => `dropdown-item${isActive ? " active" : ""}`}
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        About
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/testimonial"
                        className={({ isActive }) => `dropdown-item${isActive ? " active" : ""}`}
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Testimonial
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/feedback"
                        className={({ isActive }) => `dropdown-item${isActive ? " active" : ""}`}
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Feedback
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/Contact"
                        className={({ isActive }) => `dropdown-item${isActive ? " active" : ""}`}
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Contact Us
                      </NavLink>
                    </li>
                  </ul>
                </li>

                <li className="nav-item">
                  <NavLink
                    to="/CheckOut"
                    className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    🛒
                  </NavLink>
                </li>

                <form className="form-inline">
                  <button className="btn my-2 my-sm-0 nav_search-btn" type="submit">
                    <i className="fa fa-search" aria-hidden="true" />
                  </button>
                </form>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Narbar;