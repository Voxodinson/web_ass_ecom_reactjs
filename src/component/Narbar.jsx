import { NavLink, useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../../src/index.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import * as bootstrap from "bootstrap";
import { ShoppingCart } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [user, setUser] = useState(null);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [cartQty, setCartQty] = useState(0);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

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
  const getCartLength = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart.length;  // Return the number of items in the cart
  };
  useEffect(() => {
    // Get the cart length on initial load
    const cartLength = getCartLength();
    setCartQty(cartLength);

    // Listen for storage changes (in case it's updated in another tab)
    window.addEventListener("storage", () => {
      const updatedCartLength = getCartLength();
      setCartQty(updatedCartLength);
    });

    return () => {
      window.removeEventListener("storage", () => {
        const updatedCartLength = getCartLength();
        setCartQty(updatedCartLength);
      });
    };
  }, []);

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
                    className={`nav-link dropdown-toggle ${
                      location.pathname === "/About" ||
                      location.pathname === "/testimonial" ||
                      location.pathname === "/feedback" ||
                      location.pathname === "/Contact"
                        ? "active"
                        : ""
                    }`}
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
                  <NavLink to="/order-history" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`} onClick={() => setIsDropdownOpen(false)}>
                    Orders
                  </NavLink>
                </li>
                <li className="nav-item position-relative">
                  <NavLink
                    to="/cart"
                    className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <ShoppingCart color="#ff0000" />
                    {cartQty > 0 && (
                      <span style={{ fontSize: "1rem" }}>
                        ({cartQty})
                      </span>
                    )}
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

                {/* User Profile Dropdown */}
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle d-flex align-items-center"
                    href="#"
                    id="userDropdown"
                    role="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsUserDropdownOpen((prev) => !prev);
                    }}
                  >
                    {user ? (
                      <>
                        <img
                          src={user.profile || "https://via.placeholder.com/30"}
                          alt="User"
                          className="rounded-circle me-2 ml-2"
                          style={{ width: "30px", height: "30px", objectFit: "cover" }}
                        />
                      </>
                    ) : (
                      <>
                        <i className="fa fa-user-circle me-1" style={{ fontSize: '25px' }}></i>
                      </>
                    )}
                  </a>
                  <ul
                    className={`dropdown-menu dropdown-menu-start ${isUserDropdownOpen ? "show" : ""}`}
                    aria-labelledby="userDropdown"
                    style={{ width: "300px" }}
                  >
                    {user ? (
                      <>
                        <li className="dropdown-item-text">👋 Hello, {user.name}</li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => {
                              localStorage.removeItem("user");
                              setUser(null);
                              setIsUserDropdownOpen(false);
                            }}
                          >
                            Logout
                          </button>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link
                            to="/login"
                            className="dropdown-item"
                            onClick={() => setIsUserDropdownOpen(false)}
                          >
                            Login
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/register"
                            className="dropdown-item"
                            onClick={() => setIsUserDropdownOpen(false)}
                          >
                            Register
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>

      {/* Search Modal */}
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
                    className="list-group-item d-flex align-items-center"
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

export default Navbar;
