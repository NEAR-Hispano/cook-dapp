import { FC } from "react";

interface Props {
  onBlur: (e: React.FormEvent<HTMLDivElement>) => void;
  isEditable: boolean;
}

const EditableText: FC<Props> = ({ isEditable = false, onBlur, children }) => {
  return (
    <div
      onBlur={(e) => onBlur(e)}
      contentEditable={isEditable}
      suppressContentEditableWarning
    >
      {children}
    </div>
  );
};

export default EditableText;
