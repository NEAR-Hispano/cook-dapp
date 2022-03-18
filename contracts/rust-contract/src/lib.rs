mod structs;
use crate::structs::image::Image;
use crate::structs::ingredient::Ingredient;
use crate::structs::recipe::Recipe;
use crate::structs::recipe_book::RecipeBook;
use crate::structs::user::User;
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::UnorderedMap;
use near_sdk::{env, near_bindgen, AccountId};
use std::collections::HashSet;
use std::time::{self, SystemTime};
near_sdk::setup_alloc!();

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct CookDApp {
    pub users: UnorderedMap<AccountId, User>,
    pub recipe_books: UnorderedMap<i128, RecipeBook>,
    pub recipes: UnorderedMap<i128, Recipe>,
    pub recipe_books_id: i128,
    pub recipe_id: i128,
}

impl Default for CookDApp {
    fn default() -> Self {
        Self {
            users: UnorderedMap::new(b"a"),
            recipe_books: UnorderedMap::new(b"b"),
            recipes: UnorderedMap::new(b"c"),
            recipe_books_id: 0,
            recipe_id: 0,
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
                    Some(user) => return Some(user),
                    None => env::panic(b"No user found."),
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

    pub fn get_recipe_book(&mut self, id: i128) -> Option<RecipeBook> {
        Some(self.recipe_books.get(&id).unwrap())
    }

    pub fn get_recipe_books(&mut self) -> Vec<RecipeBook> {
        self.recipe_books.values().into_iter().collect()
    }

    pub fn get_user_recipe_books(&mut self) -> Vec<RecipeBook> {
        let user = self
            .get_user(Some(env::signer_account_id().to_string()))
            .unwrap();

        user.recipe_books_created
            .iter()
            .map(|recipe_book_id| self.get_recipe_book(*recipe_book_id).unwrap())
            .collect()
    }

    pub fn update_recipe_book(&mut self, id: i128, title: Option<String>, banner: Option<Image>) {
        let mut updated_recipe_book = self.get_recipe_book(id).unwrap();

        if updated_recipe_book.creator != env::signer_account_id() {
            env::panic(b"Recipe books can only be edited by the creator.")
        }

        if title.is_some() {
            updated_recipe_book.title = title.unwrap();
        }
        if banner.is_some() {
            updated_recipe_book.banner = banner.unwrap();
        }

        self.recipe_books.insert(&id, &updated_recipe_book);
    }

    pub fn delete_recipe_book(&mut self, id: i128) {
        assert!(self.recipe_books_id >= id, "Recipe Book not found.");

        // Get user object
        let mut user = self
            .get_user(Some(env::signer_account_id().to_string()))
            .unwrap();

        // Check if user is the recipe_book creator.
        if !user.recipe_books_created.contains(&id) {
            env::panic(b"Recipe books can only be deleted by the creator.")
        }

        // Delete recipe book from contract
        self.recipe_books.remove(&id);

        // Delete recipe book id from user recipe_books_created
        user.recipe_books_created = user
            .recipe_books_created
            .iter()
            .filter(|recipe_book_id| recipe_book_id != &&id)
            .map(|x| x)
            .cloned()
            .collect();

        self.users.insert(&env::signer_account_id(), &user);

        // Delete each recipe in book (to be completed.)
    }

    pub fn get_current_date() -> String {
        env::block_timestamp().to_string()
    }

    #[payable]
    pub fn create_recipe(
        &mut self,
        title: String,
        description: String,
        ingredients_list: Vec<Ingredient>,
        instructions: Vec<String>,
        recipe_book_id: i128,
        category: String,
        chef_note: String,
        image: Image,
    ) {
        // Update recipe id count.
        self.recipe_id += 1;

        let deposit = env::attached_deposit();

        // Check if deposit was maded
        assert!(
            deposit > 0,
            "Recipe needs a deposit, in order to be created."
        );

        // Create new recipe
        let new_recipe = Recipe {
            id: self.recipe_id,
            recipe_book_id,
            image,
            creator: env::signer_account_id(),
            category,
            title,
            description,
            chef_note,
            ingredients: ingredients_list,
            instructions,
            reviews: Vec::new(),
            ratings: Vec::new(),
            average_rating: 0.0,
            total_tips: 0.0,
            created_at: "03/17/2022".to_string(),
        };

        // Get user.
        let mut user = self.get_user(Some(env::signer_account_id())).unwrap();

        // Add new recipe id to list of recipes created in user object.
        user.recipes_created.push(self.recipe_id);

        // Update user information in persistent collection.
        self.users.insert(&env::signer_account_id(), &user);

        // Get recipe book.
        let mut recipe_book = self.get_recipe_book(recipe_book_id).unwrap();

        // Add recipe id to list of recipes ids in recipe book.
        recipe_book.recipes.push(self.recipe_id);

        // Update recipe book recipes information.
        self.recipe_books.insert(&recipe_book_id, &recipe_book);

        // Set new recipe created in persistent collection.
        self.recipes.insert(&self.recipe_id, &new_recipe);
    }

    pub fn get_recipe(&mut self, id: i128) -> Recipe {
        self.recipes.get(&id).unwrap()
    }

    pub fn update_recipe(
        &mut self,
        id: i128,
        title: Option<String>,
        description: Option<String>,
        ingredients_list: Option<Vec<Ingredient>>,
        instructions: Option<Vec<String>>,
        recipe_book_id: Option<i128>,
        category: Option<String>,
        chef_note: Option<String>,
        image: Option<Image>,
    ) {
        let mut updated_recipe = self.get_recipe(id);

        if updated_recipe.creator != env::signer_account_id() {
            env::panic(b"Recipe can only be edited by the creator.")
        }

        if title.is_some() {
            updated_recipe.title = title.unwrap();
        }
        if image.is_some() {
            updated_recipe.image = image.unwrap();
        }
        if description.is_some() {
            updated_recipe.description = description.unwrap()
        }
        if ingredients_list.is_some() {
            updated_recipe.ingredients = ingredients_list.unwrap()
        }
        if instructions.is_some() {
            updated_recipe.instructions = instructions.unwrap()
        }
        if recipe_book_id.is_some() {
            updated_recipe.recipe_book_id = recipe_book_id.unwrap()
        }
        if category.is_some() {
            updated_recipe.category = category.unwrap()
        }
        if chef_note.is_some() {
            updated_recipe.chef_note = chef_note.unwrap()
        }

        self.recipes.insert(&id, &updated_recipe);
    }

    pub fn tip_recipe(&mut self, recipe_id: i128) {}
}
