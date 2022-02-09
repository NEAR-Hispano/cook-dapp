import { FC } from "react";
import ArrowRight from "../assets/svg/ArrowRight";
import useTranslator from "../hooks/useTranslator";
import { recipeBookInterface } from "../types";

interface Props {
  recipeBook: recipeBookInterface;
  selectBook: (recipeBook: recipeBookInterface) => void;
}

const RecipeBookTile: FC<Props> = ({ recipeBook, selectBook }) => {
  const { title, banner } = recipeBook;
  const translate = useTranslator();
  return (
    <div className="recipe-book-tile-container">
      <div className="recipe-book-message">
        <small>{translate("recipe_book")}</small>
      </div>
      <img src={banner.url} alt={banner.name} />
      <div className="recipe-slide-information-wrapper">
        <div className="title">
          <h6>{title}</h6>
        </div>
        <div
          className="explore-option-container"
          onClick={() => selectBook(recipeBook)}
        >
          <small>{translate("explore")}</small>
          <ArrowRight size={20} />
        </div>
      </div>
    </div>
  );
};

export default RecipeBookTile;
