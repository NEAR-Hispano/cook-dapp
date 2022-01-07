import React from "react";
import Navbar from "./components/Navbar";

const Layout = ({ children }) => {
  return (
    <main className="app-container">
      <header>
        <Navbar />
      </header>      
      {children}
      <footer />
    </main>
  );
};

export default Layout;
