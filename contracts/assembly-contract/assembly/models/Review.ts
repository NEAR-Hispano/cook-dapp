import { AccountID, getCurrentDate, getID } from "../utils";

@nearBindgen
class Review {
    id: string;
    creator: AccountID;
    text: string;
    rating: f64;
    recipeID: string;
    createdAt: string;

    constructor(creator: string, text: string, rating: f64, recipeID: string) {
        this.id = getID();
        this.creator = creator;
        this.text = text;
        this.rating = rating;
        this.recipeID = recipeID;
        this.createdAt = getCurrentDate();
    }
    
    setText(text: string): void {
        this.text = text; 
    }

    setRating(rating: f64): void {
        this.rating = rating;
    }
}

export default Review;