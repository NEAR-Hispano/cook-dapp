import React from "react";
import Navbar from "./components/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <header>
        <Navbar />
      </header>
      <p>{children}</p>      
    </div>
  );
};

export default Layout;
