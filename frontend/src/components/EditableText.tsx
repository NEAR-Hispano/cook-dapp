import { FC } from "react";

interface Props {
  onBlur: (e: React.FormEvent<HTMLDivElement>) => void;
  isEditable: boolean;
  className?: string;
}

const EditableText: FC<Props> = ({
  isEditable = false,
  onBlur,
  children,
  className = "",
}) => {
  return (
    <div
      className={`${className} editable-text`}
      onBlur={(e) => onBlur(e)}
      contentEditable={isEditable}
      suppressContentEditableWarning
    >
      {children}
    </div>
  );
};

export default EditableText;
