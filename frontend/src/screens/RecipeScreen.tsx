import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useContract from "../hooks/useContract";
import useUser from "../hooks/useUser";
import { recipeInterface } from "../types";
import { Rating as RatingStars } from "react-simple-star-rating";
import useTranslator from "../hooks/useTranslator";

interface Props {}

const RecipeScreen: FC<Props> = () => {
  const [editingMode, setEditingMode] = useState<boolean>(false);
  const [recipe, setRecipe] = useState<recipeInterface | null>();
  const { id, edit } = useParams();
  const [user] = useUser();
  const contract = useContract();
  const translate = useTranslator();

  const checkIsEditing = () => {
    return Boolean(
      edit === "edit" && user && id && user.recipesCreated.includes(id)
    );
  };

  const getRecipe = async () => {
    if (contract && id) {
      setRecipe(await contract.getRecipe({ id }));
    }
  };

  useEffect(() => {
    setEditingMode(checkIsEditing());
  }, [user, id, edit]);

  useEffect(() => {
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

      <div className="recipe-image-user-description-wrapper">
        <div className="image-wrapper">
          <img
            src={(recipe && recipe.image.url) || ""}
            alt={(recipe && recipe.image.name) || ""}
          />
        </div>

        <div className="user-description-wrapper">
          <div className="creator-account-wrapper">
            <div className="circle-letter-wrapper">
              {recipe && recipe.creator.split("")[0]}
            </div>
            <small>{recipe && recipe.creator}</small>
          </div>
          <div className="description-container">
            <p>{recipe && recipe.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeScreen;
