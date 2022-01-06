import LoginScreen from "../../screens/LoginScreen";
import HomeScreen from "../../screens/HomeScreen";

const screens = [
  {
    path: "/login",
    exact: true,
    Component: LoginScreen,
  },
  {
    path: "/",
    exact: true,
    Component: HomeScreen,
  },
];

export default screens;
