import { utils } from "near-api-js";

// Gas.
const gas = 300000000000000;

// Choose smart contract to use, options are AS = Assemblyscript | RUST = Rust.
let CONTRACT_LANG = "AS";

const InvalidContractLangError = new Error(
  "Please choose a valid contract language, it should be either RUST or AS."
);

const getContract = () => {
  if (process.env.NODE_ENV === "production") CONTRACT_LANG = "RUST";
  return new Contract();
};

class Contract {
  getUser({ accountID = null }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return window.contract.getUser(accountID);
      case "RUST":
        return window.contract.get_user(accountID);
      default:
        throw InvalidContractLangError;
    }
  }

  createRecipeBook({ title }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return window.contract.createRecipeBook(title);
      case "RUST":
        return window.contract.create_recipe_book(title);
      default:
        throw InvalidContractLangError;
    }
  }

  getRecipeBook({ id }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return window.contract.getRecipeBook(id);
      case "RUST":
        return window.contract.get_recipe_book(id);
      default:
        throw InvalidContractLangError;
    }
  }

  updateRecipeBook({ id, title = null, banner = null }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return window.contract.updateRecipeBook(id, title, banner);
      case "RUST":
        return window.contract.update_recipe_book(id, title, banner);
      default:
        throw InvalidContractLangError;
    }
  }

  deleteRecipeBook({ id }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return window.contract.deleteRecipeBook(id);
      case "RUST":
        return window.contract.delete_recipe_book(id);
      default:
        throw InvalidContractLangError;
    }
  }

  createRecipe({
    title,
    description,
    ingridientsList,
    instructions,
    recipeBookID,
    category,
    chefNote,
  }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return window.contract.createRecipe(
          title,
          description,
          ingridientsList,
          instructions,
          recipeBookID,
          category,
          chefNote
        );
      case "RUST":
        return window.contract.create_recipe(
          title,
          description,
          ingridientsList,
          instructions,
          recipeBookID,
          category,
          chefNote
        );
      default:
        throw InvalidContractLangError;
    }
  }

  getRecipe({ id }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return window.contract.getRecipe(id);
      case "RUST":
        return window.contract.get_recipe(id);
      default:
        throw InvalidContractLangError;
    }
  }

  updateRecipe({
    id,
    category = null,
    title = null,
    description = null,
    chefNote = null,
    image = null,
    ingridients = null,
    instructions = null,
  }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return window.contract.updateRecipe(
          id,
          category,
          title,
          description,
          chefNote,
          image,
          ingridients,
          instructions
        );
      case "RUST":
        return window.contract.update_recipe(
          id,
          category,
          title,
          description,
          chefNote,
          image,
          ingridients,
          instructions
        );
      default:
        throw InvalidContractLangError;
    }
  }

  tipRecipe({ recipeID, amount }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return window.contract.tipRecipe(
          recipeID,
          gas,
          utils.format.parseNearAmount(amount)
        );
      case "RUST":
        return window.contract.tip_recipe(
          recipeID,
          gas,
          utils.format.parseNearAmount(amount)
        );
      default:
        throw InvalidContractLangError;
    }
  }

  getRecipes() {
    switch (CONTRACT_LANG) {
      case "AS":
        return window.contract.getRecipes();
      case "RUST":
        return window.contract.get_recipes();
      default:
        throw InvalidContractLangError;
    }
  }

  getTrendingRecipes() {
    switch (CONTRACT_LANG) {
      case "AS":
        return window.contract.getTrendingRecipes();
      case "RUST":
        return window.contract.get_trending_recipes();
      default:
        throw InvalidContractLangError;
    }
  }

  getMostTipedRecipes() {
    switch (CONTRACT_LANG) {
      case "AS":
        return window.contract.getMostTipedRecipes();
      case "RUST":
        return window.contract.get_most_tiped_recipes();
      default:
        throw InvalidContractLangError;
    }
  }

  deleteRecipe({ id }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return window.contract.deleteRecipe(id);
      case "RUST":
        return window.contract.delete_recipe(id);
      default:
        throw InvalidContractLangError;
    }
  }

  createReview({ text, rating, recipeID }) {
    switch (CONTRACT_LANG) {
      case "AS":
        const assemblyRating = rating * 2;
        return window.contract.createReview(text, assemblyRating, recipeID);
      case "RUST":
        return window.contract.createReview(text, rating, recipeID);
      default:
        throw InvalidContractLangError;
    }
  }

  getReview({ id }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return window.contract.getReview(id);
      case "RUST":
        return window.contract.get_review(id);
      default:
        throw InvalidContractLangError;
    }
  }

  updateReview({ id, text, rating }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return window.contract.updateReview(id, text, rating);
      case "RUST":
        return window.contract.update_review(id, text, rating);
      default:
        throw InvalidContractLangError;
    }
  }

  getRecipeReviews({ id }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return window.contract.getRecipeReviews(id);
      case "RUST":
        return window.contract.get_recipe_reviews(id);
      default:
        throw InvalidContractLangError;
    }
  }

  deleteReview({ id }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return window.contract.deleteReview(id);
      case "RUST":
        return window.contract.delete_review(id);
      default:
        throw InvalidContractLangError;
    }
  }

  getShoppingList() {
    switch (CONTRACT_LANG) {
      case "AS":
        return window.contract.getShoppingList();
      case "RUST":
        return window.contract.get_shopping_list();
      default:
        throw InvalidContractLangError;
    }
  }

  updateGroceryList({ lists }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return window.contract.updateGroceryList(lists);
      case "RUST":
        return window.contract.update_grocery_list(lists);
      default:
        throw InvalidContractLangError;
    }
  }

  updateRecipeList({ lists }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return window.contract.updateRecipeList(lists);
      case "RUST":
        return window.contract.update_recipe_list(lists);
      default:
        throw InvalidContractLangError;
    }
  }

  addRecipeList({ recipeID }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return window.contract.addRecipeList(recipeID);
      case "RUST":
        return window.contract.add_recipe_list(recipeID);
      default:
        throw InvalidContractLangError;
    }
  }

  addFavoriteRecipe({ recipeID }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return window.contract.addFavoriteRecipe(recipeID);
      case "RUST":
        return window.contract.add_favorite_recipe(recipeID);
      default:
        throw InvalidContractLangError;
    }
  }
}

export default getContract;
