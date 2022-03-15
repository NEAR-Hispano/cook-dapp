import { AccountID } from "../utils";

@nearBindgen
class User {
  accountID: AccountID;
  favoriteRecipes: Set<string>;
  recipesCreated: Array<string>;
  recipeBooksCreated: Array<string>;
  totalTipped: f64;
  tipsReceived: f64;

  constructor(accountID: AccountID) {
    this.accountID = accountID;
    this.favoriteRecipes = new Set();
    this.recipesCreated = new Array();
    this.recipeBooksCreated = new Array();
    this.totalTipped = 0; 
    this.tipsReceived = 0;
  }

  // Adds ID of favorite Recipe.
  addToFavoriteRecipes(id: string): void {
    this.favoriteRecipes.add(id);
  }
  // Removes ID of Recipe from favorites.
  removeFromFavoritesRecipes(id: string): void {
    this.favoriteRecipes.delete(id);
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
  // Updates total recived tips.
  setTipsRecived(tipsReceived: f64): void {
    this.tipsReceived = tipsReceived;
  }
}

export default User;
