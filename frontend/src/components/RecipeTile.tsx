import { FC } from "react";
import { Link } from "react-router-dom";
import FullStarIcon from "../assets/svg/FullStarIcon";
import NEARCurrencyIcon from "../assets/svg/NEARCurrencyIcon";
import useTranslator from "../hooks/useTranslator";
import { recipeInterface } from "../types";

interface Props {
  recipe: recipeInterface;
}

const RecipeTile: FC<Props> = ({ recipe }) => {
  const { id, image, averageRating, totalTips, title, description } = recipe;
  const translate = useTranslator();

  return (
    <Link to={`/recipe/${id}`} className="recipe-tile-container">
      <div className="recipe-message">
        <small>{translate("recipe")}</small>
      </div>
      <img src={image.url} alt={image.name} />
      <div className="recipe-slide-information-wrapper">
        <div className="averageRating">
          <FullStarIcon />
          <small>{averageRating}</small>
        </div>
        <div className="tipsRecived">
          <NEARCurrencyIcon size={20} />
          <small>{totalTips}</small>
        </div>
        <div className="title">
          <h6>{title}</h6>
        </div>
        <div className="description">
          <p>{description.length > 160? description.split("", 157).join("") + "..." : description}</p>
        </div>
      </div>
    </Link>
  );
};

export default RecipeTile;
