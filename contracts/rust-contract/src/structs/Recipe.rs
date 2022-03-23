use super::image::Image;
use super::ingredient::Ingredient;
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::AccountId;

#[derive(Serialize, Deserialize, BorshDeserialize, BorshSerialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Recipe {
    pub id: i128,
    pub recipe_book_id: i128,
    pub image: Image,
    pub creator: AccountId,
    pub category: String,
    pub title: String,
    pub description: String,
    pub chef_note: String,
    pub ingredients: Vec<Ingredient>,
    pub instructions: Vec<String>,
    pub reviews: Vec<String>,
    pub ratings: Vec<f64>,
    pub average_rating: f64,
    pub total_tips: f64,
    pub created_at: String,
}

impl Recipe {
    pub fn update_average_rating(&mut self) {
        let times_rated = *&self.ratings.len() as f64;
        let mut rating_total: f64 = 0.0;

        for rating in &*&self.ratings {
            rating_total = rating_total + rating;
        }

        // Divide if times_rated is not zero.
        if times_rated == 0.0 {
            self.average_rating = 0.0;
        }
        // else return 0 as this.averageRating.
        else {
            self.average_rating = rating_total / times_rated;
        }
    }

    pub fn delete_rating(&mut self, rating: f64) {
        self.ratings = self
            .ratings
            .iter()
            .filter(|x| x == &&rating)
            .map(|x| x)
            .cloned()
            .collect();
    }
}
