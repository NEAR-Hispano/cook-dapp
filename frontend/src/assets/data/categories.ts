import DinnerImage from "../images/dinnerImage.jpg";
import BreakfastImage from "../images/breakfastImage.jpg";
import LunchImage from "../images/lunchImage.jpg";
import DessertImage from "../images/dessertImage.jpg";
import SnacksImage from "../images/snacksImage.jpg";

const categories = [
  {
    name: "breakfast",
    banner: BreakfastImage,
    path: "/categories/breakfast",
  },
  {
    name: "lunch",
    banner: LunchImage,
    path: "/categories/lunch",
  },
  {
    name: "dinner",
    banner: DinnerImage,
    path: "/categories/dinner",
  },
  {
    name: "dessert",
    banner: DessertImage,
    path: "/categories/dessert",
  },
  {
    name: "snacks",
    banner: SnacksImage,
    path: "/categories/snacks",
  },
];

export default categories;
