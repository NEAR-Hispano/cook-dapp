import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useContract from "../hooks/useContract";
import useUser from "../hooks/useUser";
import { imageInterface, ingredientInterface, recipeInterface } from "../types";
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
import { isNumeric } from "../utils";
import BookmarkStar from "../assets/svg/BookmarkStar";
import BookmarkPlus from "../assets/svg/BookmarkPlus";
import HeartIcon from "../assets/svg/HeartIcon";
import HeartFillIcon from "../assets/svg/HeartFillIcon";

interface Props {}

const RecipeScreen: FC<Props> = () => {
  const [editingMode, setEditingMode] = useState<boolean>(false);
  const [recipe, setRecipe] = useState<recipeInterface | null>();
  const { id, edit } = useParams();
  const [user, setUser] = useUser();
  const contract = useContract();
  const translate = useTranslator();
  const [_, copy] = useCopyToClipboard();
  const [hasCheckedForEditPermissions, setHasCheckedForEditPermissions] =
    useState<Boolean>(false);
  const [resetChangesID, setResetChangesID] = useState<string>("");
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [newStep, setNewStep] = useState<string>("");

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
  }, []);

  // useEffect(() => {
  //   getRecipe();
  // }, [resetChangesID]);

  useEffect(() => {
    if (recipe && user) {
      setIsFavorite(Array.from(user.favoriteRecipes).includes(recipe.id));
    }
  }, [recipe, user]);

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
          ingridients: ingredients,
          instructions,
          recipeBookID,
          category,
          chefNote,
        })
        .then(() => refreshPage());
    }
  }

  function toggleIsFavorite() {
    if (recipe && user && contract && setUser) {
      if (isFavorite) {
        // remove recipe from favorite

        toast(translate("Removing recipe from favorites."), {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        contract.removeFavoriteRecipe({ recipeID: recipe.id }).then(() => {
          setIsFavorite((prev) => !prev);
          let updatedUser = user;
          updatedUser.favoriteRecipes.delete(recipe.id);
          setUser(updatedUser);
          toast.dismiss();
          toast(translate("Recipe removed from favorites."), {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            delay: 1000,
          });
        });
      } else {
        // add recipe to favorite

        toast(translate("Adding recipe to favorites."), {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        contract.addFavoriteRecipe({ recipeID: recipe.id }).then(() => {
          setIsFavorite((prev) => !prev);
          let updatedUser = user;
          updatedUser.favoriteRecipes.add(recipe.id);
          setUser(updatedUser);
          toast.dismiss();
          toast(translate("Recipe added to favorites."), {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            delay: 1000,
          });
        });
      }
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

  function editDeleteIngredient(index: number) {
    if (recipe) {
      const editedRecipe = recipe;
      editedRecipe.ingredients.splice(index, 1);
      setRecipe(editedRecipe);
      setResetChangesID(uuid());
    }
  }

  function editIngridientLabel(index: number, label: string) {
    if (recipe) {
      const editedRecipe = recipe;
      editedRecipe.ingredients[index].label = label;
      setRecipe(editedRecipe);
    }
  }

  function editIngridientAmount(index: number, amount: string) {
    if (recipe && isNumeric(amount)) {
      const editedRecipe = recipe;
      editedRecipe.ingredients[index].amount = parseInt(amount);
      setRecipe(editedRecipe);
    }

    if (!isNumeric(amount)) {
      toast(translate("Please note ingridient amounts must be numbers."), {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  function editIngridientUnit(index: number, unit: string) {
    if (recipe) {
      const editedRecipe = recipe;
      editedRecipe.ingredients[index].unit = unit;
      setRecipe(editedRecipe);
    }
  }
  function editIngridientDetails(index: number, details: string) {
    if (recipe) {
      const editedRecipe = recipe;
      editedRecipe.ingredients[index].details = details;
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

  function editAddIngredient(
    label: string,
    amount: string,
    unit: string,
    details: string
  ) {
    if (recipe) {
      const editedRecipe = recipe;
      editedRecipe.ingredients.push({
        label,
        amount: parseInt(amount),
        unit,
        details,
      });
    }
    setResetChangesID(uuid());
  }

  function editAddStep(text: string) {
    if (recipe) {
      const editedRecipe = recipe;
      editedRecipe.instructions.push(text);
      setResetChangesID(uuid());
    }
  }

  /* Editable Recipe functions above */

  return (
    <div className="recipe-screen-container">
      <div
        className="favorite-recipe-status-wrapper"
        style={{ display: recipe && user ? "flex" : "none" }}
      >
        {recipe && user && isFavorite ? (
          <div onClick={() => toggleIsFavorite()}>
            <HeartFillIcon size={30} />
          </div>
        ) : (
          <div onClick={() => toggleIsFavorite()}>
            <HeartIcon size={30} />
          </div>
        )}
      </div>

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
          <div
            className="save-button-wrapper cursor-pointer"
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
              editingMode={editingMode}
              recipeID={recipe.id}
              ingredientsList={recipe.ingredients}
              editIngridientLabel={editIngridientLabel}
              editIngridientAmount={editIngridientAmount}
              editIngridientUnit={editIngridientUnit}
              editIngridientDetails={editIngridientDetails}
              editDeleteIngredient={editDeleteIngredient}
              editAddIngredient={editAddIngredient}
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
                <EditableText
                  className="step-description cursor-pointer"
                  isEditable={editingMode}
                  onBlur={(e) =>
                    editInstructions(index, e.currentTarget.innerText)
                  }
                >
                  {instruction}
                </EditableText>
              </div>
            ))}
        </div>

        {editingMode && (
          <>
            <div className="title">
              <h2>add new step</h2>
            </div>
            <div className="information-container">
              <div className="add-step-field-container">
                <div className="label-wrapper">
                  <small>step</small>
                </div>
                <div className="input-wrapper">
                  <input
                    type="text"
                    name="label"
                    id={"label"}
                    onChange={(e) => setNewStep(e.currentTarget.value)}
                  />
                </div>
              </div>

              <div className="add-step-button-wrapper">
                <button onClick={() => editAddStep(newStep)}>
                  <small>add new step</small>
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="content-wrapper">
        <div className="title">
          <h2>chef's note</h2>
          <ListIcon size={30} />
        </div>
        <div className="information-container">
          {recipe && recipe.chefNote ? (
            <EditableText
              isEditable={editingMode}
              onBlur={(e) => editChefNote(e.currentTarget.innerText)}
            >
              {recipe.chefNote}
            </EditableText>
          ) : (
            "Not yet added."
          )}
        </div>
      </div>

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
