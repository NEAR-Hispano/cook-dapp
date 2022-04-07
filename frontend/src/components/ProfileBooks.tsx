import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddIcon from "../assets/svg/AddIcon";
import ArrowRight from "../assets/svg/ArrowRight";
import Spinner from "../assets/svg/Spinner";
import useContract from "../hooks/useContract";
import useTranslator from "../hooks/useTranslator";
import useUser from "../hooks/useUser";
import { recipeBookInterface, userInterface } from "../types";
import CreateRecipeBook from "./CreateRecipeBook";
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
  const [isBooksLoading, setIsBooksLoading] = useState<boolean>(true);

  const getRecipeBooks = () => {
    if (contract && profile) {      
      contract
        .getUserRecipeBooks({
          accountID: profile.accountId,
        })
        .then((recipeBooksList: Array<recipeBookInterface>) => {
          setRecipeBooks(recipeBooksList);
          setIsBooksLoading(false);
        });
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
      {isBooksLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
            paddingTop: "100px"
          }}
        >
          <Spinner isVisible={isBooksLoading} size={60} />
        </div>
      ) : (
        <>
          {recipeBooks && !isBookOpen && (
            <div className="books-wrapper">
              {user &&
                profile &&
                user.accountId === profile.accountId &&
                recipeBooks && <CreateRecipeBook />}

              {recipeBooks.map((recipeBook, index) => (
                <div className="book-wrapper" key={index}>
                  <RecipeBookTile
                    key={index}
                    recipeBook={recipeBook}
                    selectBook={selectBook}
                    profile={profile}
                  />
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
        </>
      )}
    </div>
  );
};

export default ProfileBooks;
