import { FC } from "react";

export type AccountID = string;

export interface languageInterface {
  code: string;
  name: string;
}

export type iconElement = ({
  size,
}: {
  size?: number | undefined;
}) => JSX.Element;

export interface navLinkInterface {
  label: string;
  path: string;
  Icon: iconElement;
}

export interface screenInterface {
  path: string;
  exact: boolean;
  Component: FC<{}>;
}

export interface Image {
  name: string;
  cid: string;
  url: string;
}

export interface ingridientInterface {
  label: string;
  amount: number;
  unit: string;
  details: string;
}

export interface groceryListInterface {
  label: string;
  ingridients: Array<ingridientInterface>;
}

export interface recipeListInterface {
  label: string;
  recipeID: string;
  ingridients: Array<ingridientInterface>;
}

export interface userInterface {
  accountID: AccountID;
  favoriteRecipes: Set<String>;
  recipesCreated: Array<String>;
  recipeBooksCreated: Array<String>;
  totalTipped: number;
  tipsReceived: number;
}

export interface socialInterface {
  label: string;
  link: string;
}
