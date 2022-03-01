import { FC, useEffect, useState } from "react";
import { recipeInterface, userInterface } from "../types";
import useContract from "../hooks/useContract";
import useUser from "../hooks/useUser";
import CategoriesRow from "../components/CategoriesRow";
import RecipesRow from "../components/RecipesRow";
import CookDappRecipes from "../components/CookDappRecipes";

const HomeScreen: FC = () => {
  const [user, setUser] = useUser();
  const contract = useContract();
  const [trendingRecipes, setTrendingRecipes] = useState<
    Array<recipeInterface>
  >([]);
  const [mostTipedRecipes, setMostTipedRecipes] = useState<
    Array<recipeInterface>
  >([]);

  useEffect(() => {    
    if (contract) {
      contract
        .getMostTipedRecipes()
        .then((list: Array<recipeInterface>) => setMostTipedRecipes(list));
      contract
        .getTrendingRecipes()
        .then((list: Array<recipeInterface>) => setTrendingRecipes(list));
    }
  }, []);

  useEffect(() => {
    if (mostTipedRecipes && trendingRecipes) {
      console.log({ mostTipedRecipes, trendingRecipes });
    }
  }, [user]);

  return (
    <div className="homescreen-container">
      <CategoriesRow />

      <CookDappRecipes />

      <RecipesRow
        swiperTitle="landing_card_title_most_tiped_recipes"
        recipes={mostTipedRecipes}
      />
      <RecipesRow
        swiperTitle="landing_card_title_trending_recipes"
        recipes={trendingRecipes}
        styles={{ paddingBottom: "60px", marginTop: "60px" }}
      />
    </div>
  );
};

export default HomeScreen;
