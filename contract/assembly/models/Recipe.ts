import { logging } from "near-sdk-as";
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
  ratings: Array<i32>;
  averageRating: i32;
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
    (this.chefNote = chefNote), (this.ingredients = ingridients);
    this.instructions = instructions;
    this.reviews = new Set();
    this.ratings = new Array();
    this.averageRating = 0;
    this.totalTips = 0;
    this.createdAt = getCurrentDate();
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
  setTotalTips(totalTips: number): void {
    this.totalTips = totalTips;
  }

  // sets category of recipe
  setCategory(category: string): void {
    this.category = category;
  }

  // sets chefNote for recipe
  setChefNote(chefNote: string): void {
    this.chefNote = chefNote;
  }

  // adds new review
  addReview(reviewID: string, rating: i32): void {
    this.reviews.add(reviewID);
    // adds rating of review
    this.addRating(rating);
  }

  // add new Rating.
  addRating(rating: i32): void {
    this.ratings.push(rating);    
    this.updateAverageRating();
  }

  // updates average raiting.
  updateAverageRating(): void {
    let timesRated = this.ratings.length;
    let ratingTotal = 0;

    for (let i = 0; i < this.ratings.length; i++) {
      ratingTotal = ratingTotal + this.ratings[i];
    }

    this.averageRating = ratingTotal / timesRated;
    logging.log(`ratingTotal: ${ratingTotal}, timesRated: ${timesRated}`)
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

/**
 * 
near call dev-1639457594783-76660970405227 createRecipe '{"title": "Dominican - Mangu", "description": "This recipe helps create the famous platano power dish from Dominican Republic.", "ingridientsList": [{"label": "Banana", "amount": "10", "unit": "pound", "details": "green bananas"}, {"label": "Butter", "amount": "1", "unit": "pound", "details": "Any type."}, {"label": "Onions", "amount": "3", "unit": "pound", "details": "chopped in rings"}], "instructions": ["First crush the bananas", "Add butter", "Serve and enjoy!"], "recipeBookID": "1639457689771839081-74928966", "category": "breakfast", "chefNote":"Feel free to leave a review if you enjoy it!"}' --account-id jgmercedes.testnet
 */
