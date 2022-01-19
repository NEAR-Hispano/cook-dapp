import { createContext, FC, useState } from "react";

export const MobileContext = createContext<{
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
}>({
  isMobileMenuOpen: false,
  toggleMobileMenu: () => {},
  closeMobileMenu: () => {},
});

const MobileMenuProvider: FC = ({ children }) => {
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
