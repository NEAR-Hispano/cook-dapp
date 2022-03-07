import { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import ArrowRight from "../assets/svg/ArrowRight";
import ImageUploadIcon from "../assets/svg/ImageUploadIcon";
import SaveIcon from "../assets/svg/SaveIcon";
import TrashIcon from "../assets/svg/TrashIcon";
import useContract from "../hooks/useContract";
import useTranslator from "../hooks/useTranslator";
import useUser from "../hooks/useUser";
import { imageInterface, recipeBookInterface, userInterface } from "../types";
import refreshPage from "../utils/refreshPage";
import uploadImage from "../utils/uploadImage";
import EditableText from "./EditableText";

interface Props {
  recipeBook: recipeBookInterface;
  selectBook: (recipeBook: recipeBookInterface) => void;
  profile: userInterface | null;
}

const RecipeBookTile: FC<Props> = ({ recipeBook, selectBook, profile }) => {
  const { id, title, banner } = recipeBook;
  const [editingMode, setEditingMode] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string | null>(null);
  const [editedBanner, setEditedBanner] = useState<imageInterface | null>(null);
  const translate = useTranslator();
  const contract = useContract();
  const [user] = useUser();
  const [hasTextLengthError, setHasTextLengthError] = useState<string | null>(null)

  useEffect(() => {
    if (user && profile) {
      setEditingMode(user.accountID === profile.accountID);
    }
  }, [user, profile]);

  function deleteRecipeBookCB() {
    toast(translate("Recipe Book Deleted"), {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setTimeout(() => {
      refreshPage();
    }, 3000);
  }

  function deleteRecipeBook() {
    if (contract && editingMode) {
      toast(translate("Deleting recipe book..."), {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      contract.deleteRecipeBook({ id }).then(() => {
        deleteRecipeBookCB();
      });
    }
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e && e.target && e.target.files && e.target.files[0]) {
      let file = e.target.files[0];
      uploadImage({ file, setBanner: setEditedBanner });
    }
  }

  function updatedRecipeBookCB() {
    toast(translate("Recipe Book Updated"), {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setTimeout(() => {
      refreshPage();
    }, 3000);
  }

  function saveChanges() {
    if (contract && (editedBanner || editedTitle)) {
      toast(translate("Updating recipe book..."), {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      contract
        .updateRecipeBook({ id, title: editedTitle, banner: editedBanner })
        .then(() => {
          updatedRecipeBookCB();
        });
    }
  }

  return (
    <div className="recipe-book-tile-container">
      {editingMode && (
        <div className="edit-icons">
          <label className="edit-icon-container" htmlFor="updated-banner-image">
            <ImageUploadIcon />
            <input
              onChange={(e) => handleInput(e)}
              type="file"
              id="updated-banner-image"
              accept="image/x-png, image/gif, image/jpeg"
            />
          </label>
          <div
            className="edit-icon-container"
            onClick={() => deleteRecipeBook()}
          >
            <TrashIcon />
          </div>
          <div className="edit-icon-container" onClick={() => saveChanges()}>
            <SaveIcon />
          </div>
        </div>
      )}

      <div className="recipe-book-message">
        <small>{translate("recipe_book")}</small>
      </div>
      <img
        src={editedBanner ? editedBanner.url : banner.url}
        alt={editedBanner ? editedBanner.name : banner.name}
      />
      <div className="recipe-slide-information-wrapper">
        <div className="title">
          {editingMode ? (
            <EditableText
              className="edit-recipe-book-title"
              onBlur={(e) => setEditedTitle(e.currentTarget.innerText)}
              isEditable={editingMode}
              setHasTextLengthError={setHasTextLengthError}
              textType="description"
            >
              {title && title}
            </EditableText>
          ) : (
            <h6>{title}</h6>
          )}
        </div>
        <div
          className="explore-option-container"
          onClick={() => selectBook(recipeBook)}
        >
          <small>{translate("explore")}</small>
          <ArrowRight size={20} />
        </div>
      </div>
    </div>
  );
};

export default RecipeBookTile;
