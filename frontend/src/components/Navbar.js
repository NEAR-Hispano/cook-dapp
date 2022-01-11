import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { navLinksApp, navLinksLandingPage } from "../assets/data/navLinks";
import SearchIcon from "../assets/svg/SearchIcon";
import UserIcon from "../assets/svg/UserIcon";
import NearIcon from "../assets/svg/NearIcon";
import DisconnectIcon from "../assets/svg/Disconnect";
import { login, logout } from "../utils";
import useOnClickOutside from "../hooks/useOnClickOutside";
import LogoCookDApp from "../assets/svg/LogoCookDApp";
import Languages from "./Languages";
import LangIcon from "../assets/svg/LangIcon";
import CarretDown from "../assets/svg/CarretDown";
import useTranslator from "../hooks/useTranslator"
import useNavLinks from "../hooks/useNavLinks";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const [isAccountMenuVisible, setIsAccountMenuVisible] = useState(false);
  const [account, setAccount] = useState(null);
  const userAccountWrapperRef = useRef(null);
  const [languagesVisible, setLanguagesVisible] = useState(false);
  const translator = useTranslator();  
  const navLinks = useNavLinks()
  const isLoggedIn = useAuth();

  useOnClickOutside(userAccountWrapperRef, () =>
    setIsAccountMenuVisible(false)
  );

  useEffect(() => {
    if (isLoggedIn) {
      setAccount(window.accountId);
    }
  }, [isLoggedIn]);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo-container">
        <LogoCookDApp />
      </Link>
      <div className="navbar-nav-links-container">
        {navLinks.map(({ path, label }) => (
          <Link key={label} to={path} className="navbar-link">
            {translator(label)}
          </Link>
        ))}
      </div>
      <div className="navbar-secondary-navigation-container">
        <div className="lang-selector">
          <div
            className="lang-selector-icons"
            onClick={() => setLanguagesVisible((prev) => !prev)}
          >
            <LangIcon />
            <CarretDown />
          </div>
          <Languages
            setLanguagesVisible={setLanguagesVisible}
            display={languagesVisible ? "flex" : "none"}
          />
        </div>

        <div className="input-group">
          <span>
            <SearchIcon />
          </span>
          <input type="text" placeholder="Search for recipes" />
        </div>

        <div className="user-account-wrapper" ref={userAccountWrapperRef}>
          <span
            className="user-icon-span"
            style={{ cursor: "pointer" }}
            onClick={
              window.walletConnection.isSignedIn()
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

        <div className="hamburger-icon">
          <small>{translator("menu")}</small>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
