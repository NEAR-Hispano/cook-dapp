use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::serde::{Serialize, Deserialize};
use near_sdk::{AccountId};
use super::image::Image;
use super::ingredient::Ingredient;

#[derive(Serialize, Deserialize, BorshDeserialize, BorshSerialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Recipe {
    pub id: String,
    pub recipe_book_id: String,
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
    pub created_at: String
}