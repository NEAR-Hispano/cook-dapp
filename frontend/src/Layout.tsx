import { FC, useEffect } from "react";
import Footer from "./components/Footer";
import MobileMenu from "./components/MobileMenu";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "./hooks/useAuth";
import useUser from "./hooks/useUser";
import useContract from "./hooks/useContract";
import { userInterface } from "./types";

const Layout: FC = ({ children }) => {
  const isLoggedIn = useAuth();
  const [user, setUser] = useUser();
  const contract = useContract();

  useEffect(() => {
    if (isLoggedIn) {
      if (!user && contract && setUser) {
        contract
          .getUser({ accountID: null })
          .then((res: userInterface) => setUser(res));
      }
    }
  }, [isLoggedIn]);

  return (
    <main className="app-container">
      <header>
        <Navbar />
      </header>
      <div className="body-container">
        <MobileMenu />
        {children}
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
      <footer>
        <Footer />
      </footer>
    </main>
  );
};

export default Layout;
