use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{AccountId};

#[derive(Serialize, Deserialize, BorshDeserialize, BorshSerialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Review {
    pub id: String,
    pub creator: AccountId,
    pub text: String,
    pub rating: f64,
    pub recipe_id: i128,
    pub created_at: String,
}