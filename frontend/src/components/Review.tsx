import { FC, useEffect, useState } from "react";
import useContract from "../hooks/useContract";
import { Rating as RatingStars } from "react-simple-star-rating";
import { reviewInterface } from "../types";
import useUser from "../hooks/useUser";
import TrashIcon from "../assets/svg/TrashIcon";
import EditIcon from "../assets/svg/EditIcon";

interface Props {
  reviewID: string;
}

const Review: FC<Props> = ({ reviewID }) => {
  const [review, setReview] = useState<reviewInterface | null>(null);
  const contract = useContract();
  const [user] = useUser();
  const [isCreator, setIsCreator] = useState<boolean>(false);

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

  useEffect(() => {
    getReview();
  }, [reviewID, contract]);

  useEffect(() => {
    checkIfCreator();
  }, [user, review]);

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
                ratingValue={(review && review.rating * 2 * 10) || 0}
                initialValue={0}
                size={25}
                iconsCount={5}                
                readonly
                allowHalfIcon
              />
            </div>
            <div className="review-header-rating-status-wrapper">
              <small>{(review && review.rating) || 0} out of 5 stars</small>
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
              <div className="cursor-pointer" style={{ marginRight: "15px" }}>
                <TrashIcon size={20} />
              </div>

              <div className="cursor-pointer">
                <EditIcon size={20} />
              </div>
            </div>
          )}
        </div>
        <div className="review-header-bottom-wrapper">
          {review && review.creator} -{" "}
          {review && customDateFormater(review.createdAt)}
        </div>
      </div>
      <div className="review-description">{review && review.text}</div>
    </div>
  );
};

export default Review;
