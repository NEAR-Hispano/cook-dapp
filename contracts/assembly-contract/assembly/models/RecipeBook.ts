import { AccountID, getID } from "../utils";
import Image from "./Image";

@nearBindgen
class RecipeBook {
  id: string;
  creator: AccountID;
  title: string;
  banner: Image;
  recipes: Array<string>;

  constructor(accountID: string, title: string) {
    this.id = getID();
    this.creator = accountID;
    this.title = title;
    this.banner = {
      name: "",
      cid: "",
      url: "",
    };
    this.recipes = new Array();
  }

  // set title.
  setTitle(title: string): void {
    this.title = title;
  }
  // set banner.
  setBanner(banner: Image): void {
    this.banner = banner;
  }

  // add recipe to book.
  addRecipe(id: string): void {
    this.recipes.push(id);
  }

  // remove recipe from book.
  removeRecipe(id: string): void {
    let index = this.recipes.indexOf(id);
    this.recipes.splice(index, 1);
  }
}

export default RecipeBook;
