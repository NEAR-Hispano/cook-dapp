import { FC, useEffect, useState } from "react";
import useContract from "../hooks/useContract";
import { recipeInterface, userInterface } from "../types";
import RecipeTile from "./RecipeTile";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import useTranslator from "../hooks/useTranslator";
import AddIcon from "../assets/svg/AddIcon";
import useUser from "../hooks/useUser";

interface Props {
  recipeIDs: Array<string>;
  filter?: "tips" | "averageRating";
  allowCreate?: boolean;
  profile?: userInterface | null;
}

const RecipesGallery: FC<Props> = ({
  recipeIDs,
  filter = null,
  allowCreate = false,
  profile = null,
}) => {
  const [user] = useUser();
  const translate = useTranslator();
  const contract = useContract();
  const [recipes, setRecipes] = useState<Array<recipeInterface> | null>(null);

  const getRecipes = async () => {
    if (contract) {
      const recipesList: Array<recipeInterface> = [];
      for (let i = 0; i < recipeIDs.length; i++) {
        const recipe = await contract.getRecipe({ id: recipeIDs[i] });
        recipesList.push(recipe);
      }
      setRecipes(recipesList);
    }
  };

  useEffect(() => {
    getRecipes();
  }, [contract, recipeIDs]);

  return (
    <div className="recipes-gallery">
      {allowCreate && profile && user && profile.accountID === user.accountID && recipes && (
        <Link to="/recipe/create" className="recipe-tile-container create-recipe-tile">
          <div className="recipe-message">
            <small>{translate("recipe")}</small>
          </div>
          <AddIcon size={50} />
        </Link>
      )}

      {!filter &&
        recipes &&
        recipes.map((recipe) => <RecipeTile key={uuid()} recipe={recipe} />)}

      {recipes &&
        filter === "tips" &&
        recipes
          .sort((aRecipe, bRecipe) => bRecipe.totalTips - aRecipe.totalTips)
          .map((recipe) => <RecipeTile key={uuid()} recipe={recipe} />)}

      {recipes &&
        filter === "averageRating" &&
        recipes
          .sort(
            (aRecipe, bRecipe) => bRecipe.averageRating - aRecipe.averageRating
          )
          .map((recipe) => <RecipeTile key={uuid()} recipe={recipe} />)}
    </div>
  );
};

export default RecipesGallery;
