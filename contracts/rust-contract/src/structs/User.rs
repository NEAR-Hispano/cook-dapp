use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{near_bindgen, AccountId};
use std::collections::HashSet;

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct User {
    pub account_id: AccountId,
    pub favorite_recipes: HashSet<String>,
    pub recipes_created: Vec<String>,
    pub recipe_books_created: Vec<String>,
    pub total_tipped: f64,
    pub tips_received: f64,
}
