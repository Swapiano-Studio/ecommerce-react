import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function NavBarLink() {
  const {
    isAuthenticated,
    username,
    logout
  } = useContext(AuthContext);

  return (
    <ul className="navbar-nav ms-auto mb-3 mb-lg-0">
      {isAuthenticated ? (
        <>
          <li className="nav-item">
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? "nav-link active fw-semibold"
                  : "nav-link fw-semibold"
              }
              end
            >
              {`Hi, ${username}`}
            </NavLink>
          </li>
          <li className="nav-item">
            <button
              className="nav-link fw-semibold"
              onClick={() => {
                if (window.confirm('Are you sure you want to logout?')) {
                  logout();
                }
              }}
            >
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li className="nav-item">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "nav-link active fw-semibold"
                  : "nav-link fw-semibold"
              }
              end
            >
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive
                  ? "nav-link active fw-semibold"
                  : "nav-link fw-semibold"
              }
              end
            >
              Register
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
}

export default NavBarLink;
