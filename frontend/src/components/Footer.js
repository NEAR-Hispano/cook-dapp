import React from "react";
import LogoCookDApp from "../assets/svg/LogoCookDApp";
import { Link } from "react-router-dom";
import useTranslator from "../hooks/useTranslator";
import NearLogo from "../assets/svg/NearLogo";
import socials from "../assets/data/socialMedia";
import useNavLinks from "../hooks/useNavLinks";

const Footer = () => {
  const translator = useTranslator();
  const navLinks = useNavLinks();

  return (
    <div className="footer-container">
      <div className="footer-section first-footer-section">
        <LogoCookDApp />
        <small>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus sit
          ducimus maiores repellendus ab pariatur iure voluptates animi vel
          eligendi. Nobis dolore ducimus, fugit consectetur ab saepe est
          consequatur quidem.
        </small>
      </div>

      <div className="footer-section second-footer-section">
        <h5>{translator("pages")}:</h5>
        <div className="pages-list">
          {navLinks.map(({ label, path }) => (
            <Link key={label} to={path}>
              {translator(label)}
            </Link>
          ))}
        </div>
      </div>

      <div className="footer-section third-footer-section">
        <h5>{translator("follow_us")}:</h5>
        <div className="socials-list">
          {socials.map(({ label, link }) => (
            <Link
              key={label}
              target="_blank"
              rel="noreferrer"
              to={{ pathname: link }}
            >
              {translator(label)}
            </Link>
          ))}
        </div>
      </div>

      <div className="footer-section fourth-footer-section">
        <h5>Powered by:</h5>
        <div className="near-logo-container">
          <NearLogo />
        </div>
      </div>
    </div>
  );
};

export default Footer;
