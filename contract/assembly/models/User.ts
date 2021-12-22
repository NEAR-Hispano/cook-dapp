import { AccountID } from "../utils";
import GroceryList from "./GroceryList";
import Calendar from "./Calendar";

@nearBindgen
class User {
  accountID: AccountID;
  savedRecipes: Array<String>;
  savedRecipeBooks: Array<String>;
  recipesCreated: Array<String>;
  recipeBooksCreated: Array<String>;
  totalTipped: f64;
  calendar: Calendar;
  groceryList: GroceryList;

  constructor(accountID: AccountID) {
    this.accountID = accountID;
    this.savedRecipes = new Array();
    this.savedRecipeBooks = new Array();
    this.recipesCreated = new Array();
    this.recipeBooksCreated = new Array();
    this.totalTipped = 0;
    this.calendar = new Calendar();
    this.groceryList = new GroceryList();
  }

  // Adds ID of saved Recipe.
  addToSavedRecipes(id: string): void {
    this.savedRecipes.push(id);
  }
  // Adds ID of saved Recipe Book.
  addToSavedRecipeBooks(id: string): void {
    this.savedRecipeBooks.push(id);
  }
  // Removes ID of saved Recipe.
  removeFromSavedRecipes(id: string): void {
    let index = this.savedRecipes.indexOf(id);
    this.savedRecipes.splice(index, 1);
  }
  // Removes ID of saved Recipe Book.
  removeFromSavedRecipeBooks(id: string): void {
    let index = this.savedRecipeBooks.indexOf(id);
    this.savedRecipeBooks.splice(index, 1);
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
