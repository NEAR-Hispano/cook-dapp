import { PersistentUnorderedMap } from "near-sdk-core";
import { AccountID } from "./utils";
import User from "./models/User";
import RecipeBook from "./models/RecipeBook";
import Recipe from "./models/Recipe";
import Review from "./models/Review";
import { ShoppingList } from "./models/ShoppingList";

/**
 * This file contains collection of variables which will store data 
 * persistently through the Storage object of near-sdk-as.
 */

const users = new PersistentUnorderedMap<AccountID, User>("users");
const recipeBooks = new PersistentUnorderedMap<AccountID, RecipeBook>("recipeBooks");
const recipes = new PersistentUnorderedMap<string, Recipe>("recipes");
const reviews = new PersistentUnorderedMap<string, Review>("reviews");
const shoppingLists = new PersistentUnorderedMap<AccountID, ShoppingList>("shopping-lists");

export { users, recipeBooks, recipes, reviews, shoppingLists };
