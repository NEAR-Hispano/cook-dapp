import { FC, useEffect, useState } from "react";
import useContract from "../hooks/useContract";
import useUser from "../hooks/useUser";
import { recipeInterface, userInterface } from "../types";
import RecipeTile from "./RecipeTile";

interface Props {
  profile: userInterface | null;
}

const ProfileFavorites: FC<Props> = ({ profile }) => {
  const [user] = useUser();
  const contract = useContract();
  const [favoriteRecipes, setFavoriteRecipes] = useState<
    Array<recipeInterface>
  >([]);

  useEffect(() => {
    if (contract && profile && user) {
      for (let i = 0; i < Array.from(profile.favoriteRecipes).length; i++) {
        contract
          .getRecipe({ id: Array.from(profile.favoriteRecipes)[i] })
          .then((recipe: recipeInterface) =>
            setFavoriteRecipes([...favoriteRecipes, recipe])
          );
      }
    }
  }, [profile, contract, user]);

  return (
    <div className="profile-favorite-recipes">
      {favoriteRecipes && favoriteRecipes.map((recipe) => <RecipeTile recipe={recipe} />)}
    </div>
  );
};

export default ProfileFavorites;
