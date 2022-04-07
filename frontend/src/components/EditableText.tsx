import { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import useTranslator from "../hooks/useTranslator";
import validateTextLength from "../utils/validateTextLength";

interface Props {
  onBlur: (e: React.FormEvent<HTMLDivElement>) => void;
  isEditable: boolean;
  className?: string;
  textType?: "title" | "description";
}

const EditableText: FC<Props> = ({
  isEditable = false,
  onBlur,
  children,
  className = "",
  textType,
}) => {
  const [lengthError, setLengthError] = useState<null | string>("");
  const [text, setText] = useState<string>(children?.toString() || "");
  const translate = useTranslator();

  useEffect(() => {
    if (textType && text) {
      setLengthError(validateTextLength({ textType, text }));
    }
  }, [text]);
  
  useEffect(() => {
    if(lengthError) {
      toast.dismiss()
      toast(translate(lengthError), {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [lengthError]);

  return (
    <div
      className={`${className} editable-text`}
      onBlur={(e) => {
        onBlur(e);
      }}
      onKeyDown={(e) => {
        if(e.key === "Backspace" && lengthError === "length is to long.") {
          setLengthError(null)
        }
        if(e.key !== "Backspace" && lengthError === "length is to long.") {
          e.preventDefault()
        }
      }}
      onInput={(e) => {
        setText(e.currentTarget.innerText);
      }}
      contentEditable={isEditable}
      suppressContentEditableWarning
      title={(lengthError && lengthError) || ""}
    >
      {children}
    </div>
  );
};

export default EditableText;
