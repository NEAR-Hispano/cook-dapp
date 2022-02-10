import { FC, useState } from "react";
import useTranslator from "../hooks/useTranslator";
import { imageInterface, recipeBookInterface } from "../types";
import ImageUploader from "./ImageUploader";
import EditableText from "./EditableText";

interface Props {}

const CreateRecipeBook: FC<Props> = () => {
  const translate = useTranslator();
  const [title, setTitle] = useState<string | null>("Book title here");
  const [banner, setBanner] = useState<imageInterface | null>(null);

  function createRecipeBook() {

  }

  return (
    <div className="create-recipe-book-tile-container">
      {banner? <img src={banner.url} alt={banner.name} /> : (
        <div className="image-input-placeholder">
          <ImageUploader setImage={setBanner} />
        </div>
      )}
      <div className="recipe-slide-information-wrapper">
        <div className="title">
          <EditableText className="create-recipe-book-title" onBlur={(e) => {}} isEditable={true}>
            {title && title}
          </EditableText>
        </div>
        <div className="explore-option-container" onClick={(e) => createRecipeBook()}>
          <small>{translate("create book")}</small>
        </div>
      </div>
    </div>
  );
};

export default CreateRecipeBook;
