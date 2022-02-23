import { FC, useState } from "react";
import useContract from "../hooks/useContract";
import { ingredientInterface } from "../types";
import Ingredient from "./Ingredient";
import { toast } from "react-toastify";
import useTranslator from "../hooks/useTranslator";
import PlusIcon from "../assets/svg/PlusIcon";

interface Props {
  ingredientsList: Array<ingredientInterface>;
  editingMode: boolean;
  recipeID?: string;
  editIngridientLabel: (index: number, label: string) => void;
  editIngridientAmount: (index: number, amount: string) => void;
  editIngridientUnit: (index: number, unit: string) => void;
  editIngridientDetails: (index: number, details: string) => void;
  editDeleteIngredient: (index: number) => void;
  editAddIngredient: (
    label: string,
    amount: string,
    unit: string,
    details: string
  ) => void;
}

const IngredientsTable: FC<Props> = ({
  ingredientsList,
  recipeID,
  editIngridientLabel,
  editIngridientAmount,
  editIngridientUnit,
  editIngridientDetails,
  editDeleteIngredient,
  editingMode,
  editAddIngredient,
}) => {
  const contract = useContract();
  const translate = useTranslator();
  const [amount, setAmount] = useState<number>(1);
  const [unit, setUnit] = useState<string>("");
  const [label, setLabel] = useState<string>("");
  const [details, setDetails] = useState<string>("");

  function addRecipeList() {
    if (contract && recipeID) {
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
      {editingMode ? (
        <div className="add-ingridient-wrapper">
          <div className="add-ingredient-title-wrapper">
            <h2>{translate("add_new_ingredient")}</h2>
          </div>

          <div className="add-ingridient-properties-wrapper">
            <div className="add-ingridient-property">
              <div className="label-wrapper">
                <small>{translate("amount")}</small>
              </div>
              <div className="input-wrapper">
                <input
                  type="number"
                  name="amount"
                  id={"amount"}
                  min={1}
                  value={amount}
                  onChange={(e) => setAmount(parseInt(e.currentTarget.value))}
                />
              </div>
            </div>

            <div className="add-ingridient-property">
              <div className="label-wrapper">
                <small>{translate("unit")}</small>
              </div>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="unit"
                  id={"unit"}
                  value={unit}
                  onChange={(e) => setUnit(e.currentTarget.value)}
                />
              </div>
            </div>

            <div className="add-ingridient-property">
              <div className="label-wrapper">
                <small>{translate("label")}</small>
              </div>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="label"
                  id={"label"}
                  value={label}
                  onChange={(e) => setLabel(e.currentTarget.value)}
                />
              </div>
            </div>

            <div className="add-ingridient-property">
              <div className="label-wrapper">
                <small>{translate("details")}</small>
              </div>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="label"
                  id={"label"}
                  value={details}
                  onChange={(e) => setDetails(e.currentTarget.value)}
                />
              </div>
            </div>
          </div>

          <div className="add-ingridient-button-wrapper">
            <button
              onClick={() =>
                editAddIngredient(label, String(amount), unit, details)
              }
            >
              <small>{translate("add_ingredient")}</small>
            </button>
          </div>
        </div>
      ) : recipeID? (
        <div className="ingredients-action-button-container">
          <div className="button" onClick={() => addRecipeList()}>
            <small>{translate("add_recipe_list")}</small>
            <PlusIcon size={20} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default IngredientsTable;
