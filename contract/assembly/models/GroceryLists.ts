import Ingridient from "./Ingridient";

@nearBindgen
export class GroceryList {
  label: string;
  ingridients: Array<Ingridient>;
  recipeID?: string;
}

@nearBindgen
class GroceryLists {
  lists: Array<GroceryList>;

  constructor() {
    this.lists = new Array();
  }

  setLists(lists: Array<GroceryList> | null): void {
    if (lists) this.lists = lists;
  }
}

export default GroceryLists;
