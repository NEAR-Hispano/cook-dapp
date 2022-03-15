import React, { FC, useRef, useState } from "react";
import languages from "../assets/data/languages";
import cookies from "js-cookie";
import i18next from "i18next";
import useOnClickOutside from "../hooks/useOnClickOutside";

type Props = {
  display: "flex" | "none";
  setLanguagesVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const Languages: FC<Props> = ({ display, setLanguagesVisible }) => {
  const [lngCode, setLngCode] = useState(cookies.get("i18next") || "en");
  const languageSelector = useRef(null);

  useOnClickOutside(languageSelector, () => setLanguagesVisible(false), "mousedown");

  const changeLanguage = (code: string) => {
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
