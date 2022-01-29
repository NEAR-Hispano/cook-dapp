import { FC } from "react";
import { ingridientInterface } from "../types";

interface Props {
  ingredient: ingridientInterface;
}

const Ingredient: FC<Props> = ({ ingredient }) => {
  const { amount, unit, label, details } = ingredient;
  return (
    <div className="ingredient-container">
      {amount && (
        <div className="ingredient-quality-container-amount">{amount}</div>
      )}
      {unit && <div className="ingredient-quality-container-unit">{unit}:</div>}
      {label && (
        <div className="ingredient-quality-container-label">{label},</div>
      )}
      {details && (
        <div className="ingredient-quality-container-details">{details}.</div>
      )}
    </div>
  );
};

export default Ingredient;
