import React from "react";
import NearIcon from "../assets/svg/NearIcon";
import useTranslator from "../hooks/useTranslator";
import { login } from "../utils";

const LoginScreen = () => {
  const translate = useTranslator();

  return (
    <div className="login-screen-container">
      <div className="login-content-container">
        <div className="login-near-icon-container">
          <NearIcon size={90} />
        </div>

        <div className="login-text">
          <h5>{translate("login_title")}</h5>
          <p>{translate("login_text")}</p>
        </div>

        <div className="login-buttons-container">
          <div className="login-button-container">
            <button onClick={() => login()}>{translate("login")}</button>
          </div>

          <div className="login-buttons-separator">
            <small>{translate("or")}</small>
          </div>

          <div className="login-button-container">
            <button
              onClick={() =>
                window.open("https://wallet.near.org/create", "_blank")
              }
            >
              {translate("create_account")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
