import React from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const Layout = ({ children }) => {
  return (
    <main className="app-container">
      <header>
        <Navbar />
      </header>
      <div className="body-container">{children}</div>
      <footer>
        <Footer />
      </footer>
    </main>
  );
};

export default Layout;
