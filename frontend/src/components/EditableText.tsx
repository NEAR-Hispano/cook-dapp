import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import useTranslator from "../hooks/useTranslator";
import validateTextLength from "../utils/validateTextLength";

interface Props {
  onBlur: (e: React.FormEvent<HTMLDivElement>) => void;
  isEditable: boolean;
  className?: string;
  setHasTextLengthError?: React.Dispatch<React.SetStateAction<string | null>>;
  textType?: "title" | "description";
}

const EditableText: FC<Props> = ({
  isEditable = false,
  onBlur,
  children,
  className = "",
  setHasTextLengthError,
  textType,
}) => {
  const [lengthError, setLengthError] = useState<null | string>("");
  const [text, setText] = useState<string | null>(null);
  const translate = useTranslator();

  useEffect(() => {
    if (setHasTextLengthError !== null && textType && text) {
      setLengthError(validateTextLength({ textType, text }));
    }
  }, [children, text]);

  return (
    <div
      className={`${className} editable-text`}
      onBlur={(e) => {
        setText(e.currentTarget.innerText);
        onBlur(e);
      }}
      contentEditable={isEditable}
      suppressContentEditableWarning
      style={{
        backgroundColor: lengthError ? "#ffcccb" : "white",
        padding: "5px",
        borderRadius: "2px",
      }}
      title={(lengthError && lengthError) || ""}
    >
      {children}
    </div>
  );
};

export default EditableText;
