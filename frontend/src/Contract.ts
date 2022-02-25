import {
  AccountID,
  groceryListInterface,
  ingredientInterface,
  recipeListInterface,
} from "./types/index";
import { utils } from "near-api-js";
import { imageInterface } from "./types";

// Gas.
const gas = 300000000000000;

// Choose smart contract to use, options are AS = Assemblyscript | RUST = Rust.
let CONTRACT_LANG: "AS" | "RUST" = "AS";

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
        return (window as any).contract.getUser({ accountID });
      case "RUST":
        return (window as any).contract.get_user({ accountID });
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
        return (window as any).contract.createRecipeBook({ title, banner });
      case "RUST":
        return (window as any).contract.create_recipe_book({ title, banner });
      default:
        throw InvalidContractLangError;
    }
  }

  getRecipeBook({ id }: { id: string }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return (window as any).contract.getRecipeBook({ id });
      case "RUST":
        return (window as any).contract.get_recipe_book({ id });
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
        return (window as any).contract.updateRecipeBook({ id, title, banner }, gas);
      case "RUST":
        return (window as any).contract.update_recipe_book({
          id,
          title,
          banner,
        }, gas);
      default:
        throw InvalidContractLangError;
    }
  }

  deleteRecipeBook({ id }: { id: string }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return (window as any).contract.deleteRecipeBook({ id });
      case "RUST":
        return (window as any).contract.delete_recipe_book({ id });
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
    image
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
        return (window as any).contract.createRecipe({
          title,
          description,
          ingridientsList,
          instructions,
          recipeBookID,
          category,
          chefNote,
          image
        },
        gas,        
        utils.format.parseNearAmount(process.env.REACT_APP_CREATE_RECIPE_DEPOSIT)
        );
      case "RUST":
        return (window as any).contract.create_recipe({
          title,
          description,
          ingridientsList,
          instructions,
          recipeBookID,
          category,
          chefNote,
          image
        },
        gas,        
        utils.format.parseNearAmount(process.env.REACT_APP_CREATE_RECIPE_DEPOSIT)
        );
      default:
        throw InvalidContractLangError;
    }
  }

  getRecipe({ id }: { id: string }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return (window as any).contract.getRecipe({ id });
      case "RUST":
        return (window as any).contract.get_recipe({ id });
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
        );
      case "RUST":
        return (window as any).contract.update_recipe(
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
        );
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
        );
      case "RUST":
        return (window as any).contract.tip_recipe(
          { recipeID },
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
        return (window as any).contract.getRecipes({});
      case "RUST":
        return (window as any).contract.get_recipes({});
      default:
        throw InvalidContractLangError;
    }
  }

  getTrendingRecipes() {
    switch (CONTRACT_LANG) {
      case "AS":
        return (window as any).contract.getTrendingRecipes({});
      case "RUST":
        return (window as any).contract.get_trending_recipes({});
      default:
        throw InvalidContractLangError;
    }
  }

  getMostTipedRecipes() {
    switch (CONTRACT_LANG) {
      case "AS":
        return (window as any).contract.getMostTipedRecipes({});
      case "RUST":
        return (window as any).contract.get_most_tiped_recipes({});
      default:
        throw InvalidContractLangError;
    }
  }

  deleteRecipe({ id }: { id: string }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return (window as any).contract.deleteRecipe({ id });
      case "RUST":
        return (window as any).contract.delete_recipe({ id });
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
    switch (CONTRACT_LANG) {
      case "AS":
        const assemblyRating = rating * 2;
        console.log(assemblyRating)
        return (window as any).contract.createReview({
          text,
          rating: assemblyRating,
          recipeID,
        }, gas);
      case "RUST":
        return (window as any).contract.create_review({
          text,
          rating,
          recipeID,
        });
      default:
        throw InvalidContractLangError;
    }
  }

  getReview({ id }: { id: string }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return (window as any).contract.getReview({ id });
      case "RUST":
        return (window as any).contract.get_review({ id });
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
        return (window as any).contract.updateReview({ id, text, rating });
      case "RUST":
        return (window as any).contract.update_review({ id, text, rating });
      default:
        throw InvalidContractLangError;
    }
  }

  getRecipeReviews({ id }: { id: string }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return (window as any).contract.getRecipeReviews({ id });
      case "RUST":
        return (window as any).contract.get_recipe_reviews({ id });
      default:
        throw InvalidContractLangError;
    }
  }

  deleteReview({ id }: { id: string }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return (window as any).contract.deleteReview({ id });
      case "RUST":
        return (window as any).contract.delete_review({ id });
      default:
        throw InvalidContractLangError;
    }
  }

  getShoppingList() {
    switch (CONTRACT_LANG) {
      case "AS":
        return (window as any).contract.getShoppingList({});
      case "RUST":
        return (window as any).contract.get_shopping_list({});
      default:
        throw InvalidContractLangError;
    }
  }

  updateGroceryList({ lists }: { lists: Array<groceryListInterface> }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return (window as any).contract.updateGroceryList({ lists });
      case "RUST":
        return (window as any).contract.update_grocery_list({ lists });
      default:
        throw InvalidContractLangError;
    }
  }

  updateRecipeList({ lists }: { lists: Array<recipeListInterface> }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return (window as any).contract.updateRecipeList({ lists });
      case "RUST":
        return (window as any).contract.update_recipe_list({ lists });
      default:
        throw InvalidContractLangError;
    }
  }

  addRecipeList({ recipeID }: { recipeID: string }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return (window as any).contract.addRecipeList({ recipeID });
      case "RUST":
        return (window as any).contract.add_recipe_list({ recipeID });
      default:
        throw InvalidContractLangError;
    }
  }

  addFavoriteRecipe({ recipeID }: { recipeID: string }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return (window as any).contract.addFavoriteRecipe({ recipeID });
      case "RUST":
        return (window as any).contract.add_favorite_recipe({ recipeID });
      default:
        throw InvalidContractLangError;
    }
  }

  getUserRecipeBooks({ accountID }: { accountID: AccountID }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return (window as any).contract.getUserRecipeBooks({ accountID });
      case "RUST":
        return (window as any).contract.get_user_recipe_books({ accountID });
      default:
        throw InvalidContractLangError;
    }
  }

  getUserRecipes({ accountID }: { accountID: AccountID }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return (window as any).contract.getUserRecipes({ accountID });
      case "RUST":
        return (window as any).contract.get_user_recipes({ accountID });
      default:
        throw InvalidContractLangError;
    }
  }

  removeFavoriteRecipe({ recipeID }: { recipeID: string }) {
    switch (CONTRACT_LANG) {
      case "AS":
        return (window as any).contract.removeFavoriteRecipe({ recipeID });
      case "RUST":
        return (window as any).contract.remove_favorite_recipe({ recipeID });
      default:
        throw InvalidContractLangError;
    }
  }
}

export default getContract;
