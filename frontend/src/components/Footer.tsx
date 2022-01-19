import { Link } from "react-router-dom";
import useTranslator from "../hooks/useTranslator";
import NearLogoWhite from "../assets/svg/NearLogoWhite";
import socials from "../assets/data/socialMedia";
import useNavLinks from "../hooks/useNavLinks";
import LogoCookDAppWhite from "../assets/svg/LogoCookDAppWhite";
import { FC } from "react";

const Footer: FC = () => {
  const translator = useTranslator();
  const navLinks = useNavLinks();

  return (
    <div className="footer-container">
      <div className="footer-section first-footer-section">
        <LogoCookDAppWhite />
        <small>{translator("footer_description")}</small>
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
              to=""
              onClick={(e) => {
                e.preventDefault();
                window.open(link, "_blank");
              }}
            >
              {translator(label)}
            </Link>
          ))}
        </div>
      </div>

      <div className="footer-section fourth-footer-section">
        <h5>Powered by:</h5>
        <div className="near-logo-container">
          <NearLogoWhite />
        </div>
      </div>
    </div>
  );
};

export default Footer;
