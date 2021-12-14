import { PersistentMap } from "near-sdk-as";
import { AccountID, getID } from "../utils";
import Image from "./Image";
import Ingridient from "./Ingridient";

@nearBindgen
class Recipe {
  id: string;
  image: Image;
  creator: AccountID;
  category: string;
  description: string;
  ratings: string;
  averageRating: number;
  title: string;
  recipeBookID: string;
  ingredients: Array<Ingridient>;
  instructions: Array<string>;
  createdAt: string;
  totalTips: number;
  // to be added: reviews && ratings

  constructor(
    creator: AccountID,
    title: string,
    ingridients: Array<Ingridient>,
    instructions: Array<string>,
    recipeBookID: string,
    totalTips: number,
    category: string,
    description: string,
    ratings: string,
    averageRating: number
  ) {
    this.id = getID();
    this.creator = creator;
    this.title = title;
    this.ingredients = ingridients;
    this.instructions = instructions;
    this.image = new Image("", "", "");
    this.recipeBookID = recipeBookID;
    this.totalTips = totalTips;
    this.category = category;
    this.description = description;
    this.ratings = ratings;
    this.averageRating = averageRating;
  }

  // set recipe title
  setTitle(title: string): void {
    this.title = title;
  }

  // sets the recipe image banner.
  setImage(image: Image): void {
    this.image = new Image(image.name, image.cid, image.url);
  }

  // sets the total of tips given to the recipe author
  setTotalTips(totalTips: number): void{
    this.totalTips = totalTips
  } 

  // Adds ingridient to ingridients.
  addIngridient(
    label: string,
    amount: string,
    unit: string,
    details: string
  ): void {
    this.ingredients.push(new Ingridient(label, amount, unit, details));
  }

  // Removes ingridient from ingridients.
  removeIngridient(ingredientID: string): void {
    let index = -1;

    for (let i = 0; i < this.ingredients.length; i++) {
      if (this.ingredients[i].id == ingredientID) index = i;
    }

    assert(index, "Ingredient not found.");

    this.ingredients.splice(index, 1);
  }

  // Adds step to instructions.
  addStep(step: string): void {
    this.instructions.push(step);
  }
  // Removes step from instructions.
  removeStep(step: string): void {
    const index = this.instructions.indexOf(step);
    this.instructions.splice(index, 1);
  }
}


export default Recipe;
