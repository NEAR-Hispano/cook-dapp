import React, { useRef, useState } from "react";
import languages from "../assets/data/languages";
import cookies from "js-cookie";
import i18next from "i18next";
import useOnClickOutside from "../hooks/useOnClickOutside";

const Languages = ({ display, setLanguagesVisible }) => {
  const [lngCode, setLngCode] = useState(cookies.get("i18next") || "en");
  const languageSelector = useRef(null);

  useOnClickOutside(languageSelector, () => setLanguagesVisible(false));

  const changeLanguage = (code) => {
    i18next.changeLanguage(code);
    setLngCode(code);
  };

  return (
    <div className="languages-list" style={{ display }} ref={languageSelector}>
      {languages.map(({ code, name }) => (
        <div
          className={
            lngCode === code ? "language language-selected" : "language"
          }
          onClick={() => changeLanguage(code)}          
          key={code}
        >
          {name}
        </div>
      ))}
    </div>
  );
};

export default Languages;
