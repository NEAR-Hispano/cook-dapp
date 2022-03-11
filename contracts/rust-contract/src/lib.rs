mod structs;
use crate::structs::user::User;
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::serde::{Serialize, Deserialize};
use near_sdk::collections::UnorderedMap;
use near_sdk::{env, near_bindgen, AccountId};
use std::collections::HashSet;
near_sdk::setup_alloc!();

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct CookDApp {
    pub users: UnorderedMap<AccountId, User>,
}

impl Default for CookDApp {
    fn default() -> Self {
        Self {
            users: UnorderedMap::new(b"a"),
        }
    }
}

#[derive(Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub enum Exists<A, B> {
    True(A),
    False(B),
}

#[near_bindgen]
impl CookDApp {
    
    pub fn get_user(&mut self, account_id: Option<AccountId>) -> Exists<User, String> {
        match account_id.as_deref() {
            None => {
                // If no account_id is provided, create user for account_id calling the method and return it, else if already exists get it and return it.
                match self.users.get(&env::signer_account_id()) {
                    None => {
                        self.create_user();
                    }
                    user => {
                        return Exists::True(user.unwrap());
                    }
                }
                return Exists::True(self.users.get(&env::signer_account_id()).unwrap());
            }
            Some(account_id) => {
                // If account_id is provided, get user and return it if exists, else throw error
                match self.users.get(&account_id.to_owned()) {
                    None => {
                        return Exists::False("User does not exists.".to_string());
                    }
                    user => {
                        return Exists::True(user.unwrap());
                    }
                }
            }
        }
    }

    pub fn create_user(&mut self) {
        let new_user = User {
            account_id: env::signer_account_id(),
            favorite_recipes: HashSet::new(),
            recipes_created: Vec::new(),
            recipe_books_created: Vec::new(),
            total_tipped: 0.0,
            tips_received: 0.0,
        };

        self.users.insert(&env::signer_account_id(), &new_user);
    }
}
