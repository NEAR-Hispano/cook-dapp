mod structs;
use crate::structs::image::Image;
use crate::structs::recipe_book::RecipeBook;
use crate::structs::user::User;
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::UnorderedMap;
use near_sdk::{env, near_bindgen, AccountId};
use std::collections::HashSet;
near_sdk::setup_alloc!();

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct CookDApp {
    pub users: UnorderedMap<AccountId, User>,
    pub recipe_books: UnorderedMap<i128, RecipeBook>,
    pub recipe_books_id: i128,
}

impl Default for CookDApp {
    fn default() -> Self {
        Self {
            users: UnorderedMap::new(b"c"),
            recipe_books: UnorderedMap::new(b"b"),
            recipe_books_id: 0,
        }
    }
}

#[near_bindgen]
impl CookDApp {
    pub fn get_user(&mut self, account_id: Option<AccountId>) -> Option<User> {
        match account_id.as_deref() {
            None => {
                // If no account_id is provided, create user for account_id calling the method and return it, else if already exists get it and return it.
                match self.users.get(&env::signer_account_id()) {
                    None => {
                        self.create_user();
                        return Some(self.users.get(&env::signer_account_id()).unwrap());
                    }
                    user => {
                        return Some(user.unwrap());
                    }
                }
            }
            Some(account_id) => {
                // Reminder to try out with env::panic! to throw error regarding user not existing.
                // If account_id is provided, get user and return it if exists, else throw error
                match self.users.get(&account_id.to_owned()) {
                    Some(user) => {
                        return Some(user)
                    }
                    None => {
                        env::panic(b"No user found.")
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

    pub fn get_recipe_book(&mut self, id: i128) -> Option<RecipeBook> {
        return Some(self.recipe_books.get(&id).unwrap());
    }

    pub fn create_recipe_book(&mut self, title: String, banner: Image) {
        self.recipe_books_id += 1;

        let new_recipe_book = RecipeBook {
            id: self.recipe_books_id,
            creator: env::signer_account_id(),
            title,
            banner,
            recipes: Vec::new(),
        };

        self.recipe_books
            .insert(&self.recipe_books_id, &new_recipe_book);
        match self.get_user(None) {
            Some(mut user) => {
                user.recipe_books_created.push(self.recipe_books_id);
                self.users.insert(&env::signer_account_id(), &user);
            }
            None => env::panic(b"Please log in."),
        }
    }
}
