import { FC } from "react";
import useContract from "../hooks/useContract";
import { ingridientInterface } from "../types";
import Ingredient from "./Ingredient";
import { toast } from "react-toastify";
import useTranslator from "../hooks/useTranslator";
import PlusIcon from "../assets/svg/PlusIcon";

interface Props {
  ingredientsList: Array<ingridientInterface>;
  editingMode: boolean;
  recipeID: string;
  editIngridientLabel: (index: number, label: string) => void;
  editIngridientAmount: (index: number, amount: string) => void;
  editIngridientUnit: (index: number, unit: string) => void;
  editIngridientDetails: (index: number, details: string) => void;
  editDeleteIngredient: (index: number) => void;
}

const IngredientsTable: FC<Props> = ({
  ingredientsList,
  recipeID,
  editIngridientLabel,
  editIngridientAmount,
  editIngridientUnit,
  editIngridientDetails,
  editDeleteIngredient,
  editingMode
}) => {
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
        {ingredientsList.map((ingredient, index) => (
          <Ingredient
            index={index}
            editingMode={editingMode}
            editIngridientLabel={editIngridientLabel}
            editIngridientAmount={editIngridientAmount}
            editIngridientUnit={editIngridientUnit}
            editIngridientDetails={editIngridientDetails}
            editDeleteIngredient={editDeleteIngredient}
            ingredient={ingredient}
          />
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
