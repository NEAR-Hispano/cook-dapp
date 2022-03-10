use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::serde::{Serialize, Deserialize};
use near_sdk::{AccountId};
use std::collections::HashSet;

#[derive(Serialize, Deserialize, BorshDeserialize, BorshSerialize)]
#[serde(crate = "near_sdk::serde")]
pub struct User {
    pub account_id: AccountId,
    pub favorite_recipes: HashSet<String>,
    pub recipes_created: Vec<String>,
    pub recipe_books_created: Vec<String>,
    pub total_tipped: f64,
    pub tips_received: f64,
}
