import {
  AccountID,
  getCurrentDate,
  getID,
  MAX_DESCRIPTION_LENGTH,
  MAX_TITLE_LENGTH,
  MIN_DESCRIPTION_LENGTH,
  MIN_TITLE_LENGTH,
  RecipeCategorys,
} from "../utils";
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
  reviews: Array<string>;
  ratings: Array<f64>;
  averageRating: f64;
  totalTips: f64;
  createdAt: string;

  constructor(
    creator: AccountID,
    title: string,
    description: string,
    ingridients: Array<Ingridient>,
    instructions: Array<string>,
    recipeBookID: string,
    category: string,
    chefNote: string,
    image: Image
  ) {
    this.id = getID();
    this.recipeBookID = recipeBookID;
    this.image = image;
    this.creator = creator;
    this.category = category;
    this.title = title;
    this.description = description;
    (this.chefNote = chefNote), (this.ingredients = ingridients);
    this.instructions = instructions;
    this.reviews = new Array();
    this.ratings = new Array();
    this.averageRating = 0;
    this.totalTips = 0;
    this.createdAt = getCurrentDate();
  }

  // set recipe title
  setTitle(title: string | null): void {
    if (title) {
      // The title of the recipe must be descriptive.
      assert(title.length > MIN_TITLE_LENGTH, "Recipe title to short.");
      // The title of the recipe is to long.
      assert(title.length < MAX_TITLE_LENGTH, "Recipe title to long.");
      this.title = title;
    }
  }

  // set recipe description
  setDescription(description: string | null): void {
    if (description) {
      // The description of the recipe must be descriptive.
      assert(
        description.length > MIN_DESCRIPTION_LENGTH,
        "Recipe description to short."
      );
      // The description of the recipe is to long.
      assert(
        description.length < MAX_DESCRIPTION_LENGTH,
        "Recipe description to long."
      );
      this.description = description;
    }
  }

  // sets the recipe image banner.
  setImage(image: Image | null): void {
    if (image) {
      this.image = image;
    }
  }

  // sets the total of tips given to the recipe creator
  setTotalTips(totalTips: number): void {
    this.totalTips = totalTips;
  }

  // sets category of recipe
  setCategory(category: string | null): void {
    if (category) {
      // check if category is valid.
      assert(
        RecipeCategorys.has(category),
        `Please note this are the valid categories: ${RecipeCategorys.values().join(
          ", "
        )}`
      );
      this.category = category;
    }
  }

  // sets chefNote for recipe
  setChefNote(chefNote: string | null): void {
    if (chefNote) {
      // The chef note of the recipe must be descriptive.
      assert(
        chefNote.length > MIN_DESCRIPTION_LENGTH,
        "Recipe chef note to short."
      );
      // The chef note of the recipe is to long.
      assert(
        chefNote.length < MAX_DESCRIPTION_LENGTH,
        "Recipe chef note to long."
      );
      this.chefNote = chefNote;
    }
  }

  // Sets the ingridient list.
  setIngridients(ingridients: Array<Ingridient> | null): void {
    if (ingridients) {
      this.ingredients = ingridients;
    }
  }

  setInstructions(instructions: Array<string> | null): void {
    if (instructions) {
      this.instructions = instructions;
    }
  }

  // adds new review
  addReview(reviewID: string): void {
    this.reviews.push(reviewID);
  }

  // add new Rating.
  addRating(rating: f64): void {
    this.ratings.push(rating);
  }

  // updates average raiting.
  updateAverageRating(): void {
    let timesRated = this.ratings.length;
    let ratingTotal: f64 = 0;

    for (let i = 0; i < this.ratings.length; i++) {
      ratingTotal = ratingTotal + this.ratings[i];
    }

    // Divide if timesRated is not zero.
    if (timesRated === 0 || isNaN(timesRated)) {
      this.averageRating = 0;
    }
    // else return 0 as this.averageRating.
    else {
      this.averageRating = ratingTotal / timesRated;
    }
  }

  // Deleted review ID.
  deleteReview(id: string): void {
    this.reviews.splice(this.reviews.indexOf(id), 1);
  }

  // Deletes rating.
  deleteRating(rating: f64): void {
    this.ratings.splice(this.ratings.indexOf(rating), 1);
  }
}

export default Recipe;
