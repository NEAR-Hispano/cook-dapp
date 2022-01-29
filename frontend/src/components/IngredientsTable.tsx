import { FC } from "react";
import useContract from "../hooks/useContract";
import { ingridientInterface } from "../types";
import Ingredient from "./Ingredient";
import { toast } from "react-toastify";
import useTranslator from "../hooks/useTranslator";
import AddIcon from "../assets/svg/AddIcon";
import PlusIcon from "../assets/svg/PlusIcon";
interface Props {
  ingredientsList: Array<ingridientInterface>;
  recipeID: string;
}

const IngredientsTable: FC<Props> = ({ ingredientsList, recipeID }) => {
  const contract = useContract();
  const translate = useTranslator();

  function addRecipeList() {
    if (contract) {
      contract.addRecipeList({ recipeID }).then(() => {
        toast(translate("added_to_recipe_list"), {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    }
  }

  return (
    <div className="ingredients-recipe-table-wrapper">
      <div className="ingridients-recipe-table">
        {ingredientsList.map((ingredient) => (
          <Ingredient ingredient={ingredient} />
        ))}
      </div>
      <div className="ingredients-action-button-container">
        <div className="button" onClick={() => addRecipeList()}>
          <small>add recipe list</small>
          <PlusIcon size={20} />
        </div>
      </div>
    </div>
  );
};

export default IngredientsTable;
