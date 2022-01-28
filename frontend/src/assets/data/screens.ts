import HomeScreen from "../../screens/HomeScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import LoginScreen from "../../screens/LoginScreen";
import LandingScreen from "../../screens/LandingScreen";
import ExploreScreen from "../../screens/ExploreScreen";
import { screenInterface } from "../../types";
import CategorieScreen from "../../screens/CategorieScreen";
import RecipeScreen from "../../screens/RecipeScreen";

export const PrivateScreens: Array<screenInterface> = [
  {
    path: "/",
    exact: true,
    Component: HomeScreen,
  },
  {
    path: "/profile/:section/:username",
    exact: false,
    Component: ProfileScreen,
  },
  {
    path: "/profile/:section",
    exact: false,
    Component: ProfileScreen,
  },
  {
    path: "/Explore",
    exact: true,
    Component: ExploreScreen,
  },
  {
    path: "/categories/*",
    exact: false,
    Component: CategorieScreen,
  },
  {
    path: "/recipe/:id/:edit",
    exact: false,
    Component: RecipeScreen,
  },
  {
    path: "/recipe/:id",
    exact: false,
    Component: RecipeScreen,
  },
];

export const PublicScreens = [
  {
    path: "/login",
    exact: true,
    Component: LoginScreen,
  },
  {
    path: "/",
    exact: true,
    Component: LandingScreen,
  },
];
