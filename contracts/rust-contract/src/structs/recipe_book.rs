use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::serde::{Serialize, Deserialize};
use near_sdk::{AccountId};
use super::image::Image;

#[derive(Serialize, Deserialize, BorshDeserialize, BorshSerialize)]
#[serde(crate = "near_sdk::serde")]
pub struct RecipeBook {
    pub id: i128,
    pub creator: AccountId,
    pub title: String,
    pub banner: Image,
    pub recipes: Vec<i128>,
}
