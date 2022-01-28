import { FC } from "react";
import { userInterface } from "../types";
import RecipesGallery from "./RecipesGallery";

interface Props {
  profile: userInterface | null;
}

const ProfileRecipes: FC<Props> = ({ profile }) => {
  return (
    <div className="profile-recipes">
      {profile && (
        <RecipesGallery recipeIDs={profile.recipesCreated} profile={profile} />
      )}
    </div>
  );
};

export default ProfileRecipes;
