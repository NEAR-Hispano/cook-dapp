import { useEffect, useRef, useState, FC } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchIcon from "../assets/svg/SearchIcon";
import UserIcon from "../assets/svg/UserIcon";
import NearIcon from "../assets/svg/NearIcon";
import DisconnectIcon from "../assets/svg/Disconnect";
import { login, logout } from "../utils";
import useOnClickOutside from "../hooks/useOnClickOutside";
import LogoCookDApp from "../assets/svg/LogoCookDApp";
import useTranslator from "../hooks/useTranslator";
import useNavLinks from "../hooks/useNavLinks";
import useAuth from "../hooks/useAuth";
import LangSelector from "./LangSelector";
import useMobileMenuState from "../hooks/useMobileMenuState";
import useUser from "../hooks/useUser";

const Navbar: FC = () => {
  const [isAccountMenuVisible, setIsAccountMenuVisible] = useState(false);
  const { isMobileMenuOpen, toggleMobileMenu } = useMobileMenuState();
  const [account, setAccount] = useState<string | null>(null);
  const [isExplorer, setIsExplorer] = useState<boolean>(false);
  const userAccountWrapperRef = useRef(null);
  const translator = useTranslator();
  const navLinks = useNavLinks();
  const isLoggedIn = useAuth();
  const [user] = useUser();
  const { pathname } = useLocation();

  useOnClickOutside(
    userAccountWrapperRef,
    () => setIsAccountMenuVisible(false),
    "mousedown"
  );

  useEffect(() => {
    if (isLoggedIn && user) {
      setAccount(user.accountID);
    }
  }, [isLoggedIn, user]);

  useEffect(() => setIsExplorer(pathname.includes("explore")), [pathname]);

  return (
    <nav className="navbar">
      <div className="navbar-nav-links-container">
        {navLinks.map(({ path, label, Icon }) => (
          <Link key={label} to={path} className="navbar-link">
            <div className="navbar-link-icon">{Icon && <Icon />}</div>
            {translator(label)}
          </Link>
        ))}
      </div>
      <Link to="/" className="navbar-logo-container">
        <LogoCookDApp />
      </Link>
      <div className="navbar-secondary-navigation-container">
        <LangSelector />

        {!isExplorer && (
          <div
            className="input-group"
            style={{ display: isLoggedIn ? "flex" : "none" }}
          >
            <span>
              <SearchIcon />
            </span>
            <input type="text" placeholder="Search for recipes" />
          </div>
        )}

        <div className="user-account-wrapper" ref={userAccountWrapperRef}>
          <span
            className="user-icon-span"
            style={{ cursor: "pointer" }}
            onClick={
              (window as any).walletConnection.isSignedIn()
                ? () => setIsAccountMenuVisible((prev) => !prev)
                : () => login()
            }
          >
            <UserIcon />
          </span>
          {account && (
            <div
              className="user-account-menu"
              style={{ display: isAccountMenuVisible ? "flex" : "none" }}
            >
              <div className="user-account">
                <div className="near-account-icon">
                  <NearIcon />
                </div>
                <h6>{account}</h6>
              </div>

              <div className="disconnect-user-account" onClick={() => logout()}>
                <div className="disconnect-icon">
                  <DisconnectIcon />
                </div>
                <h6>{translator("disconnect")}</h6>
              </div>
            </div>
          )}
        </div>

        <div
          className={`hamburger-icon ${
            isMobileMenuOpen && "hamburger-icon-close"
          }`}
          onClick={() => toggleMobileMenu()}
        >
          <div className="hamburger-bar-top" />
          <small>{translator("menu")}</small>
          <div className="hamburger-bar-bottom" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
