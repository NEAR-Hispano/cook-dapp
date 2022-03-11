use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::serde::{Serialize, Deserialize};
use near_sdk::{AccountId};
use super::image::Image;

#[derive(Serialize, Deserialize, BorshDeserialize, BorshSerialize)]
#[serde(crate = "near_sdk::serde")]
pub struct RecipeBook {
    id: String,
    creator: AccountId,
    title: String,
    banner: Image,
    recipes: Vec<String>,
}
