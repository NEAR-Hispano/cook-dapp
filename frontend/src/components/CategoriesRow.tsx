import { FC } from "react";
import categories from "../assets/data/categories";
import { v4 as uuid } from "uuid";
import CategoriesIcon from "../assets/svg/CategoriesIcon";
import useTranslator from "../hooks/useTranslator";

const CategoriesRow: FC = () => {
  const translate = useTranslator();

  return (
    <div className="categories-container">
      <div className="categories-row-title">
        <h1>
          {translate("categories")} <CategoriesIcon />
        </h1>
      </div>

      <div className="categories-banners-row">
        {categories.map(({ name, banner, path }) => (
          <div key={uuid()} className="categorie-container">
            <div className="categorie-banner">
              <img src={banner} alt={name} />
            </div>
            <div className="categorie-title">
              <h4>{translate(name)}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesRow;
