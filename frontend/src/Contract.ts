import {
  AccountID,
  groceryListInterface,
  ingredientInterface,
  recipeListInterface,
} from "./types/index";
import { utils } from "near-api-js";
import { imageInterface } from "./types";
import camelcaseKeys from "camelcase-keys";

// Gas.
const gas = 300000000000000;

// Choose smart contract to use, options are AS = Assemblyscript | RUST = Rust.
let CONTRACT_LANG: "AS" | "RUST" = "RUST";

const InvalidContractLangError = new Error(
  "Please choose a valid contract language, it should be either RUST or AS."
);

const getContract = (): Contract => {
  if (process.env.NODE_ENV === "production") CONTRACT_LANG = "RUST";
  return new Contract();
};

export class Contract {
  getUser({ accountID = null }: { accountID: string | null }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return (window as any).contract.getUser({ accountID }).then((result: any) => camelcaseKeys(result, { deep: true }));
      case "RUST":
        return (window as any).contract.get_user({ account_id: accountID }).then((result: any) => camelcaseKeys(result, { deep: true }));
      default:
        throw InvalidContractLangError;
    }
  }

  createRecipeBook({
    title = null,
    banner = null,
  }: {
    title: string | null;
    banner: imageInterface | null;
  }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return (window as any).contract.createRecipeBook(
          { title, banner },
          gas
        ).then((result: any) => camelcaseKeys(result, { deep: true }));
      case "RUST":
        return (window as any).contract.create_recipe_book(
          { title, banner },
          gas,
          utils.format.parseNearAmount(
            process.env.REACT_APP_CREATION_DEPOSIT
          )
        ).then((result: any) => camelcaseKeys(result, { deep: true }));
      default:
        throw InvalidContractLangError;
    }
  }

  getRecipeBook({ id }: { id: string }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return (window as any).contract.getRecipeBook({ id }).then((result: any) => camelcaseKeys(result, { deep: true }));
      case "RUST":
        return (window as any).contract.get_recipe_book({ id }).then((result: any) => camelcaseKeys(result, { deep: true }));
      default:
        throw InvalidContractLangError;
    }
  }

  updateRecipeBook({
    id,
    title = null,
    banner = null,
  }: {
    id: string;
    title: string | null;
    banner: imageInterface | null;
  }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return (window as any).contract.updateRecipeBook(
          { id, title, banner },
          gas
        ).then((result: any) => camelcaseKeys(result, { deep: true }));
      case "RUST":
        return (window as any).contract.update_recipe_book(
          {
            id,
            title,
            banner,
          },
          gas
        ).then((result: any) => camelcaseKeys(result, { deep: true }));
      default:
        throw InvalidContractLangError;
    }
  }

  deleteRecipeBook({ id }: { id: string }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return (window as any).contract.deleteRecipeBook({ id }).then((result: any) => camelcaseKeys(result, { deep: true }));
      case "RUST":
        return (window as any).contract.delete_recipe_book({ id }).then((result: any) => camelcaseKeys(result, { deep: true }));
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
    image,
  }: {
    title: string;
    description: string;
    ingridientsList: Array<ingredientInterface>;
    instructions: Array<string>;
    recipeBookID: string;
    category: string;
    chefNote: string;
    image: imageInterface;
  }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return (window as any).contract.createRecipe(
          {
            title,
            description,
            ingridientsList,
            instructions,
            recipeBookID,
            category,
            chefNote,
            image,
          },
          gas,
          utils.format.parseNearAmount(
            process.env.REACT_APP_CREATION_DEPOSIT
          )
        ).then((result: any) => camelcaseKeys(result, { deep: true }));
      case "RUST":
        return (window as any).contract.create_recipe(
          {
            title,
            description,
            ingredients_list: ingridientsList,
            instructions,
            recipe_book_id: parseInt(recipeBookID),
            category,
            chef_note: chefNote,
            image,
          },
          gas,
          utils.format.parseNearAmount(
            process.env.REACT_APP_CREATION_DEPOSIT
          )
        ).then((result: any) => camelcaseKeys(result, { deep: true }));
      default:
        throw InvalidContractLangError;
    }
  }

  getRecipe({ id }: { id: string }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return (window as any).contract.getRecipe({ id }).then((result: any) => camelcaseKeys(result, { deep: true }));
      case "RUST":
        return (window as any).contract.get_recipe({ id: parseInt(id) }).then((result: any) => camelcaseKeys(result, { deep: true }));
      default:
        throw InvalidContractLangError;
    }
  }

  updateRecipe({
    id,
    title = null,
    description = null,
    ingridients = null,
    instructions = null,
    recipeBookID = null,
    category = null,
    chefNote = null,
    image = null,
  }: {
    id: string;
    title: string | null;
    description: string | null;
    ingridients: Array<ingredientInterface> | null;
    instructions: Array<string> | null;
    recipeBookID: string | null;
    category: string | null;
    chefNote: string | null;
    image: imageInterface | null;
  }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return (window as any).contract.updateRecipe(
          {
            id,
            title,
            description,
            ingridients,
            instructions,
            recipeBookID,
            category,
            chefNote,
            image,
          },
          300000000000000
        ).then((result: any) => camelcaseKeys(result, { deep: true }));
      case "RUST":
        return (window as any).contract.update_recipe(
          {
            id,
            title,
            description,
            ingredients_list: ingridients,
            instructions,
            recipe_book_id: recipeBookID,
            category,
            chef_note: chefNote,
            image,
          },
          300000000000000
        ).then((result: any) => camelcaseKeys(result, { deep: true }));
      default:
        throw InvalidContractLangError;
    }
  }

  tipRecipe({ recipeID, amount }: { recipeID: string; amount: string }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return (window as any).contract.tipRecipe(
          { recipeID },
          gas,
          utils.format.parseNearAmount(amount)
        ).then((result: any) => camelcaseKeys(result, { deep: true }));
      case "RUST":
        return (window as any).contract.tip_recipe(
          { recipe_id: recipeID, tip_amount: amount },
          gas,
          utils.format.parseNearAmount(amount)
        ).then((result: any) => camelcaseKeys(result, { deep: true }));
      default:
        throw InvalidContractLangError;
    }
  }

  getRecipes() {
    switch (CONTRACT_LANG) {
      case "AS":
        return (window as any).contract.getRecipes({}).then((result: any) => camelcaseKeys(result, { deep: true }));
      case "RUST":
        return (window as any).contract.get_recipes({}).then((result: any) => camelcaseKeys(result, { deep: true }));
      default:
        throw InvalidContractLangError;
    }
  }

  getTrendingRecipes() {
    switch (CONTRACT_LANG) {
      case "AS":
        return (window as any).contract.getTrendingRecipes({}).then((result: any) => camelcaseKeys(result, { deep: true }));
      case "RUST":
        return (window as any).contract.get_trending_recipes({}).then((result: any) => camelcaseKeys(result, { deep: true }));
      default:
        throw InvalidContractLangError;
    }
  }

  getMostTipedRecipes() {
    switch (CONTRACT_LANG) {
      case "AS":
        return (window as any).contract.getMostTipedRecipes({}).then((result: any) => camelcaseKeys(result, { deep: true }));
      case "RUST":
        return (window as any).contract.get_most_tiped_recipes({}).then((result: any) => camelcaseKeys(result, { deep: true }));
      default:
        throw InvalidContractLangError;
    }
  }

  deleteRecipe({ id }: { id: string }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return (window as any).contract.deleteRecipe({ id }).then((result: any) => camelcaseKeys(result, { deep: true }));
      case "RUST":
        return (window as any).contract.delete_recipe({ id: parseInt(id) }).then((result: any) => camelcaseKeys(result, { deep: true }));
      default:
        throw InvalidContractLangError;
    }
  }

  createReview({
    text,
    rating,
    recipeID,
  }: {
    text: string;
    rating: number;
    recipeID: string;
  }) {
    const doubleRating = rating * 2;
    switch (CONTRACT_LANG) {
      case "AS":
        return (window as any).contract.createReview(
          {
            text,
            rating: doubleRating,
            recipeID,
          },
          gas
        ).then((result: any) => camelcaseKeys(result, { deep: true }));
      case "RUST":
        return (window as any).contract.create_review(
          {
            text,
            rating: doubleRating,
            recipe_id: recipeID,
            created_at: new Date().toDateString()
          },
          gas
        ).then((result: any) => camelcaseKeys(result, { deep: true }));
      default:
        throw InvalidContractLangError;
    }
  }

  getReview({ id }: { id: string }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return (window as any).contract.getReview({ id }).then((result: any) => camelcaseKeys(result, { deep: true }));
      case "RUST":
        return (window as any).contract.get_review({ id }).then((result: any) => camelcaseKeys(result, { deep: true }));
      default:
        throw InvalidContractLangError;
    }
  }

  updateReview({
    id,
    text,
    rating,
  }: {
    id: string;
    text: string;
    rating: number;
  }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return (window as any).contract.updateReview({ id, text, rating }, gas).then((result: any) => camelcaseKeys(result, { deep: true }));
      case "RUST":
        return (window as any).contract.update_review(
          { id, text, rating },
          gas
        ).then((result: any) => camelcaseKeys(result, { deep: true }));
      default:
        throw InvalidContractLangError;
    }
  }

  getRecipeReviews({ id }: { id: string }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return (window as any).contract.getRecipeReviews({ id }).then((result: any) => camelcaseKeys(result, { deep: true }));
      case "RUST":
        return (window as any).contract.get_recipe_reviews({ id }).then((result: any) => camelcaseKeys(result, { deep: true }));
      default:
        throw InvalidContractLangError;
    }
  }

  deleteReview({ id }: { id: string }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return (window as any).contract.deleteReview({ id }).then((result: any) => camelcaseKeys(result, { deep: true }));
      case "RUST":
        return (window as any).contract.delete_review({ id }).then((result: any) => camelcaseKeys(result, { deep: true }));
      default:
        throw InvalidContractLangError;
    }
  }

  addFavoriteRecipe({ recipeID }: { recipeID: string }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return (window as any).contract.addFavoriteRecipe({ recipeID }, gas).then((result: any) => camelcaseKeys(result, { deep: true }));
      case "RUST":
        return (window as any).contract.add_favorite_recipe({ recipe_id: parseInt(recipeID) }, gas).then((result: any) => camelcaseKeys(result, { deep: true }));
      default:
        throw InvalidContractLangError;
    }
  }

  getUserRecipeBooks({ accountID }: { accountID: AccountID }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return (window as any).contract.getUserRecipeBooks({ accountID }).then((result: any) => camelcaseKeys(result, { deep: true }));
      case "RUST":
        return (window as any).contract.get_user_recipe_books({ account_id: accountID }).then((result: any) => camelcaseKeys(result, { deep: true }));
      default:
        throw InvalidContractLangError;
    }
  }

  getUserRecipes({ accountID }: { accountID: AccountID }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return (window as any).contract.getUserRecipes({ accountID }).then((result: any) => camelcaseKeys(result, { deep: true }));
      case "RUST":
        return (window as any).contract.get_user_recipes({ account_id: accountID }).then((result: any) => camelcaseKeys(result, { deep: true }));
      default:
        throw InvalidContractLangError;
    }
  }

  removeFavoriteRecipe({ recipeID }: { recipeID: string }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return (window as any).contract.removeFavoriteRecipe({ recipeID }).then((result: any) => camelcaseKeys(result, { deep: true }));
      case "RUST":
        return (window as any).contract.remove_favorite_recipe({ recipe_id: parseInt(recipeID) }).then((result: any) => camelcaseKeys(result, { deep: true }));
      default:
        throw InvalidContractLangError;
    }
  }

  // To be considered.
  getShoppingList() {
    switch (CONTRACT_LANG) {
      case "AS":
        return (window as any).contract.getShoppingList({}).then((result: any) => camelcaseKeys(result, { deep: true }));
      case "RUST":
        return (window as any).contract.get_shopping_list({}).then((result: any) => camelcaseKeys(result, { deep: true }));
      default:
        throw InvalidContractLangError;
    }
  }

  updateGroceryList({ lists }: { lists: Array<groceryListInterface> }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return (window as any).contract.updateGroceryList({ lists }, gas).then((result: any) => camelcaseKeys(result, { deep: true }));
      case "RUST":
        return (window as any).contract.update_grocery_list({ lists }, gas).then((result: any) => camelcaseKeys(result, { deep: true }));
      default:
        throw InvalidContractLangError;
    }
  }

  updateRecipeList({ lists }: { lists: Array<recipeListInterface> }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return (window as any).contract.updateRecipeList({ lists }, gas).then((result: any) => camelcaseKeys(result, { deep: true }));
      case "RUST":
        return (window as any).contract.update_recipe_list({ lists }, gas).then((result: any) => camelcaseKeys(result, { deep: true }));
      default:
        throw InvalidContractLangError;
    }
  }

  addRecipeList({ recipeID }: { recipeID: string }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return (window as any).contract.addRecipeList({ recipeID }, gas).then((result: any) => camelcaseKeys(result, { deep: true }));
      case "RUST":
        return (window as any).contract.add_recipe_list({ recipeID }, gas).then((result: any) => camelcaseKeys(result, { deep: true }));
      default:
        throw InvalidContractLangError;
    }
  }
}

export default getContract;
