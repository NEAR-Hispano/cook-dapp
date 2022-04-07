import { CSSProperties, FC } from "react";
import { recipeInterface } from "../types";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import useTranslator from "../hooks/useTranslator";
import { v4 as uuid } from "uuid";
import RecipeTile from "./RecipeTile";
import FullStarIcon from "../assets/svg/FullStarIcon";
import NEARCurrencyIcon from "../assets/svg/NEARCurrencyIcon";

interface Props {
  swiperTitle: string | null;
  recipes: Array<recipeInterface>;
  styles?: CSSProperties;
}

const RecipesRow: FC<Props> = ({ swiperTitle, recipes, styles }) => {
  const translate = useTranslator();
  const placeholders = ["", "", "", "", "", ""];

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
        {placeholders.map(() => (
          <SwiperSlide key={uuid()}>
            <div className="recipe-tile-container">
              <div className="recipe-message">
                <small>{translate("recipe")}</small>
              </div>
              <img className="placeholder" src="" alt="" />
              <div className="recipe-slide-information-wrapper">
                <div className="averageRating">
                  <FullStarIcon />
                  <small>{0}</small>
                </div>
                <div className="tipsRecived">
                  <NEARCurrencyIcon size={20} />
                  <small>{0}</small>
                </div>
                <div className="title">
                  <h6 className="placeholder">not visible title</h6>
                </div>
                <div className="description">
                  <p className="placeholder">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Doloremque eos recusandae, explicabo alias quam voluptas
                    ratione ipsa odio quaerat magnam a, dicta beatae cum. Culpa
                    repellat ipsam eaque temporibus voluptatibus.
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {recipes &&
          recipes
            .filter(
              (recipe) => recipe !== null && typeof recipe !== "undefined"
            )
            .filter((recipe) => customFilter(recipe))
            .map((recipe) => (
              <SwiperSlide key={uuid()}>
                <RecipeTile recipe={recipe} />
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
};

export default RecipesRow;
