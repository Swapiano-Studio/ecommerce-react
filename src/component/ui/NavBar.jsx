import React, { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import NavBarLink from "./NavBarLink";
import styles from "./NavBar.module.css";

const NavBar = ({ numCartItems }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on link click (for mobile UX)
  const handleMenuClick = () => setMenuOpen(false);

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light shadow-sm py-3 ${styles.stickyNavbar}`}
      style={{ background: "#EFE3C2" }}
    >
      <div className="container">
        <Link className="navbar-brand fw-bold text-uppercase" to="/">
          SWAPIANO
        </Link>
        {/* Desktop menu */}
        <div className="d-none d-lg-flex align-items-center ms-auto">
          <NavBarLink />
          <Link
            to="/cart"
            className={`btn btn-dark ms-3 rounded-pill position-relative ${styles.responsiveCart}`}
          >
            <FaCartShopping />
            {numCartItems > 0 && (
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                style={{
                  fontSize: "0.85rem",
                  padding: "0.5em 0.65em",
                  backgroundColor: "#6050DC",
                }}
              >
                {numCartItems}
              </span>
            )}
          </Link>
        </div>
        {/* Mobile dropdown menu */}
        <div className="d-lg-none">
          <button
            className="navbar-toggler"
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {menuOpen && (
            <div
              className="dropdown-menu show mt-2 p-2 w-100"
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: "100%",
                background: "#EFE3C2",
                borderRadius: 12,
                zIndex: 2000,
              }}
            >
              <NavBarLink />
              <Link
                to="/cart"
                className={`btn btn-dark w-100 mt-2 rounded-pill position-relative ${styles.responsiveCart}`}
                onClick={handleMenuClick}
              >
                <FaCartShopping />
                {numCartItems > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                    style={{
                      fontSize: "0.85rem",
                      padding: "0.5em 0.65em",
                      backgroundColor: "#6050DC",
                    }}
                  >
                    {numCartItems}
                  </span>
                )}
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
