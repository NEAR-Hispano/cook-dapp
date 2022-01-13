import { useState } from 'react'
import Languages from "./Languages";
import LangIcon from "../assets/svg/LangIcon";
import CarretDown from "../assets/svg/CarretDown";

const LangSelector = () => {
    const [languagesVisible, setLanguagesVisible] = useState(false);

    return (
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
    )
}

export default LangSelector
