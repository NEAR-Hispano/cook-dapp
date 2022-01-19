import { FC } from "react";
import Footer from "./components/Footer";
import MobileMenu from "./components/MobileMenu";
import Navbar from "./components/Navbar";

const Layout: FC = ({ children }) => {
  return (
    <main className="app-container">
      <header>
        <Navbar />
      </header>
      <div className="body-container">
        <MobileMenu />
        {children}
      </div>
      <footer>
        <Footer />
      </footer>
    </main>
  );
};

export default Layout;
