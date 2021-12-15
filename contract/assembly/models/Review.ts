import { AccountID, getCurrentDate, getID } from "../utils";

class Review {
    id: string;
    creator: AccountID;
    text: string;
    rating: i32;
    recipeID: string;
    createdAt: string;

    constructor(creator: string, text: string, raiting: i32, recipeID: string) {
        this.id = getID();
        this.creator = creator;
        this.text = text;
        this.rating = raiting;
        this.recipeID = recipeID;
        this.createdAt = getCurrentDate();
    }
}

export default Review;