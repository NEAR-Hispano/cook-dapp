import { FC, useEffect } from "react";
import CategoriesRow from "../components/CategoriesRow";
import useContract from "../hooks/useContract";
import useUser from "../hooks/useUser";
import { userInterface } from "../types";
import useTranslator from "../hooks/useTranslator";


import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import SwiperCore, { Pagination } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "swiper/modules/navigation/navigation";
import "swiper/modules/pagination/pagination";
import SliderImage from "../assets/images/plato2.jpg"
import SliderImageOne from "../assets/images/plato3.jpg"
import SliderImageTwo from "../assets/images/plato2.jpg"

SwiperCore.use([Pagination]);




const HomeScreen: FC = () => {
  const [user, setUser] = useUser();
  const contract = useContract();
  const translate = useTranslator();

  useEffect(() => {
    if (!user && contract && setUser) {
      contract
        .getUser({ accountID: null })
        .then((res: userInterface) => setUser(res));
    }
  }, []);

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]);

  return (
    <div className="homescreen-container">
      <CategoriesRow />

      <Swiper
        breakpoints={{
          // when window width is >= 640px
          640: {            
            slidesPerView: 1,
          },
          // when window width is >= 768px
          768: {            
            slidesPerView: 2,
          },
          // when window width is >= 768px
          1000: {            
            slidesPerView: 3,
          },
        }}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
      >
        <SwiperSlide  ><img alt="" src={SliderImage} /></SwiperSlide>
        <SwiperSlide  ><img alt="" src={SliderImageOne} /></SwiperSlide>
        <SwiperSlide  ><img alt="" src={SliderImageTwo} /></SwiperSlide>
        <SwiperSlide  ><img alt="" src={SliderImage} /></SwiperSlide>
        <SwiperSlide  ><img alt="" src={SliderImageOne} /></SwiperSlide>
        <SwiperSlide  ><img alt="" src={SliderImageTwo} /></SwiperSlide>
        <SwiperSlide  ><img alt="" src={SliderImage} /></SwiperSlide>
        <SwiperSlide  ><img alt="" src={SliderImageOne} /></SwiperSlide>
        <SwiperSlide  ><img alt="" src={SliderImageTwo} /></SwiperSlide>
      </Swiper>

    </div>
  );
};

export default HomeScreen;
