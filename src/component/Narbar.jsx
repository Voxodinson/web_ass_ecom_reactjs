import { NavLink, useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../../src/index.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import * as bootstrap from "bootstrap";

const Narbar = () => {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim() !== "") {
        axios
          .get(`http://127.0.0.1:8000/api/public/user/products?search=${searchTerm}`)
          .then((res) => setResults(res.data.data))
          .catch((err) => console.error("Search failed:", err));
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

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
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className={`collapse navbar-collapse ${isDropdownOpen ? "show" : ""}`} id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
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
                    className={`nav-link dropdown-toggle ${location.pathname === "/About" || location.pathname === "/testimonial" || location.pathname === "/feedback" || location.pathname === "/Contact" ? "active" : ""}`}
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded={isDropdownOpen ? "true" : "false"}
                    onClick={toggleDropdown}
                  >
                    More about us
                  </a>
                  <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
                    <li>
                      <NavLink to="/About" className={({ isActive }) => `dropdown-item${isActive ? " active" : ""}`} onClick={() => setIsDropdownOpen(false)}>
                        About
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/testimonial" className={({ isActive }) => `dropdown-item${isActive ? " active" : ""}`} onClick={() => setIsDropdownOpen(false)}>
                        Testimonial
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/feedback" className={({ isActive }) => `dropdown-item${isActive ? " active" : ""}`} onClick={() => setIsDropdownOpen(false)}>
                        Feedback
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/Contact" className={({ isActive }) => `dropdown-item${isActive ? " active" : ""}`} onClick={() => setIsDropdownOpen(false)}>
                        Contact Us
                      </NavLink>
                    </li>
                  </ul>
                </li>

                <li className="nav-item">
                  <NavLink to="/CheckOut" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`} onClick={() => setIsDropdownOpen(false)}>
                    🛒
                  </NavLink>
                </li>

                <li className="nav-item">
                  <button
                    className="btn my-2 my-sm-0 nav_search-btn"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#searchModal"
                  >
                    <i className="fa fa-search" aria-hidden="true" />
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>

      <div
        className="modal fade"
        id="searchModal"
        tabIndex="-1"
        aria-labelledby="searchModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="searchModalLabel">
                Search Products
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <ul className="list-group">
                {results.map((product) => (
                  <li
                    key={product.id}
                    className="list-group-item  d-flex align-items-center"
                  >
                    <Link
                      to={`/product/${product.id}`}
                      className="d-flex align-items-center border-bottom pb-2 text-decoration-none text-dark w-100"
                      onClick={() => {
                        const modalEls = document.querySelectorAll('.modal.show');
                        modalEls.forEach((el) => {
                          const modal = bootstrap.Modal.getInstance(el) || new bootstrap.Modal(el);
                          modal.hide();
                        });
                      
                        const backdrops = document.querySelectorAll('.modal-backdrop');
                        backdrops.forEach((bd) => bd.parentNode.removeChild(bd));
        
                        document.body.classList.remove('modal-open');
                        document.body.style.overflow = '';
                        document.body.style.paddingRight = '';
                      
                        // Optionally clear search
                        setSearchTerm('');
                        setResults([]);
                      }}
                    >
                      <img
                        src={product.images?.[0] || "https://via.placeholder.com/50"}
                        alt={product.name}
                        className="me-3"
                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                      />
                      {product.name}
                      <span className="text-danger ml-2">${product.price}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Narbar;
