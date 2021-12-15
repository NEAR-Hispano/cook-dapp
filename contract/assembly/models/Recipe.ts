import { AccountID, getCurrentDate, getID } from "../utils";
import Image from "./Image";
import Ingridient from "./Ingridient";

@nearBindgen
class Recipe {
  id: string;
  recipeBookID: string;
  image: Image;
  creator: AccountID;
  category: string;
  title: string;
  description: string;
  chefNote: string;
  ingredients: Array<Ingridient>;
  instructions: Array<string>;
  reviews: Set<String>;
  ratings: Map<string, number>;
  averageRating: number;
  totalTips: number;
  createdAt: string;

  constructor(
    creator: AccountID,
    title: string,
    description: string,
    ingridients: Array<Ingridient>,
    instructions: Array<string>,
    recipeBookID: string,    
    category: string,
    chefNote: string
  ) {
    this.id = getID();
    this.recipeBookID = recipeBookID;
    this.image = new Image("", "", "");
    this.creator = creator;
    this.category = category;
    this.title = title;
    this.description = description;
    this.chefNote = chefNote,
    this.ingredients = ingridients;
    this.instructions = instructions;
    this.reviews = new Set();
    this.ratings = new Map();
    this.averageRating = 0;
    this.totalTips = 0;
    this.createdAt = getCurrentDate()
  }

  // set recipe title
  setTitle(title: string): void {
    this.title = title;
  }

  // sets the recipe image banner.
  setImage(image: Image): void {
    this.image = new Image(image.name, image.cid, image.url);
  }

  // sets the total of tips given to the recipe creator
  setTotalTips(totalTips: number): void{
    this.totalTips = totalTips
  } 

  // sets category of recipe
  setCategory(category: string): void {
    this.category = category;
  }
  
  // sets chefNote for recipe
  setChefNote(chefNote: string): void {
    this.chefNote = chefNote;
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
