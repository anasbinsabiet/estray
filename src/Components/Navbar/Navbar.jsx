import NavbarTop from "./NavbarTop";
import React, { useState } from "react";
import NavbarBottom from "./NavbarBottom";
import CustomNav from "./CustomNav";
import "./Navbar.css";
const Navbars = () => {
  return (
    <div id="navbar-outer">
      <div id="navbar">
        {/* <NavbarTop /> */}
        {/* <NavbarBottom /> */}
        <CustomNav />
      </div>
    </div>
  );
};

export default Navbars;
