import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useMobileMenuState } from "../context/MobileMenuProvider";
import useNavLinks from "../hooks/useNavLinks";
import useTranslator from "../hooks/useTranslator";
import LangSelector from "../components/LangSelector";

const MobileMenu = () => {
  const { isMobileMenuOpen, _, closeMobileMenu } = useMobileMenuState();
  const navLinks = useNavLinks();
  const translator = useTranslator();

  const location = useLocation();

  useEffect(() => {
    closeMobileMenu();
  }, [location]);

  return (
    <div
      className={`mobile-menu-container ${
        isMobileMenuOpen && "mobile-menu-open"
      }`}
    >
      <div className="mobile-menu-content">
        {navLinks.map(({ path, label, Icon }, index) => (
          <Link
            key={label}
            to={path}
            className={`mobile-menu-link ${
              isMobileMenuOpen && "mobile-menu-link-open"
            }`}
            style={{ transitionDelay: (index + 1) * 100 + 500 + "ms" }}
          >
            <div className="mobile-menu-link-icon">{Icon && <Icon size={20} />}</div>
            {translator(label)}
          </Link>
        ))}
      </div>

      <div className="lang-selector-container">
        <LangSelector />
      </div>
    </div>
  );
};

export default MobileMenu;
