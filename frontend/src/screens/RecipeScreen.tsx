import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useContract from "../hooks/useContract";
import useUser from "../hooks/useUser";
import { recipeInterface } from "../types";
import { Rating as RatingStars } from "react-simple-star-rating";
import useTranslator from "../hooks/useTranslator";
import useCopyToClipboard from "../hooks/useCopyToClipboard";
import IngredientsTable from "../components/IngredientsTable";
import ListIcon from "../assets/svg/ListIcon";
import TextIcon from "../assets/svg/TextIcon";
import Review from "../components/Review";

interface Props {}

const RecipeScreen: FC<Props> = () => {
  const [editingMode, setEditingMode] = useState<boolean>(false);
  const [recipe, setRecipe] = useState<recipeInterface | null>();
  const { id, edit } = useParams();
  const [user] = useUser();
  const contract = useContract();
  const translate = useTranslator();
  const [_, copy] = useCopyToClipboard();

  const checkIsEditing = () => {
    return Boolean(
      edit === "edit" && user && id && user.recipesCreated.includes(id)
    );
  };

  function copyAccountID() {
    if (recipe) copy(recipe.creator);
  }

  const getRecipe = async () => {
    if (contract && id) {
      setRecipe(await contract.getRecipe({ id }));
    }
  };

  useEffect(() => {
    setEditingMode(checkIsEditing());
  }, [user, id, edit]);

  useEffect(() => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
    getRecipe();
  }, []);

  return (
    <div className="recipe-screen-container">
      <div className="recipe-banner">
        <div className="title">
          <h1>{recipe && recipe.title}</h1>
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
          <p>{recipe && recipe.description}</p>
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
