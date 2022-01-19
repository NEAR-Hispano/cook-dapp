import { FC } from "react";
import useTranslator from "../hooks/useTranslator";
import ImageOne from "../assets/images/plato2.jpg";
import ImageTwo from "../assets/images/plato3.jpg";

const LandingScreen: FC = () => {
  const translate = useTranslator();

  return (
    <div className="landing-screen-container">
      <div className="landing-screen-banner">
        <div className="landing-banner-text-container">
          <h1>{translate("landing_banner_title")}</h1>
          <p>{translate("landing_banner_text")}</p>
        </div>
      </div>

      <div className="landing-screen-cards">
        <div className="landing-screen-card">
          <img src={ImageOne} alt="" />
          <div className="landing-screen-card-text-container">
            <h2 className="landing-screen-card-title">
              {translate("landing_card_title_most_tiped_recipes")}
            </h2>
            <div className="landing-screen-card-button">
              {translate("explore")}
            </div>
          </div>
        </div>

        <div className="landing-screen-card">
          <img src={ImageTwo} alt="" />
          <div className="landing-screen-card-text-container">
            <h2 className="landing-screen-card-title">
              {translate("landing_card_title_trending_recipes")}
            </h2>
            <div className="landing-screen-card-button">
              {translate("explore")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingScreen;
