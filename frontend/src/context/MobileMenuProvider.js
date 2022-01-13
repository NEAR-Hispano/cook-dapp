import { createContext, useContext, useState } from "react";

const MobileContext = createContext();

export const useMobileMenuState = () => {
  return useContext(MobileContext);
};

const MobileMenuProvider = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <MobileContext.Provider
      value={{ isMobileMenuOpen, toggleMobileMenu, closeMobileMenu }}
    >
      {children}
    </MobileContext.Provider>
  );
};

export default MobileMenuProvider;
