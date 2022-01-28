import { FC, useRef, useState } from "react";
import ArrowLeft from "../assets/svg/ArrowLeft";
import FilterRight from "../assets/svg/FilterRight";
import useOnClickOutside from "../hooks/useOnClickOutside";
import useTranslator from "../hooks/useTranslator";
import { recipeBookInterface, userInterface } from "../types";
import RecipesGallery from "./RecipesGallery";

interface Props {
  recipeBook: recipeBookInterface;
  setIsBookOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  profile: userInterface | null;
}

const ProfileBookInfo: FC<Props> = ({
  recipeBook: { recipes, title, id },
  setIsBookOpen,
  profile,
}) => {
  const translate = useTranslator();
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<"tips" | "averageRating">("tips");
  const filterMenuRef = useRef(null);

  useOnClickOutside(
    filterMenuRef,
    () => setIsFilterMenuOpen(false),
    "mousedown"
  );

  const toggleFilterMenu = () => {
    setIsFilterMenuOpen((prev) => !prev);
  };

  const selectTipsFilter = () => {
    setFilter("tips");
  };

  const selectAverageRatingFilter = () => {
    setFilter("averageRating");
  };

  return (
    <div className="profile-book-info">
      <div className="profile-book-info-header">
        <div className="go-back-arrow-container">
          <div onClick={() => setIsBookOpen(false)}>
            <ArrowLeft size={40} />
          </div>
        </div>

        <div className="project-open-book-title">
          <h3>{translate(title)}</h3>
        </div>

        <div className="filter-container">
          <div onClick={() => toggleFilterMenu()}>
            <FilterRight size={30} />
          </div>
        </div>
        <div
          className="filter-menu-container"
          style={{ display: isFilterMenuOpen ? "flex" : "none" }}
          ref={filterMenuRef}
        >
          <small onClick={() => selectTipsFilter()}>tips</small>
          <small onClick={() => selectAverageRatingFilter()}>
            average rating
          </small>
        </div>
      </div>

      <RecipesGallery
        recipeIDs={recipes}
        filter={filter}
        allowCreate
        profile={profile}
      />
    </div>
  );
};

export default ProfileBookInfo;
