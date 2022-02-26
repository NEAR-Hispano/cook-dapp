import { FC, useEffect, useState } from "react";
import validateTextLength from "../utils/validateTextLength";

interface Props {
  onBlur: (e: React.FormEvent<HTMLDivElement>) => void;
  isEditable: boolean;
  className?: string;
  setHasTextLengthError?: React.Dispatch<React.SetStateAction<string | null>>;
  textType?: "title" | "description";
  text?: string | null;
}

const EditableText: FC<Props> = ({
  isEditable = false,
  onBlur,
  children,
  className = "",
  setHasTextLengthError,
  textType,
  text,
}) => {

  const [lengthError, setLengthError] = useState<null | string>("");

  useEffect(() => {
    if (setHasTextLengthError && textType && text) {
      setLengthError(validateTextLength({ textType, text }));
    }
  }, [children, text]);

  return (
    <div
      className={`${className} editable-text`}
      onBlur={(e) => onBlur(e)}
      contentEditable={isEditable}
      suppressContentEditableWarning
      style={{ backgroundColor: lengthError? "#ffcccb" : "white", padding: "5px", borderRadius: "2px" }}
    >
      {children}
    </div>
  );
};

export default EditableText;
