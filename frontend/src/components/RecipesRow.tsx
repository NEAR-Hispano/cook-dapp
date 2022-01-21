import { CSSProperties, FC } from "react";
import { recipeInterface } from "../types";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import useTranslator from "../hooks/useTranslator";
import { Link } from "react-router-dom";
import FullStarIcon from "../assets/svg/FullStarIcon";
import NEARCurrencyIcon from "../assets/svg/NEARCurrencyIcon";
import { v4 as uuid } from "uuid";

interface Props {
  swiperTitle: string | null;
  recipes: Array<recipeInterface>;
  styles?: CSSProperties;
}

const RecipesRow: FC<Props> = ({ swiperTitle, recipes, styles }) => {
  const translate = useTranslator();

  // Filter will prevent recipes created by cook_dapp_recipes to rank in this categories.
  const customFilter = (recipe: recipeInterface) => {
    if (recipe.creator === "cook_dapp_recipes.testnet") {
      return false;
    } else if (recipe.creator === "cook_dapp_recipes.near") {
      return false;
    }    
    return true;
  };

  return (
    <div className="recipes-row" style={styles}>
      {swiperTitle && (
        <div className="recipes-row-title">
          <h3>{translate(swiperTitle)}</h3>
          <div className="line" />
        </div>
      )}
      <Swiper
        /* slides will change when bigger or equal size. */
        breakpoints={{
          620: {
            slidesPerView: 2,
          },
          900: {
            slidesPerView: 3,
          },
          1240: {
            slidesPerView: 4,
          },
        }}
        spaceBetween={30}
      >
        {recipes &&
          recipes
            .filter((recipe) => customFilter(recipe))
            .map(
              ({
                id,
                image,
                title,
                averageRating = 0.0,
                description,
                totalTips,
              }) => (
                <SwiperSlide key={uuid()}>
                  <Link to={`/recipe/${id}`}>
                    <img src={image.url} alt={image.name} />
                    <div className="recipe-slide-information-wrapper">
                      <div className="averageRating">
                        <FullStarIcon />
                        <small>{averageRating}</small>
                      </div>
                      <div className="tipsRecived">
                        <NEARCurrencyIcon size={20} />
                        <small>{totalTips}</small>
                      </div>
                      <div className="title">
                        <h6>{title}</h6>
                      </div>
                      <div className="description">
                        <p>{description}</p>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              )
            )}
      </Swiper>
    </div>
  );
};

export default RecipesRow;
