import { FC } from "react";
import useCopyToClipboard from "../hooks/useCopyToClipboard";
import { ingridientInterface } from "../types";

interface Props {
  ingredient: ingridientInterface;
}

const Ingredient: FC<Props> = ({ ingredient }) => {
  const { amount, unit, label, details } = ingredient;
  const [_, copy] = useCopyToClipboard();

  return (
    <div
      className="ingredient-container cursor-pointer"
      onClick={() => copy(`${amount} ${unit}: ${label}, ${details}.`)}
    >
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
