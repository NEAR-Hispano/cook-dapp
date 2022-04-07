import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import FullStarIcon from "../assets/svg/FullStarIcon";
import NEARCurrencyIcon from "../assets/svg/NEARCurrencyIcon";
import useContract from "../hooks/useContract";
import usePlaceholder from "../hooks/usePlaceholder";
import useTranslator from "../hooks/useTranslator";
import useUser from "../hooks/useUser";
import { recipeInterface } from "../types";

const CookDappRecipes: FC = () => {
  const [cookDappRecipes, setCookDappRecipes] = useState<
    Array<recipeInterface>
  >([]);
  const contract = useContract();
  const [user] = useUser();
  const translate = useTranslator();
  const [isPlaceholder] = usePlaceholder(100);
  const placeholders = ["", "", ""];

  useEffect(() => {
    if (contract && user) {
      contract
        .getUserRecipes({ accountID: "cook_dapp_recipes.testnet" })
        .then((list: Array<recipeInterface>) => setCookDappRecipes(list));
    }
  }, [contract, user]);

  useEffect(() => {
    if (cookDappRecipes) {
      console.log(cookDappRecipes);
    }
  }, [cookDappRecipes]);

  return (
    <div className="cook-dapp-recipes-row">
      <Swiper
        /* slides will change when bigger or equal size. */
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1000: {
            slidesPerView: 3,
          },
        }}
        spaceBetween={30}
      >
        {cookDappRecipes.length === 0 &&
          placeholders.map(() => (
            <SwiperSlide>
              <>
                <div className="title">
                  <span className="placeholder">not visible title</span>
                </div>
                <img
                  src={""}
                  alt={""}
                  className="placeholder"
                  height={300}
                  width={300}
                />
                <div className="averageRating">
                  <FullStarIcon />
                  <small>{0}</small>
                </div>
                <div className="tipsRecived">
                  <NEARCurrencyIcon size={20} />
                  <small>{0}</small>
                </div>
                <div className="selected-message">
                  <small>{translate("cookdapp_selected")}</small>
                </div>
              </>
            </SwiperSlide>
          ))}
        {cookDappRecipes &&
          !isPlaceholder &&
          cookDappRecipes.map(
            ({ image, id, averageRating, totalTips, title }) => (
              <SwiperSlide>
                <Link to={`/recipe/${id}`}>
                  <div className="title">
                    <span className={`${isPlaceholder && "placeholder"}`}>
                      {title}
                    </span>
                  </div>
                  <img
                    src={isPlaceholder ? "" : image.url}
                    alt={image.name}
                    className={`${isPlaceholder && "placeholder"}`}
                  />
                  <div className="averageRating">
                    <FullStarIcon />
                    <small>{averageRating}</small>
                  </div>
                  <div className="tipsRecived">
                    <NEARCurrencyIcon size={20} />
                    <small>{totalTips}</small>
                  </div>
                  <div className="selected-message">
                    <small>{translate("cookdapp_selected")}</small>
                  </div>
                </Link>
              </SwiperSlide>
            )
          )}
      </Swiper>
    </div>
  );
};

export default CookDappRecipes;
