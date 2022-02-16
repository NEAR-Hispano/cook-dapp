import { FC, useEffect, useState } from "react";
import EditIcon from "../assets/svg/EditIcon";
import ListIcon from "../assets/svg/ListIcon";
import TrashIcon from "../assets/svg/TrashIcon";
import EditableText from "../components/EditableText";
import IngredientsTable from "../components/IngredientsTable";
import useContract from "../hooks/useContract";
import { Rating as RatingStars } from "react-simple-star-rating";
import {
  imageInterface,
  ingredientInterface,
  recipeBookInterface,
  recipeCategories,
  recipeInterface,
} from "../types";
import useUser from "../hooks/useUser";
import useCopyToClipboard from "../hooks/useCopyToClipboard";
import ImageUploadIcon from "../assets/svg/ImageUploadIcon";
import TextIcon from "../assets/svg/TextIcon";
import PlusIcon from "../assets/svg/PlusIcon";
import uploadImage from "../utils/uploadImage";
import { v4 as uuid } from "uuid";
import ArrowLeft from "../assets/svg/ArrowLeft";
import ArrowRight from "../assets/svg/ArrowRight";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import contractErrorHandler from "../utils/contractErrorHandler";

interface Props {}

const CreateRecipeScreen: FC<Props> = () => {
  const [user] = useUser();
  const navigate = useNavigate();
  const contract = useContract();
  const [_, copy] = useCopyToClipboard();
  const [userRecipeBooks, setUserRecipeBooks] =
    useState<Array<recipeBookInterface> | null>(null);
  const [recipeBookID, setRecipeBookID] = useState<string | null>(null);
  const [image, setImage] = useState<imageInterface | null>(null);
  const [category, setCategory] = useState<string>("");
  const [title, setTitle] = useState<string>("Click to edit title");
  const [description, setDescription] = useState<string>(
    "Click to edit description, make sure to leave every detail clear for those who rely on your recipe!"
  );
  const [chefNote, setChefNote] = useState<string>(
    "Click to edit, here you can be spotaneous!"
  );
  const [ingredients, setIngredients] = useState<Array<ingredientInterface>>(
    []
  );
  const [instructions, setInstructions] = useState<Array<string>>([]);
  const [resetChangesID, setResetChangesID] = useState<string>("");

  useEffect(() => {
    if (contract && user && !userRecipeBooks) {
      contract
        .getUserRecipeBooks({ accountID: user.accountID })
        .then((recipeBooks: Array<recipeBookInterface>) =>
          setUserRecipeBooks(recipeBooks)
        );
    }
  }, [user, contract, userRecipeBooks]);

  function createRecipe() {
    if (contract && recipeBookID && image) {
      toast("Creating recipe...", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      let ingridientsList = ingredients;
      ingridientsList = ingridientsList.map((ingridient) => {
        const amount = parseInt(String(ingridient.amount));
        const updatedIngridient = { ...ingridient, amount };
        return updatedIngridient;
      });
      contract
        .createRecipe({
          recipeBookID,
          category,
          title,
          description,
          chefNote,
          ingridientsList,
          instructions,
          image,
        })
        .then((recipe: recipeInterface) => {
          toast("Recipe created.", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            navigate(`/recipe/${recipe.id}`);
          }, 3000);
        })
        .catch((error: Error) => {
          contractErrorHandler(error)
        });
    }
  }

  // Ingredients
  function editIngridientLabel(index: number, label: string) {
    const editedIngredients = ingredients;
    const editedIngredient = ingredients[index];
    editedIngredient.label = label;
    editedIngredients[index] = editedIngredient;
    setIngredients(editedIngredients);
    resetChanges();
  }
  function editIngridientAmount(index: number, amount: string) {
    const editedIngredients = ingredients;
    const editedIngredient = ingredients[index];
    editedIngredient.amount = amount;
    editedIngredients[index] = editedIngredient;
    setIngredients(editedIngredients);
    resetChanges();
  }
  function editIngridientUnit(index: number, unit: string) {
    const editedIngredients = ingredients;
    const editedIngredient = ingredients[index];
    editedIngredient.unit = unit;
    editedIngredients[index] = editedIngredient;
    setIngredients(editedIngredients);
    resetChanges();
  }
  function editIngridientDetails(index: number, details: string) {
    const editedIngredients = ingredients;
    const editedIngredient = ingredients[index];
    editedIngredient.details = details;
    editedIngredients[index] = editedIngredient;
    setIngredients(editedIngredients);
    resetChanges();
  }

  function editDeleteIngredient(index: number) {
    const editedIngredients = ingredients;
    editedIngredients.splice(index, 1);
    setIngredients(editedIngredients);
    resetChanges();
  }

  function editAddIngredient(
    label: string,
    amount: string,
    unit: string,
    details: string
  ) {
    const editedIngredients = ingredients;
    editedIngredients.push({ label, amount, unit, details });
    setIngredients(editedIngredients);
    resetChanges();
  }

  // Instructions
  const [newStep, setNewStep] = useState<string | null>(null);

  function editStep(index: number, label: string) {
    const editedInstructions = instructions;
    editedInstructions[index] = label;
    setInstructions(instructions);
    resetChanges();
  }

  function editDeleteStep(index: number) {
    const editedInstructions = instructions;
    editedInstructions.splice(index, 1);
    setInstructions(instructions);
    resetChanges();
  }

  function editAddStep() {
    if (newStep) {
      const editedInstructions = instructions;
      editedInstructions.push(newStep);
      setInstructions(editedInstructions);
      resetChanges();
    }
  }

  // Image
  async function editUpdateImage(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e && e.target && e.target.files && e.target.files[0]) {
      let file = e.target.files[0];
      uploadImage({ file }).then((newImage) => {
        if (newImage) {
          setImage(newImage);
          resetChanges();
        }
      });
    }
  }

  // Utils
  function resetChanges() {
    setResetChangesID(uuid());
  }

  function copyAccountID() {
    if (user) {
      copy(user.accountID);
    }
  }

  return (
    <div className="create-recipe-screen-container" key={resetChangesID}>
      <div className="create-recipe-button-wrapper">
        <div className="create-recipe-button">
          create
          <div
            className="create-recipe-icon-wrapper"
            onClick={() => createRecipe()}
          >
            <ArrowRight size={25} />
          </div>
        </div>
      </div>

      <div className="recipe-banner">
        <div className="title">
          <EditableText
            onBlur={(e) => setTitle(e.currentTarget.innerText)}
            isEditable={true}
          >
            {title}
          </EditableText>
        </div>

        <div className="summary-info">
          <div className="reviews-quantity-wrapper">
            <small>reviews 0</small>
          </div>

          <div className="ingridients-quantity-wrapper">
            <small>ingredients {ingredients && ingredients.length}</small>
          </div>

          <div className="rating-stars-wrapper">
            <small>
              <RatingStars
                ratingValue={0}
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

      <div className="create-recipe-selectors-wrapper">
        <select
          name="recipe book id"
          id="cars"
          required
          onChange={(e) => setRecipeBookID(e.target.value)}
        >
          <option className="select-label" value="" disabled selected>
            select recipe book
          </option>
          {userRecipeBooks &&
            userRecipeBooks.map((recipeBook: recipeBookInterface) => (
              <option value={recipeBook.id}>
                {recipeBook.title.toLocaleLowerCase()}
              </option>
            ))}
        </select>

        <select
          name="cars"
          id="cars"
          required
          onChange={(e) => setCategory(e.target.value)}
        >
          <option className="select-label" value="" disabled selected>
            select recipe category
          </option>
          {recipeCategories.map((category) => (
            <option value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="image-wrapper">
        <img
          src={(image && image.url) || ""}
          alt={(image && image.name) || ""}
        />

        {!image && (
          <label className="edit-icon-container" htmlFor="updated-banner-image">
            <ImageUploadIcon size={20} />
            <input
              onChange={(e) => editUpdateImage(e)}
              type="file"
              id="updated-banner-image"
              accept="image/x-png, image/gif, image/jpeg"
            />
          </label>
        )}
      </div>

      <div className="user-description-wrapper">
        <div className="description-title">
          <h2>description</h2>
          <TextIcon size={30} />
        </div>
        <div className="description-container">
          <EditableText
            onBlur={(e) => setDescription(e.currentTarget.innerText)}
            isEditable={true}
          >
            {description && description}
          </EditableText>
        </div>
      </div>

      <div className="content-wrapper">
        <div className="title">
          <h2>ingredients</h2>
          <ListIcon size={30} />
        </div>
        <div className="information-container">
          <IngredientsTable
            editingMode={true}
            ingredientsList={ingredients}
            editIngridientLabel={editIngridientLabel}
            editIngridientAmount={editIngridientAmount}
            editIngridientUnit={editIngridientUnit}
            editIngridientDetails={editIngridientDetails}
            editDeleteIngredient={editDeleteIngredient}
            editAddIngredient={editAddIngredient}
          />
        </div>
      </div>

      <div className="content-wrapper">
        <div className="title">
          <h2>instructions</h2>
          <ListIcon size={30} />
        </div>
        <div className="information-container">
          {instructions &&
            instructions.map((instruction, index) => (
              <div className="step-container">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    marginBottom: "15px",
                  }}
                >
                  <div className="step-label-information">
                    <div className="step-label">step</div>
                    <div className="step-number">{index + 1}</div>
                  </div>

                  <div
                    className="delete-step-icon-wrapper cursor-pointer"
                    style={{ marginLeft: "10px" }}
                    onClick={() => editDeleteStep(index)}
                  >
                    <TrashIcon size={20} />
                  </div>
                </div>
                <EditableText
                  className="step-description cursor-pointer"
                  isEditable={true}
                  onBlur={(e) => editStep(index, e.currentTarget.innerText)}
                >
                  {instruction}
                </EditableText>
              </div>
            ))}
        </div>

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
              <button onClick={() => editAddStep()}>
                <small>add new step</small>
              </button>
            </div>
          </div>
        </>
      </div>

      <div className="content-wrapper">
        <div className="title">
          <h2>chef's note</h2>
          <ListIcon size={30} />
        </div>
        <div className="information-container">
          {chefNote ? (
            <EditableText
              isEditable={true}
              onBlur={(e) => setChefNote(e.currentTarget.innerText)}
            >
              {chefNote && chefNote}
            </EditableText>
          ) : (
            "Not yet added."
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateRecipeScreen;
