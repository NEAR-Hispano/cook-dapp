import { FC } from "react";
import { Link } from "react-router-dom";
import FullStarIcon from "../assets/svg/FullStarIcon";
import NEARCurrencyIcon from "../assets/svg/NEARCurrencyIcon";
import usePlaceholder from "../hooks/usePlaceholder";
import useTranslator from "../hooks/useTranslator";
import { recipeInterface } from "../types";

interface Props {
  recipe: recipeInterface;
}

const RecipeTile: FC<Props> = ({ recipe }) => {
  const translate = useTranslator();
  const [isPlaceholder] = usePlaceholder();

  return recipe && (
    <Link to={`/recipe/${recipe.id}`} className="recipe-tile-container">
      <div className="recipe-message">
        <small>{translate("recipe")}</small>
      </div>
      <img
        className={`${isPlaceholder && "placeholder"}`}
        src={isPlaceholder? "" : recipe.image.url}
        alt=""
      />
      <div className="recipe-slide-information-wrapper">
        <div className="averageRating">
          <FullStarIcon />
          <small>{recipe.averageRating}</small>
        </div>
        <div className="tipsRecived">
          <NEARCurrencyIcon size={20} />
          <small>{recipe.totalTips}</small>
        </div>
        <div className="title">
          <h6 className={`${isPlaceholder && "placeholder"}`}>{recipe.title}</h6>
        </div>
        <div className="description">
          <p className={`${isPlaceholder && "placeholder"}`}>
            {recipe.description.length > 160
              ? recipe.description.split("", 157).join("") + "..."
              : recipe.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default RecipeTile;
