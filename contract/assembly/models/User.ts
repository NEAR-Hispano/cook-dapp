import { AccountID } from "../utils";
import GroceryLists from "./GroceryLists";
import Calendar from "./Calendar";

@nearBindgen
class User {
  accountID: AccountID;
  favoritesRecipes: Set<String>;
  recipesCreated: Array<String>;
  recipeBooksCreated: Array<String>;
  totalTipped: f64;
  calendar: Calendar;
  groceryList: GroceryLists;

  constructor(accountID: AccountID) {
    this.accountID = accountID;
    this.favoritesRecipes = new Set();
    this.recipesCreated = new Array();
    this.recipeBooksCreated = new Array();
    this.totalTipped = 0;
    this.calendar = new Calendar();
    this.groceryList = new GroceryLists();
  }

  // Adds ID of favorite Recipe.
  addToFavoritesRecipes(id: string): void {
    this.favoritesRecipes.add(id);
  }
  // Removes ID of Recipe from favorites.
  removeFromFavoritesRecipes(id: string): void {
    this.favoritesRecipes.delete(id);
  }

  // Adds ID of Recipe created.
  addToRecipesCreated(id: string): void {
    this.recipesCreated.push(id);
  }
  // Adds ID of Recipe Book created.
  addToRecipeBooksCreated(id: string): void {
    this.recipeBooksCreated.push(id);
  }
  // Removes ID of Recipe created when it is deleted.
  removeFromRecipesCreated(id: string): void {
    let index = this.recipesCreated.indexOf(id);
    this.recipesCreated.splice(index, 1);
  }
  // Removes ID of Recipe Book created when it is deleted.
  removeFromRecipeBooksCreated(id: string): void {
    let index = this.recipeBooksCreated.indexOf(id);
    this.recipeBooksCreated.splice(index, 1);
  }
  // Updates total tipped amount.
  setTotalTipped(totalTipped: f64): void {
    this.totalTipped = totalTipped;
  }
}

export default User;
