import { FC, useEffect, useState } from "react";
import AddIcon from "../assets/svg/AddIcon";
import ArrowRight from "../assets/svg/ArrowRight";
import useContract from "../hooks/useContract";
import useTranslator from "../hooks/useTranslator";
import useUser from "../hooks/useUser";
import { recipeBookInterface, userInterface } from "../types";
import ProfileBookInfo from "./ProfileBookInfo";
import RecipeBookTile from "./RecipeBookTile";

interface Props {
  profile: userInterface | null;
}

const ProfileBooks: FC<Props> = ({ profile }) => {
  const contract = useContract();
  const [user] = useUser();
  const translate = useTranslator();
  const [isBookOpen, setIsBookOpen] = useState<boolean>();
  const [selectedBook, setSelectedBook] =
    useState<recipeBookInterface | null>();
  const [recipeBooks, setRecipeBooks] = useState<Array<recipeBookInterface>>(
    []
  );

  const getRecipeBooks = async () => {
    if (contract && profile) {
      const recipeBooksList = await contract.getUserRecipeBooks({
        accountID: profile.accountID,
      });
      setRecipeBooks(recipeBooksList);
    }
  };

  const selectBook = (recipeBook: recipeBookInterface) => {
    setSelectedBook(recipeBook);
    setIsBookOpen(true);
  };

  useEffect(() => {
    getRecipeBooks();
  }, [contract, profile]);

  return (
    <div className="profile-recipes-books">
      {recipeBooks && !isBookOpen && (
        <div className="books-wrapper">
          {user && profile && user.accountID === profile.accountID && (
            <div className="recipe-book-tile-container create-recipe-book-tile">
              <div className="recipe-book-message">
                <small>{translate("recipe_book")}</small>
              </div>
              <AddIcon size={50} />
            </div>
          )}

          {recipeBooks.map((recipeBook) => (
            <div className="book-wrapper">
              <RecipeBookTile recipeBook={recipeBook} selectBook={selectBook} />
            </div>
          ))}
        </div>
      )}

      {selectedBook && isBookOpen && (
        <ProfileBookInfo
          recipeBook={selectedBook}
          setIsBookOpen={setIsBookOpen}
          profile={profile}
        />
      )}
    </div>
  );
};

export default ProfileBooks;
