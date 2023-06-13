import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext/AuthContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { saveAs } from "file-saver";

const CustomNav = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const auth = useContext(AuthContext);
  const { user, logOut, isAdmin, isAuth } = auth;
  const logoutHandler = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav
      id="pr-nav"
      className="primary-menu navbar navbar-expand-lg navbar-dark nav-white-desktop w-100"
    >
      <div className="container-fluid primary-menu-inner px-0">
        <div className="top-wrap">
          <Link className="custom-logo-link" to="/">
            <h5 className="m-0">NYA Worldwide</h5>
          </Link>{" "}
          <button
            id="mobile-toggle"
            className="navbar-toggler animate-button collapsed"
            type="button"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setIsVisible(!isVisible)}
          >
            {isVisible ? (
              <FontAwesomeIcon icon={faClose} />
            ) : (
              <FontAwesomeIcon icon={faBars} />
            )}
          </button>
        </div>
        <div
          className={`${
            isVisible
              ? "collapse navbar-collapse justify-content-end d-block"
              : "collapse navbar-collapse justify-content-end d-none"
          }`}
          id="navbarColor01"
        >
          {/* <ul
            id="primary-menu"
            className="navbar-nav pl-3"
            itemScope=""
            itemType="http://www.schema.org/SiteNavigationElement"
          >
            <li className="menu-item nav-item">
              <Link to="/" className="nav-link">
                <span>Home</span>
              </Link>
            </li>
            <li className="menu-item nav-item">
              <Link itemProp="url" to="/singleuser" className="nav-link">
                <span itemProp="name">My Account</span>
              </Link>
            </li>
            <li className="menu-item nav-item">
              <Link itemProp="url" to="/orders" className="nav-link">
                <span itemProp="name">My Order</span>
              </Link>
            </li>
            <li className="menu-item nav-item">
              <Link itemProp="url" to="/adminpanel" className="nav-link">
                <span itemProp="name">Admin Panel</span>
              </Link>
            </li>
            {user ? (
              <li
                id="menu-item-1553"
                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1553 nav-item"
              >
                <Link className="nav-link" onClick={logoutHandler}>
                  Logout
                </Link>
              </li>
            ) : (
              <li
                id="menu-item-1553"
                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1553 nav-item"
              >
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            )}
          </ul> */}

          <div className="header-cta">
            <Link to="/product">
              <div className="d-inline-block elementor-button-link elementor-button elementor-size-md">
                Order Now
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default CustomNav;
