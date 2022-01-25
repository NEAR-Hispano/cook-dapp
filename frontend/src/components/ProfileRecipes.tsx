import { FC, useEffect, useState } from "react";
import useContract from "../hooks/useContract";
import useUser from "../hooks/useUser";
import { recipeInterface, userInterface } from "../types";
import RecipeTile from "./RecipeTile";

interface Props {
  profile: userInterface | null;
}

const ProfileRecipes: FC<Props> = ({ profile }) => {
  const [user] = useUser();
  const contract = useContract();
  const [recipes, setRecipes] = useState<Array<recipeInterface>>([]);

  useEffect(() => {
    if (contract && profile) {
      contract
        .getUserRecipes({ accountID: profile.accountID })
        .then((recipesList: Array<recipeInterface>) => setRecipes(recipesList));
    }
  }, [profile, contract]);

  return (
    <div className="profile-recipes">
      {recipes && recipes.map(recipe => (
        <RecipeTile recipe={recipe} />
      ))}
    </div>
  );
};

export default ProfileRecipes;
