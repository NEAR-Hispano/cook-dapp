import { Context } from "near-sdk-as";
import { recipeBooks, recipes, reviews, users } from "./PersistentCollections";
import {
  AccountID,
  MAX_DESCRIPTION_LENGTH,
  MAX_TITLE_LENGTH,
  MIN_DESCRIPTION_LENGTH,
  MIN_TITLE_LENGTH,
  RecipeCategorys,
} from "./utils";
import User from "./models/User";
import RecipeBook from "./models/RecipeBook";
import Recipe from "./models/Recipe";
import Ingridient from "./models/Ingridient";
import Image from "./models/Image";
import Review from "./models/Review";

/**
 * When the user logs in for the first time, a User will be created and stored in the users
 * map collection with the accountID being the key.
 * */

/**
 * Method in charge of getting an User object accepts param accountID which is optional,
 * if provided will check if it exists and return the user or else it will throw with message
 * user not found; If no param is provided will use Context.sender to get the user if it does
 * not exist will create it and return it.
 * @param accountID optional parameter if not provided will use Context.sender.
 * @returns An User object.
 */

export function getUser(accountID: AccountID | null = null): User | null {
  // Check if accountID has been provided and exists.

  if (accountID) {
    // Check if user does not exist with accountID provided, throw with "user not found".

    assert(users.contains(accountID), "User not found.");

    // return user with accountID provided, if it exists.

    return users.get(accountID);
  }
  // Check if accountID has not been provided and user exists.
  else if (!accountID && users.contains(Context.sender)) {
    // return user if it exists
    return users.get(Context.sender);
  }

  // Create the user if it does not exist.
  let newUser = new User(Context.sender);

  // set the new user in the persistent map with the key being the user accountID.
  users.set(Context.sender, newUser);

  // return new user created
  return users.get(Context.sender);
}

/**
 * Method in charge of creating a recipe book.
 * @param title title for the recipe book.
 */

export function createRecipeBook(title: string): RecipeBook {
  assert(title.length > 5, "Recipe book title to short.");

  // Create new recipe book.
  const newRecipeBook = new RecipeBook(Context.sender, title);

  // get user
  const user = getUser();

  if (user) {
    // add recipeBook to user.
    user.addToRecipeBooksCreated(newRecipeBook.id);
    // update user
    users.set(Context.sender, user);
  }

  // add recipeBook to persisten collection
  recipeBooks.set(newRecipeBook.id, newRecipeBook);

  return newRecipeBook;
}

/**
 * Method to get recipe book information.
 * @param id ID of recipe book to get.
 * @returns Recipe book if found, else throws "Not found".
 */

export function getRecipeBook(id: string): RecipeBook {
  return recipeBooks.getSome(id);
}

/**
 * Method to update recipe book information.
 * @param id ID of recipe book to update.
 * @param banner Object with name, cid and url which represents an image.
 * @returns Updated recipe book.
 */

export function updateRecipeBook(
  id: string,
  title: string | null = null,
  banner: Image | null = null
): RecipeBook {
  // Check if recipe exists.
  assert(recipeBooks.contains(id), "Recipe book not found.");

  // Get recipe by id.
  const recipeBook = getRecipeBook(id);

  // Check if creator is the one trying to update else throw error.
  assert(
    recipeBook.creator == Context.sender,
    "Recipe book can only be updated by creator."
  );

  // Check if title was provided and update.
  if (title) {
    recipeBook.setTitle(title);
  }

  // Check if banner was provided and update.
  if (banner) {
    recipeBook.setBanner(banner);
  }

  recipeBooks.set(recipeBook.id, recipeBook);

  return recipeBook;
}

/**
 * Method in charge of deleting a recipe book and all the recipes in it.
 * @param id Represents the ID of recipe book to delete.
 */

export function deleteRecipeBook(id: string): void {
  // Check if recipe book exists.
  assert(recipeBooks.contains(id), "Recipe book not found.");

  // Get recipe book
  const recipeBook = getRecipeBook(id);
  // Get user
  const user = getUser();

  // Check if creator is the one trying to delete else throw error.
  assert(
    recipeBook.creator == Context.sender,
    "Can only be deleted by creator."
  );

  if (recipeBook.recipes.length > 0) {
    // Check if there are recipes and delete them.
    for (let i = 0; i < recipeBook.recipes.length; i++) {
      deleteRecipe(recipeBook.recipes[i]);
    }
  }

  if (user) {
    // Delete recipe book id from recipe books created in user.
    user.removeFromRecipeBooksCreated(recipeBook.id);
    // Update User.
    users.set(Context.sender, user);
  }

  // Delete from collection.
  recipeBooks.delete(recipeBook.id);
}

/**
 * Method in charge of creation of this recipe.
 * @param title Title of the recipe.
 * @param description Description of the recipe.
 * @param ingridientsList items the recipe requires.
 * @param instructions Steps needed for this recipe to be done.
 * @param recipeBookID ID of recipe book this new recipe will belong to.
 * @param category Type of recipe.
 * @param chefNote Helpful note for preparation of recipe.
 */

export function createRecipe(
  title: string,
  description: string,
  ingridientsList: Array<Ingridient>,
  instructions: Array<string>,
  recipeBookID: string,
  category: string,
  chefNote: string
): Recipe {
  // The title of the recipe must be descriptive.
  assert(title.length > MIN_TITLE_LENGTH, "Recipe title to short.");
  // The title of the recipe is to long.
  assert(title.length < MAX_TITLE_LENGTH, "Recipe title to long.");
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
  // check if category is valid.
  assert(
    RecipeCategorys.has(category),
    `Please note this are the valid categories: ${RecipeCategorys.values.toString()}`
  );
  // A recipe must contain more than 1 ingridient.
  assert(ingridientsList.length > 1, "Please add more than 1 ingridient.");
  // Instructions must have more than 2 steps.
  assert(instructions.length > 2, "Please add at least 3 steps.");
  // Check if recipe book exists
  assert(recipeBooks.contains(recipeBookID), "Recipe book not found.");

  // Iniliatize array of Ingridient class.
  const ingridients: Array<Ingridient> = [];

  // Populate ingridients with the list of ingridients as the class Ingridient.
  for (let i = 0; i < ingridientsList.length; i++) {
    ingridients.push(
      new Ingridient(
        ingridientsList[i].label,
        ingridientsList[i].amount,
        ingridientsList[i].unit,
        ingridientsList[i].details
      )
    );
  }

  // Create new recipe:
  const newRecipe = new Recipe(
    Context.sender,
    title,
    description,
    ingridients,
    instructions,
    recipeBookID,
    category,
    chefNote
  );

  // Get user:
  const user = getUser();

  if (user) {
    // add id of recipe created to list of recipesCreated in user.
    user.addToRecipesCreated(newRecipe.id);
    // update user
    users.set(Context.sender, user);
  }

  // get recipe book
  const recipeBook = getRecipeBook(recipeBookID);

  // Check if user created the recipe book
  assert(recipeBook.creator == Context.sender, "You can only create recipes on your own recipe books.")

  if (recipeBook) {
    // add new recipe id to list of recipes in the recipe book.
    recipeBook.addRecipe(newRecipe.id);
    // update recipe book.
    recipeBooks.set(recipeBookID, recipeBook);
  }

  // add new recipe to persistent collection.
  recipes.set(newRecipe.id, newRecipe);

  return newRecipe;
}

/**
 * Method to get recipe information.
 * @param id ID of recipe to get.
 * @returns Recipe if found, else throws "Not found".
 */

export function getRecipe(id: string): Recipe {
  return recipes.getSome(id);
}

/**
 * Method to delete a recipe.
 * @param id ID of recipe to delete.
 */

export function deleteRecipe(id: string): void {
  // Check if recipe exists.
  assert(recipes.contains(id), "Recipe not found.");

  const recipe = getRecipe(id);

  // Check if creator is the one trying to delete else throw error.
  assert(recipe.creator == Context.sender, "Can only be deleted by creator.");

  // Get user
  const user = getUser();

  if (user) {
    // Delete id of recipe from user recipes created.
    user.removeFromRecipesCreated(recipe.id);
    // Update user.
    users.set(Context.sender, user);
  }

  // delete recipe reviews
  if (recipe.reviews.length > 0) {
    for (let i = 0; i < recipe.reviews.length; i++) {
      deleteReview(recipe.reviews[i]);
    }
  }

  // Get recipe book
  const recipeBook = getRecipeBook(recipe.recipeBookID);

  // Delete recipe from recipe book.
  recipeBook.removeRecipe(recipe.id);
  // Update recipe book.
  recipeBooks.set(recipeBook.id, recipeBook);

  // Delete from collection.
  recipes.delete(recipe.id);
}

export function createReview(
  text: string,
  rating: i32,
  recipeID: string
): Review {
  // Check if text is too short
  assert(text.length > MIN_DESCRIPTION_LENGTH, "Review too short.");
  // Check if text is too long
  assert(text.length < MAX_DESCRIPTION_LENGTH, "Review too long.");
  // Check if recipe exists.
  assert(recipes.contains(recipeID), "Recipe not found.");

  const recipe = getRecipe(recipeID);
  const reviewKey = `${Context.sender}-${recipe.id}`;

  assert(
    !recipe.reviews.includes(reviewKey),
    "Users can only review a recipe once."
  );

  const newReview = new Review(Context.sender, text, rating, recipeID);

  recipe.addReview(reviewKey);
  recipe.addRating(rating);
  recipe.updateAverageRating();

  reviews.set(reviewKey, newReview);
  recipes.set(recipeID, recipe);

  return newReview;
}

export function getReview(id: string): Review {
  return reviews.getSome(id);
}

export function getRecipeReviews(id: string): Array<Review> {
  assert(recipes.contains(id), "Recipe not found.");

  let recipe = getRecipe(id);
  let reviewsList: Array<Review> = new Array();

  for (let i = 0; i < recipe.reviews.length; i++) {
    if (getReview(recipe.reviews[i])) {
      reviewsList.push(getReview(recipe.reviews[i]));
    }
  }

  return reviewsList;
}

export function deleteReview(id: string): void {
  const review = getReview(id);
  assert(
    review.creator == Context.sender,
    "Review can only be deleted by creator."
  );
  const reviewKey = `${review.creator}-${review.recipeID}`;

  const recipe = getRecipe(review.recipeID);

  recipe.deleteReview(reviewKey);
  recipe.deleteRating(review.rating);
  recipe.updateAverageRating();
  recipes.set(review.recipeID, recipe);

  reviews.delete(reviewKey);
}
