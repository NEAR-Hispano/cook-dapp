import { FC } from "react";
import { Link } from "react-router-dom";
import FullStarIcon from "../assets/svg/FullStarIcon";
import NEARCurrencyIcon from "../assets/svg/NEARCurrencyIcon";
import { recipeInterface } from "../types";

interface Props {
  recipe: recipeInterface;
}

const RecipeTile: FC<Props> = ({
  recipe: { id, image, averageRating, totalTips, title, description },
}) => {
  return (
    <Link to={`/recipe/${id}`} className="recipe-tile-container">
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
          <p>{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default RecipeTile;
