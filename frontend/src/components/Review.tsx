import { FC, useEffect, useState } from "react";
import useContract from "../hooks/useContract";
import { Rating as RatingStars } from "react-simple-star-rating";
import { reviewInterface } from "../types";
import useUser from "../hooks/useUser";
import TrashIcon from "../assets/svg/TrashIcon";
import { toast } from "react-toastify";
import EditableText from "./EditableText";
import SaveIcon from "../assets/svg/SaveIcon";
import useTranslator from "../hooks/useTranslator";

interface Props {
  reviewID: string;
}

const Review: FC<Props> = ({ reviewID }) => {
  const [review, setReview] = useState<reviewInterface | null>(null);
  const contract = useContract();
  const [user] = useUser();
  const [isCreator, setIsCreator] = useState<boolean>(false);
  const [editingMode, setEditingMode] = useState<boolean>(false);
  const [editedRating, setEditedRating] = useState<number>(0);
  const [editedText, setEditedText] = useState<string>("");
  const translate = useTranslator();
  const [hasTextLengthError, setHasTextLengthError] = useState<string | null>(
    null
  );

  async function getReview() {
    if (reviewID && contract) {
      setReview(await contract.getReview({ id: reviewID }));
    }
  }

  function customDateFormater(unFormatedDate: string) {
    const result = new Date(unFormatedDate);
    return result.toDateString();
  }

  function checkIfCreator() {
    setIsCreator(
      (user && review && user.accountID === review.creator) || false
    );
  }

  function saveChanges() {
    if (reviewID && contract) {
      toast(translate("Saving changes..."), {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        delay: 1000,
      });
      contract
        .updateReview({
          id: reviewID,
          text: editedText,
          rating: editedRating * 2,
        })
        .then(() => {
          toast(translate("Changes saved."), {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            delay: 1000,
          });
        });
    }
  }
  function deleteReview() {
    if (reviewID && contract) {
      toast(translate("Deleting review..."), {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        delay: 1000,
      });
      contract.deleteReview({ id: reviewID }).then(() => {
        toast.dismiss();
        toast(translate("Review deleted"), {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          delay: 1000,
        });

        setTimeout(() => {
          (window as any).location.reload(false);
        }, 3000);
      });
    }
  }

  useEffect(() => {
    getReview();
  }, [reviewID, contract]);

  useEffect(() => {
    checkIfCreator();
  }, [user, review]);

  useEffect(() => {
    if (review) {
      setEditedRating(review.rating);
      setEditedText(review.text);
    }
  }, [review]);

  useEffect(() => {
    setEditingMode(isCreator);
  }, [isCreator]);

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
              {editingMode ? (
                <RatingStars
                  ratingValue={(review && editedRating * 2 * 10) || 0}
                  initialValue={0}
                  size={25}
                  iconsCount={5}
                  allowHalfIcon
                  onClick={(value) => setEditedRating(value / 2 / 10)}
                />
              ) : (
                <RatingStars
                  ratingValue={(review && editedRating * 2 * 10) || 0}
                  initialValue={0}
                  size={25}
                  iconsCount={5}
                  allowHalfIcon
                  readonly
                />
              )}
            </div>
            <div className="review-header-rating-status-wrapper">
              <small>{(review && editedRating) || 0} out of 5 stars</small>
            </div>
          </div>

          {isCreator && (
            <div
              className=""
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                className="cursor-pointer"
                style={{ marginRight: "15px" }}
                onClick={() => deleteReview()}
              >
                <TrashIcon size={20} />
              </div>

              <div className="cursor-pointer" onClick={() => saveChanges()}>
                <SaveIcon size={20} />
              </div>
            </div>
          )}
        </div>
        <div className="review-header-bottom-wrapper">
          {review && review.creator} -{" "}
          {review && customDateFormater(review.createdAt)}
        </div>
      </div>
      {editingMode ? (
        <EditableText
          isEditable={editingMode}
          onBlur={(e) => setEditedText(e.currentTarget.innerText)}
          setHasTextLengthError={setHasTextLengthError}
          textType="description"
        >
          {review && review.text}
        </EditableText>
      ) : (
        <div className="review-description">{review && review.text}</div>
      )}
    </div>
  );
};

export default Review;
