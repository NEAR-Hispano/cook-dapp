import { Context, ContractPromiseBatch, u128 } from "near-sdk-as";
import {
  shoppingLists,
  recipeBooks,
  recipes,
  reviews,
  users,
} from "./PersistentCollections";
import {
  AccountID,
  Amount,
  getCurrentDate,
  mapRating,
  MAX_DESCRIPTION_LENGTH,
  MAX_TITLE_LENGTH,
  MIN_DESCRIPTION_LENGTH,
  MIN_TITLE_LENGTH,
  nearToF64,
  RecipeCategorys,
} from "./utils";
import User from "./models/User";
import RecipeBook from "./models/RecipeBook";
import Recipe from "./models/Recipe";
import Ingridient from "./models/Ingridient";
import Image from "./models/Image";
import Review from "./models/Review";
import { ShoppingList, RecipeList, GroceryList } from "./models/ShopppingList";

/**
 * When the user logs in for the first time, a User will be created and stored in the users
 * map collection with the accountID being the key.
 * */

/**
 * Method in charge of getting an User object accepts param accountID which is optional,
 * if provided will check if it exists and return the user or else it will throw with message
 * user not found; If no param is provided will use Context.sender to get the user if it does
 * not exist will create it, and return it.
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

  // Create the user as it wasn't found.
  createUser();

  // return new user created
  return users.get(Context.sender);
}

/**
 * Method that creates the user and initializes tools they will use such as their grocery list.
 * @returns
 */

function createUser(): void {
  // Create the user.
  let newUser = new User(Context.sender);
  // Create the user grocery list.
  let userGroceryList = new ShoppingList();

  // set the new user in the persistent map with the key being the user accountID.
  users.set(Context.sender, newUser);

  // Create user grocery list.
  shoppingLists.set(Context.sender, userGroceryList);
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
    `Please note this are the valid categories: ${RecipeCategorys.values().join(
      ", "
    )}`
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
  assert(
    recipeBook.creator == Context.sender,
    "You can only create recipes on your own recipe books."
  );

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
 * Method that updates recipe
 * @param id ID of recipe to update.
 * @param image Image to set recipe with.
 * @param category Category to set recipe with.
 * @param title Title to set recipe with.
 * @param description Description to set recipe with.
 * @param chefNote Chef note to set recipe with.
 * @param ingridients New ingridients to add to recipe.
 * @param instructions New steps to add to recipe.
 * @returns Updated Recipe.
 */

export function updateRecipe(
  id: string,
  category: string | null = null,
  title: string | null = null,
  description: string | null = null,
  chefNote: string | null = null,
  image: Image | null = null,
  ingridients: Array<Ingridient> | null = null,
  instructions: Array<string> | null = null
): Recipe {
  // Check that recipe exists.
  assert(recipes.contains(id), "Recipe not found.");
  // Get recipe.
  const recipe = getRecipe(id);
  // Check if the creator is the one calling the function.
  assert(
    recipe.creator == Context.sender,
    "Recipe can only be updated by recipe creator."
  );
  // Update Image
  recipe.setImage(image);
  // Update Category
  recipe.setCategory(category);
  // Update title
  recipe.setTitle(title);
  // Update description
  recipe.setDescription(description);
  // Update chef note
  recipe.setChefNote(chefNote);
  // Update ingridient list
  recipe.setIngridients(ingridients);
  // Update instructions
  recipe.setInstructions(instructions);
  // Update persistent collection.
  recipes.set(recipe.id, recipe);
  return recipe;
}

/**
 *  Method that allows a user to tip the creator of another user.
 * @param recipeID Recipe id in order to send the deposit attached to recipe creator and update information of recipe.
 */

export function tipRecipe(recipeID: string): void {
  // Check that recipe ID is valid and recipe exists.
  assert(recipes.contains(recipeID), "Recipe not found.");

  // Check that user tipping exists.
  assert(
    users.contains(Context.sender),
    "Please register as a user with the method getUser or login to DApp."
  );

  // Get amount of NEAR for the recipe tip.
  const amount: Amount = Context.attachedDeposit;

  // Check if tip amount is greater than zero.
  assert(amount > u128.Zero, "Tip amount must be greater than zero.");

  // Get Recipe
  const recipe = getRecipe(recipeID);

  // Process transaction to recipe creator.
  ContractPromiseBatch.create(recipe.creator).transfer(amount);

  // Update recipe totalTips
  recipe.setTotalTips(f64.add(recipe.totalTips, nearToF64(amount)));

  // Get user that is tipping.
  const userTipping = getUser();

  // Get user being tipped.
  const userBeingTipped = getUser(recipe.creator);

  // Increment Creator of recipe tips recived.
  if(userBeingTipped) {
    // Update user total tips recived .
    userBeingTipped.setTipsRecived(f64.add(userBeingTipped.tipsReceived, nearToF64(amount)));
    // Update user in persistent collection.
    users.set(recipe.creator, userBeingTipped);
  }

  // Updated total tipped by user.
  if (userTipping) {
    userTipping.setTotalTipped(
      f64.add(userTipping.totalTipped, nearToF64(amount))
    );
    // Update user in persistent collection.
    users.set(Context.sender, userTipping);
  }

  // Update recipe.
  recipes.set(recipe.id, recipe);
}

/**
 * Method to get all recipes created.
 * @returns Array of all recipes created.
 */

export function getRecipes(): Array<Recipe> {
  //Get all the keys the recipes are stored with.
  const keys = recipes.keys();
  //Initialize var that will hold list of recipes.
  const list = new Array<Recipe>();

  for (let i = 0; i < keys.length; i++) {
    // loop through the keys, get and push each recipe the key is holding as pair.
    list.push(getRecipe(keys[i]));
  }

  // return list or recipes created.
  return list;
}

/**
 * Method that returns the most trending recipes in current month.
 * @returns Sorted list of recipes by the highest ratings in current month.
 */

export function getTrendingRecipes(): Array<Recipe> {
  // Get list of all recipes.
  const allRecipes = getRecipes();
  // List of recipes created in current month.
  const validRecipes: Array<Recipe> = new Array();

  // Pushes recipes which were created in current month to validRecipes.
  for (let i = 0; i < allRecipes.length; i++) {
    // Month current recipe was created.
    const recipeCreatedMonth = Date.parse(
      allRecipes[i].createdAt
    ).getUTCMonth();
    // Current month.
    const currentMonth = Date.parse(getCurrentDate()).getUTCMonth();

    // Skip recipe which were not created in current month.
    if (recipeCreatedMonth !== currentMonth) continue;
    // Push recipes created in current month.
    validRecipes.push(allRecipes[i]);
  }

  // Return sorted valid recipes which are created on current month sorted by avarege rating.
  return validRecipes.sort(
    (aRecipe, bRecipe) =>
      <i32>bRecipe.averageRating - <i32>aRecipe.averageRating
  );
}

/**
 * Method that gets list of most tiped recipes.
 * @returns Recipes list sorted by the most tiped ones.
 */
export function getMostTipedRecipes(): Array<Recipe> {
  // Gets list of recipes with getRecipes() than returns sorted array by the amount of tips.
  return getRecipes().sort(
    (aRecipe, bRecipe) => <i32>bRecipe.totalTips - <i32>aRecipe.totalTips
  );
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

/**
 * Method to create a Review.
 * @param text Text of the review.
 * @param rating Rating to put in the review.
 * @param recipeID ID of the review.
 */

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
  // Check that rating is greater or equal to 1 and equal or lesser than 10.
  assert(rating > 0 && rating < 11, "Rating must range beetwen 1 through 10.");

  //Get reference from the recipe its being reviewed.
  const recipe = getRecipe(recipeID);
  //Defines the reviewKey.
  const reviewKey = `${Context.sender}-${recipe.id}`;

  //Check if the user has already reviewed the current recipe.
  assert(
    !recipe.reviews.includes(reviewKey),
    "Users can only review a recipe once."
  );

  //Create new review
  const newReview = new Review(
    Context.sender,
    text,
    mapRating(<f64>rating),
    recipeID
  );

  //Add review to the current recipe.
  recipe.addReview(reviewKey);
  //Add rating to the current recipe.
  recipe.addRating(mapRating(<f64>rating));
  //Update current AverageRating of the recipe.
  recipe.updateAverageRating();

  //Set Maps
  reviews.set(reviewKey, newReview);
  recipes.set(recipeID, recipe);

  return newReview;
}

/**
 * Method to get a Review.
 * @param id ID of the review to get.
 */

export function getReview(id: string): Review {
  return reviews.getSome(id);
}

/**
 * Method that updates a review.
 * @param id Review id to update.
 * @param text New review text.
 * @param rating New review rating
 * @returns Updated Review.
 */

export function updateReview(id: string, text: string, rating: i32): Review {
  assert(reviews.contains(id), "Review not found.");
  // Check if text is too short
  assert(text.length > MIN_DESCRIPTION_LENGTH, "Review too short.");
  // Check if text is too long
  assert(text.length < MAX_DESCRIPTION_LENGTH, "Review too long.");

  const review = getReview(id);
  const recipe = getRecipe(review.recipeID);

  // Check if creator is the one updating.
  assert(
    review.creator == Context.sender,
    "Review can only be updated by creator."
  );

  // Delete old rating from recipe.
  recipe.deleteRating(review.rating);

  // Update review
  review.setText(text);
  review.setRating(mapRating(<f64>rating));

  // Update new rating from review
  recipe.addRating(review.rating);
  recipe.updateAverageRating();  

  // Update persistent collections.
  reviews.set(`${Context.sender}-${review.recipeID}`, review);
  recipes.set(recipe.id, recipe);

  return review;
}

/**
 * Method to get the all the reviews from a recipe.
 * @param id ID of the recipe to ge the reviews from.
 */

export function getRecipeReviews(id: string): Array<Review> {
  assert(recipes.contains(id), "Recipe not found.");

  // get recipe from the id.
  let recipe = getRecipe(id);
  // Set a reviewList to store the reviews of the current recipe.
  let reviewsList: Array<Review> = new Array();

  // Get all the reviews saved in the recipe by their ids.
  for (let i = 0; i < recipe.reviews.length; i++) {
    if (getReview(recipe.reviews[i])) {
      reviewsList.push(getReview(recipe.reviews[i]));
    }
  }

  return reviewsList;
}

/**
 * Method to delete a Review.
 * @param id ID of the review to delete.
 */

export function deleteReview(id: string): void {
  // check if review exists.
  assert(reviews.contains(id), "Review not found.");
  //Get review from id
  const review = getReview(id);
  //Check if the user who wants to delete the review is the author of it
  assert(
    review.creator == Context.sender,
    "Review can only be deleted by creator."
  );
  //Set the reviewKey
  const reviewKey = `${review.creator}-${review.recipeID}`;

  //Set recipe by ID
  const recipe = getRecipe(review.recipeID);

  //Deletes Review from recipe.
  recipe.deleteReview(reviewKey);
  //Deletes Rating from recipe.
  recipe.deleteRating(review.rating);
  //Updates the Average Rating of the recipe.
  recipe.updateAverageRating();
  //Update recipes map
  recipes.set(review.recipeID, recipe);

  //Deletes the review
  reviews.delete(reviewKey);
}

/**
 * Method that gets and returns User ShoppingList.
 * @returns User ShoppingList
 */
export function getShoppingList(): ShoppingList {
  return shoppingLists.getSome(Context.sender);
}

/**
 * Method that updates the User GroceryList in ShoppingList.
 * @param lists List of ingridients the User ShoppingList - GroceryList will be populated with.
 */
export function updateGroceryList(lists: Array<GroceryList>): void {
  const shoppingList = shoppingLists.getSome(Context.sender);
  shoppingList.setGroceryLists(lists);
  shoppingLists.set(Context.sender, shoppingList);
}

/**
 * Method that updates the User RecipeList in ShoppingList.
 * @param lists List of ingridients the User ShoppingList - RecipeList will be populated with.
 */
export function updateRecipeList(lists: Array<RecipeList>): void {
  const shoppingList = shoppingLists.getSome(Context.sender);
  shoppingList.setRecipeLists(lists);
  shoppingLists.set(Context.sender, shoppingList);
}

/**
 * Method that creates a dedicated list of recipe ingridients and adds it to the User ShoppingList.
 * @param recipeID ID of recipe which Ingridients will be added to a dedicated list in the user shopping list.
 */
export function addRecipeList(recipeID: string): void {
  const shoppingList = shoppingLists.getSome(Context.sender);
  const recipe = getRecipe(recipeID);
  const recipeList: RecipeList = new RecipeList();

  recipeList.label = recipe.title;
  recipeList.recipeID = recipe.id;
  recipeList.ingridients = recipe.ingredients;

  shoppingList.recipesLists.push(recipeList);
  shoppingLists.set(Context.sender, shoppingList);
}

/**
 * Method that adds a recipe id to the users list of favorite recipes.
 * @param recipeID ID of recipe to be added to the User favoriteRecipes.
 */
export function addFavoriteRecipe(recipeID: string): void {
  const user = getUser();
  if (user) {
    user.addToFavoriteRecipes(recipeID);
    users.set(Context.sender, user);
  }
}
