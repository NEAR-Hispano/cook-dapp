import ProfileBooks from "../../components/ProfileBooks";
import ProfileFavorites from "../../components/ProfileFavorites";
import ProfileRecipes from "../../components/ProfileRecipes";

const profileTabs = [
  {
    label: "books",
    Component: ProfileBooks,
  },
  {
    label: "recipes",
    Component: ProfileRecipes,
  },
  {
    label: "favorites",
    Component: ProfileFavorites,
  },
  {
    label: "book",
    Component: ProfileBooks,
  },
];

export default profileTabs