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

export interface imageInterface {
  name: string;
  cid: string;
  url: string;
}

export interface ingredientInterface {
  label: string;
  amount: number | string;
  unit: string;
  details: string;
}

export interface groceryListInterface {
  label: string;
  ingridients: Array<ingredientInterface>;
}

export interface recipeListInterface {
  label: string;
  recipeID: string;
  ingridients: Array<ingredientInterface>;
}

export interface userInterface {
  accountID: AccountID;
  favoriteRecipes: Array<string>;
  recipesCreated: Array<string>;
  recipeBooksCreated: Array<string>;
  totalTipped: number;
  tipsReceived: number;
}

export interface socialInterface {
  label: string;
  link: string;
}

export interface reviewInterface {
  id: string;
  creator: AccountID;
  text: string;
  rating: number;
  recipeID: string;
  createdAt: string;
}

export interface recipeInterface {
  id: string;
  recipeBookID: string;
  image: imageInterface;
  creator: AccountID;
  category: string;
  title: string;
  description: string;
  chefNote: string;
  ingredients: Array<ingredientInterface>;
  instructions: Array<string>;
  reviews: Array<string>;
  ratings: Array<number>;
  averageRating: number;
  totalTips: number;
  createdAt: string;
}

export interface recipeBookInterface {
  id: string;
  creator: AccountID;
  title: string;
  banner: imageInterface;
  recipes: Array<string>;
}

export type RecipeCategory =
  | "dinner"
  | "breakfast"
  | "lunch"
  | "dessert"
  | "snacks";
  
export const recipeCategories = [
  "dinner",
  "breakfast",
  "lunch",
  "dessert",
  "snacks",
];
