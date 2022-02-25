import { FC, useState } from "react";
import useContract from "../hooks/useContract";
import { Rating as RatingStars } from "react-simple-star-rating";
import useUser from "../hooks/useUser";
import { toast } from "react-toastify";
import EditableText from "./EditableText";
import useTranslator from "../hooks/useTranslator";
import PlusIcon from "../assets/svg/PlusIcon";
import contractErrorHandler from "../utils/contractErrorHandler";
import refreshPage from "../utils/refreshPage";

interface Props {
  recipeID: string;
}

const CreateReview: FC<Props> = ({ recipeID }) => {
  const contract = useContract();
  const [user] = useUser();
  const translate = useTranslator();
  const [rating, setRating] = useState<number>(0);
  const [text, setText] = useState<string>("");

  function customDateFormater(unFormatedDate: string) {
    const result = new Date(unFormatedDate);
    return result.toDateString();
  }

  function createReview() {
    if (contract && rating && text) {
      toast(translate("Creating review, please wait..."), {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      contract
        .createReview({ text, rating, recipeID })
        .then(() => {
          toast(translate("review created"), {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => refreshPage(), 3000)
        })
        .catch((error: Error) => contractErrorHandler(error));
    }
  }

  return (
    <div className="review-wrapper">
      <div className="review-header">
        <div className="review-header-top-wrapper">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="review-header-stars-wrapper">
              <RatingStars
                ratingValue={rating * 2 * 10}
                initialValue={0}
                size={25}
                iconsCount={5}
                allowHalfIcon
                onClick={(value) => setRating(value / 2 / 10)}
              />
            </div>
            <div className="review-header-rating-status-wrapper">
              <small>{rating || 0} out of 5 stars</small>
            </div>
          </div>

          <div
            className=""
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="cursor-pointer" onClick={() => createReview()}>
              <PlusIcon size={30} />
            </div>
          </div>
        </div>
        <div className="review-header-bottom-wrapper">
          {user && user.accountID} - {customDateFormater(new Date().toString())}
        </div>
      </div>
      <EditableText
        isEditable={true}
        onBlur={(e) => setText(e.currentTarget.innerText)}
      >
        {text ? text : translate("Write your review here...")}
      </EditableText>
    </div>
  );
};

export default CreateReview;
