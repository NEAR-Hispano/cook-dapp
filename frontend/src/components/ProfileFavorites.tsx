import { FC } from "react";
import { userInterface } from "../types";
import RecipesGallery from "./RecipesGallery";
import { v4 as uuid } from "uuid";

interface Props {
  profile: userInterface | null;
}

const ProfileFavorites: FC<Props> = ({ profile }) => {  
  return (
    <div className="profile-favorite-recipes">
      {profile && (
        <RecipesGallery
          key={uuid()}
          recipeIDs={profile.favoriteRecipes}
        />
      )}
    </div>
  );
};

export default ProfileFavorites;
