import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ExploreNotFoundIcon from "../assets/svg/ExploreNotFoundIcon";
import SearchIcon from "../assets/svg/SearchIcon";
import RecipesGallery from "../components/RecipesGallery";
import useContract from "../hooks/useContract";
import useTranslator from "../hooks/useTranslator";
import { recipeInterface } from "../types";

const ExploreScreen: FC = () => {
  const [searcQuery, setSearchQuery] = useState<string>("");
  const translate = useTranslator();
  const [recipes, setRecipes] = useState<Array<recipeInterface>>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<
    Array<recipeInterface>
  >([]);
  const contract = useContract();
  const { searchParam } = useParams();

  function getRecipes() {
    if (contract) {
      contract.getRecipes().then((recipesList: Array<recipeInterface>) => {
        const noAdminList = recipesList.filter(
          ({ creator }) => creator !== "cook_dapp_recipes.testnet"
        );
        setRecipes(noAdminList);
        setFilteredRecipes(noAdminList);
      });
    }
  }

  function filterRecipes() {
    if (searcQuery.length > 0) {
      setFilteredRecipes(
        recipes.filter(
          ({ title }) =>
            title.toLowerCase().includes(searcQuery.toLowerCase()) === true
        )
      );
    } else {
      setFilteredRecipes(recipes);
    }
  }

  useEffect(() => {
    getRecipes();
    setSearchQuery(searchParam ? searchParam.split("+").join(" ") : "");
  }, []);

  return (
    <div className="explore-screen-wrapper">
      <div className="explore-screen-banner">
        <div className="explore-input-container">
          <input
            type={"text"}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={translate("search")}
            value={searcQuery}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                filterRecipes();
              }
            }}
          />
          <div
            className="search-button-container"
            onClick={() => filterRecipes()}
          >
            <SearchIcon size={16} stroke="#FFF" />
          </div>
        </div>
      </div>
      <div className="explore-screen-recipes-gallery-wrapper">
        <RecipesGallery recipesList={filteredRecipes} />
        {filteredRecipes.length === 0 && (
          <div className="explore-screen-no-recipes-found">
            <ExploreNotFoundIcon size={40} />
            <small>{translate("no_recipes_found")}</small>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreScreen;
