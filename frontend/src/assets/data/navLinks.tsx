import { navLinkInterface } from "../../types";
import AppIcon from "../svg/AppIcon";
import ExploreIcon from "../svg/ExploreIcon";
import HomeIcon from "../svg/HomeIcon";
import ProfileIcon from "../svg/ProfileIcon";

export const privateLinks: Array<navLinkInterface> = [
  {
    label: "home",
    path: "/",
    Icon: HomeIcon
  },
  {
    label: "profile",
    path: "/profile",
    Icon: ProfileIcon
  },
  {
    label: "explore",
    path: "/explore",
    Icon: ExploreIcon
  },
];

export const publicLinks: Array<navLinkInterface> = [
  {
    label: "app",
    path: "/login",
    Icon: AppIcon
  }
];