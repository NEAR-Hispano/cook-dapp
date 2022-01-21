import { FC, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import useContract from "../hooks/useContract";
import useUser from "../hooks/useUser";
import { recipeInterface } from "../types";

const CookDappRecipes: FC = () => {
  const [cookDappRecipes, setCookDappRecipes] = useState<
    Array<recipeInterface>
  >([]);
  const contract = useContract();
  const [user] = useUser();

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
        {cookDappRecipes &&
          cookDappRecipes.map(({ image }) => (
            <SwiperSlide>
              <img src={image.url} alt={image.name} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default CookDappRecipes;
