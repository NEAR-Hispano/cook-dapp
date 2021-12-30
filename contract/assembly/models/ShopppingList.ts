import Ingridient from "./Ingridient";

@nearBindgen
class GroceryList {
  label: string;
  ingridients: Array<Ingridient>;
}

@nearBindgen
class RecipeList {
  label: string;
  recipeID: string;
  ingridients: Array<Ingridient>;
}

@nearBindgen
class ShoppingList {
  groceryLists: Array<GroceryList>;
  recipesLists: Array<RecipeList>;

  constructor() {
    this.groceryLists = new Array();
    this.recipesLists = new Array();
  }

  // Sets groceries lists.
  setGroceryLists(lists: Array<GroceryList> | null): void {
    if (lists) this.groceryLists = lists;
  }
  // Sets recipes lists.
  setRecipeLists(lists: Array<RecipeList> | null): void {
    if (lists) this.recipesLists = lists;
  }
}

export { ShoppingList, GroceryList, RecipeList };
