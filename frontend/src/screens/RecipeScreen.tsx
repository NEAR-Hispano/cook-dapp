import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useContract from "../hooks/useContract";
import useUser from "../hooks/useUser";
import { imageInterface, recipeInterface } from "../types";
import { Rating as RatingStars } from "react-simple-star-rating";
import useTranslator from "../hooks/useTranslator";
import useCopyToClipboard from "../hooks/useCopyToClipboard";
import IngredientsTable from "../components/IngredientsTable";
import ListIcon from "../assets/svg/ListIcon";
import TextIcon from "../assets/svg/TextIcon";
import Review from "../components/Review";
import EditableText from "../components/EditableText";
import { toast } from "react-toastify";
import EditIcon from "../assets/svg/EditIcon";
import CrossIcon from "../assets/svg/CrossIcon";
import SaveIcon from "../assets/svg/SaveIcon";
import { v4 as uuid } from "uuid";

interface Props {}

const RecipeScreen: FC<Props> = () => {
  const [editingMode, setEditingMode] = useState<boolean>(false);
  const [recipe, setRecipe] = useState<recipeInterface | null>();
  const { id, edit } = useParams();
  const [user] = useUser();
  const contract = useContract();
  const translate = useTranslator();
  const [_, copy] = useCopyToClipboard();
  const [hasCheckedForEditPermissions, setHasCheckedForEditPermissions] =
    useState<Boolean>(false);
  const [resetChangesID, setResetChangesID] = useState<string>("");

  const checkIsEditing = () => {
    const result = Boolean(
      edit === "edit" && user && id && user.recipesCreated.includes(id)
    );

    /* Check for edit permissions */
    if (edit === "edit") {
      if (result) {
        toast.dismiss();
        toast(translate("Edit mode enabled"), {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          delay: 1000,
        });
      } else if (!result && hasCheckedForEditPermissions) {
        toast.dismiss();
        toast(translate("You can not edit this recipe."), {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          delay: 1000,
        });
      } else {
        setHasCheckedForEditPermissions(true);
        toast(translate("checking for edit permissions"), {
          position: "bottom-right",
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
    return result;
  };

  function copyAccountID() {
    if (recipe) copy(recipe.creator);
  }

  async function getRecipe() {
    if (contract && id) {
      const result = await contract.getRecipe({ id });
      setRecipe(result);
    }
  }

  useEffect(() => {
    setEditingMode(checkIsEditing());
  }, [user, id]);

  useEffect(() => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
    getRecipe();
  }, [resetChangesID]);

  /* Editable Recipe functions below */

  function resetChanges() {
    setResetChangesID(uuid());
    setEditingMode(false);
  }

  function refreshPage() {
    (window as any).location.reload(false);
  }

  function saveChanges() {
    if (contract && recipe) {
      const {
        id,
        title,
        description,
        ingredients,
        instructions,
        recipeBookID,
        category,
        chefNote,
      } = recipe;

      toast(translate("Saving changes."), {
        position: "bottom-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        delay: 1000,
      });

      contract
        .updateRecipe({
          id,
          title,
          description,
          ingridientsList: ingredients,
          instructions,
          recipeBookID,
          category,
          chefNote,
        })
        .then(() => refreshPage());
    }
  }

  function editTitle(text: string) {
    if (recipe) {
      const editedRecipe = recipe;
      editedRecipe.title = text;
      setRecipe(editedRecipe);
    }
  }

  function editImage() {
    // parameter to be determined
    if (recipe) {
      const editedRecipe = recipe;

      /* To be continued */

      setRecipe(editedRecipe);
    }
  }

  function editDescription(text: string) {
    if (recipe) {
      const editedRecipe = recipe;
      editedRecipe.description = text;
      setRecipe(editedRecipe);
    }
  }

  function editIngridientLabel(index: number, label: string) {
    if (recipe) {
      const editedRecipe = recipe;
      editedRecipe.ingredients[index].label = String(label);
      setRecipe(editedRecipe);
    }
  }

  function editIngridientAmount(index: number, amount: number) {
    if (recipe) {
      const editedRecipe = recipe;
      editedRecipe.ingredients[index].amount = String(amount);
      setRecipe(editedRecipe);
    }
  }

  function editIngridientUnit(index: number, unit: string) {
    if (recipe) {
      const editedRecipe = recipe;
      editedRecipe.ingredients[index].unit = String(unit);
      setRecipe(editedRecipe);
    }
  }
  function editIngridientDetails(index: number, details: string) {
    if (recipe) {
      const editedRecipe = recipe;
      editedRecipe.ingredients[index].details = String(details);
      setRecipe(editedRecipe);
    }
  }

  function editInstructions(index: number, text: string) {
    if (recipe) {
      const editedRecipe = recipe;
      editedRecipe.instructions[index] = text;
      setRecipe(editedRecipe);
    }
  }

  function editChefNote(chefNote: string) {
    if (recipe) {
      const editedRecipe = recipe;
      editedRecipe.chefNote = chefNote;
      setRecipe(editedRecipe);
    }
  }

  /* Editable Recipe functions above */

  return (
    <div className="recipe-screen-container">
      {recipe && user && recipe.creator === user.accountID && !editingMode && (
        <div className="edit-recipe-action-buttons-wrapper">
          <div
            className="edit-button-wrapper cursor-pointer"
            onClick={() => setEditingMode(true)}
          >
            <EditIcon size={30} />
          </div>
        </div>
      )}

      {recipe && user && recipe.creator === user.accountID && editingMode && (
        <div className="edit-recipe-action-buttons-wrapper">
          <div
            className="reset-button-wrapper cursor-pointer"
            onClick={() => resetChanges()}
            >
            <CrossIcon size={30} />
          </div>
          <div className="save-button-wrapper cursor-pointer"
            onClick={() => saveChanges()}
          >
            <SaveIcon size={30} />
          </div>
        </div>
      )}

      <div className="recipe-banner">
        <div className="title">
          <EditableText
            onBlur={(e) => editTitle(e.currentTarget.innerText)}
            isEditable={editingMode}
          >
            {recipe && recipe.title}
          </EditableText>
        </div>

        <div className="summary-info">
          <div className="reviews-quantity-wrapper">
            <small>reviews {recipe && recipe.reviews.length}</small>
          </div>

          <div className="ingridients-quantity-wrapper">
            <small>ingredients {recipe && recipe.ingredients.length}</small>
          </div>

          <div className="rating-stars-wrapper">
            <small>
              <RatingStars
                ratingValue={
                  recipe && recipe.averageRating
                    ? recipe.averageRating * 2 * 10
                    : 0
                }
                initialValue={0}
                size={20}
                iconsCount={5}
                readonly
                allowHalfIcon
              />
            </small>
          </div>
        </div>
      </div>

      <div className="account-id-wrapper" onClick={() => copyAccountID()}>
        {recipe && recipe.creator}
      </div>

      <div className="image-wrapper">
        <img
          src={(recipe && recipe.image.url) || ""}
          alt={(recipe && recipe.image.name) || ""}
        />
      </div>

      <div className="user-description-wrapper">
        <div className="description-title">
          <h2>description</h2>
          <TextIcon size={30} />
        </div>
        <div className="description-container">
          <EditableText
            onBlur={(e) => editDescription(e.currentTarget.innerText)}
            isEditable={editingMode}
          >
            {recipe && recipe.description}
          </EditableText>
        </div>
      </div>

      <div className="content-wrapper">
        <div className="title">
          <h2>ingredients</h2>
          <ListIcon size={30} />
        </div>
        <div className="information-container">
          {recipe && (
            <IngredientsTable
              recipeID={recipe.id}
              ingredientsList={recipe.ingredients}
            />
          )}
        </div>
      </div>

      <div className="content-wrapper">
        <div className="title">
          <h2>instructions</h2>
          <ListIcon size={30} />
        </div>
        <div className="information-container">
          {recipe &&
            recipe.instructions.map((instruction, index) => (
              <div className="step-container">
                <div className="step-label-information">
                  <div className="step-label">step</div>
                  <div className="step-number">{index + 1}</div>
                </div>
                <div
                  className="step-description cursor-pointer"
                  onClick={() => copy(instruction)}
                >
                  {instruction}
                </div>
              </div>
            ))}
        </div>
      </div>

      {recipe && recipe.chefNote && (
        <div className="content-wrapper">
          <div className="title">
            <h2>chef's note</h2>
            <ListIcon size={30} />
          </div>
          <div className="information-container">
            {recipe && recipe.chefNote}
          </div>
        </div>
      )}

      <div className="content-wrapper">
        <div className="title">
          <h2>reviews</h2>
          <ListIcon size={30} />
        </div>
        <div className="information-container">
          {recipe && recipe.reviews.length > 0 ? (
            recipe.reviews.map((reviewID, index) => (
              <Review key={index} reviewID={reviewID} />
            ))
          ) : (
            <h1>Recipe does not have any reviews yet.</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeScreen;
