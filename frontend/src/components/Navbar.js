import React from "react";
import { Link } from "react-router-dom";

import navLinks from "../assets/data/navLinks";
import SearchIcon from "../assets/svg/SearchIcon";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo-container"></div>
      <div className="navbar-nav-links-container">
        {navLinks.map(({ path, label }) => (
          <Link to={path} className="navbar-link">
            {label}
          </Link>
        ))}
      </div>
      <div className="navbar-secondary-navigation-container">
        
        <select class="lang-selector" name="lang">
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>

        <div className="input-group">
          <span>
            <SearchIcon />
          </span>
          <input type="text" placeholder="Search for recipes" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
