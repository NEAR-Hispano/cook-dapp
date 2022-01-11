import HomeScreen from "../../screens/HomeScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import LoginScreen from "../../screens/LoginScreen";
import LandingScreen from "../../screens/LandingScreen";
import ExploreScreen from "../../screens/ExploreScreen.js";

export const PrivateScreens = [
  {
    path: "/",
    exact: true,
    Component: HomeScreen,
  },
  {
    path: "/Profile",
    exact: true,
    Component: ProfileScreen,
  },
  {
    path: "/Explore",
    exact: true,
    Component: ExploreScreen,
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
