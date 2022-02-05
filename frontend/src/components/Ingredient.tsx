import { FC } from "react";
import TrashIcon from "../assets/svg/TrashIcon";
import useCopyToClipboard from "../hooks/useCopyToClipboard";
import { ingredientInterface } from "../types";
import EditableText from "./EditableText";

interface Props {
  index: number;
  ingredient: ingredientInterface;
  editIngridientLabel: (index: number, label: string) => void;
  editIngridientAmount: (index: number, amount: string) => void;
  editIngridientUnit: (index: number, unit: string) => void;
  editIngridientDetails: (index: number, details: string) => void;
  editDeleteIngredient: (index: number) => void;
  editingMode: boolean;
}

const Ingredient: FC<Props> = ({
  index,
  ingredient,
  editIngridientLabel,
  editIngridientAmount,
  editIngridientUnit,
  editIngridientDetails,
  editDeleteIngredient,
  editingMode,
}) => {
  const { amount, unit, label, details } = ingredient;
  const [_, copy] = useCopyToClipboard();

  return (
    <div className="ingredient-wrapper cursor-pointer">
      <div className="ingredient-container">
        {amount && (
          <EditableText
            className="ingredient-quality-container-amount"
            isEditable={editingMode}
            onBlur={(e) =>
              editIngridientAmount(index, e.currentTarget.innerText)
            }
          >
            {amount}
          </EditableText>
        )}
        {unit && (
          <EditableText
            className="ingredient-quality-container-unit"
            isEditable={editingMode}
            onBlur={(e) => editIngridientUnit(index, e.currentTarget.innerText)}
          >
            {unit}
          </EditableText>
        )}
        {label && (
          <EditableText
            className="ingredient-quality-container-label"
            isEditable={editingMode}
            onBlur={(e) =>
              editIngridientLabel(index, e.currentTarget.innerText)
            }
          >
            {label}
          </EditableText>
        )}
        {details && (
          <EditableText
            className="ingredient-quality-container-details"
            isEditable={editingMode}
            onBlur={(e) =>
              editIngridientDetails(index, e.currentTarget.innerText)
            }
          >
            {details}
          </EditableText>
        )}
      </div>

      {editingMode && (
        <div
          className="delete-button cursor-pointer"
          onClick={() => editDeleteIngredient(index)}
        >
          <TrashIcon size={20} />
        </div>
      )}
    </div>
  );
};

export default Ingredient;
