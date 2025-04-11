import { NavLink, useLocation } from "react-router-dom";
import "../../src/index.css";

const Narbar = () => {
  const location = useLocation();

  return (
    <div>
      <header className="header_section">
        <div className="container">
          <nav className="navbar navbar-expand-lg custom_nav-container ">
            <a className="navbar-brand" href="/Home">
              <img width={250} src="images/logo.png" alt="#" />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className=""></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink exact to="/" className="nav-link" activeClassName="active">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className={`nav-link dropdown-toggle ${
                      location.pathname === "/About" || location.pathname === "/testimonial" ? "active" : ""
                    }`}
                    href="#"
                    data-toggle="dropdown"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="true"
                  >
                    <span className="nav-label">
                      Pages <span className="caret" />
                    </span>
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink to="/About" className="dropdown-item" activeClassName="active">
                        About
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/testimonial" className="dropdown-item" activeClassName="active">
                        Testimonial
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/feedback" className="dropdown-item" activeClassName="active">
                        Contact
                      </NavLink>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <NavLink to="/product" className="nav-link" activeClassName="active">
                    Products
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/Blog" className="nav-link" activeClassName="active">
                    Blog
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/Contact" className="nav-link" activeClassName="active">
                    Contact
                  </NavLink>
                </li>
                
                <li className="nav-item">
                  <NavLink to="/CheckOut" className="nav-link" activeClassName="active">
                    {/* Keep your SVG icon here */}
                    🛒
                  </NavLink>
                </li>
                <form className="form-inline">
                  <button className="btn  my-2 my-sm-0 nav_search-btn" type="submit">
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
