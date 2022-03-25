mod structs;
use crate::structs::image::Image;
use crate::structs::ingredient::Ingredient;
use crate::structs::recipe::Recipe;
use crate::structs::recipe_book::RecipeBook;
use crate::structs::review::Review;
use crate::structs::user::User;
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::UnorderedMap;
use near_sdk::{env, near_bindgen, AccountId, Promise};
use std::collections::HashSet;
near_sdk::setup_alloc!();

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct CookDApp {
    pub users: UnorderedMap<AccountId, User>,
    pub recipe_books: UnorderedMap<i128, RecipeBook>,
    pub recipes: UnorderedMap<i128, Recipe>,
    pub reviews: UnorderedMap<String, Review>,
    pub recipe_books_id: i128,
    pub recipe_id: i128,
}

impl Default for CookDApp {
    fn default() -> Self {
        Self {
            users: UnorderedMap::new(b"a"),
            recipe_books: UnorderedMap::new(b"b"),
            recipes: UnorderedMap::new(b"c"),
            reviews: UnorderedMap::new(b"d"),
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

        // Process transaction to contract.
        Promise::new(env::predecessor_account_id()).transfer(deposit);

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

    #[payable]
    pub fn tip_recipe(&mut self, recipe_id: i128) {
        // Check that recipe ID is valid and recipe exists.
        assert!(self.recipe_id >= recipe_id, "Recipe does not exist.");

        // Check that user tipping exists.
        assert!(
            self.users
                .get(&env::signer_account_id().to_string())
                .is_some(),
            "Please register as a user with the method getUser or login to DApp."
        );

        // Get amount of NEAR for the recipe tip.
        let amount = env::attached_deposit();

        // Check if tip amount is greater than zero.
        assert!(amount > 0, "Tip amount must be greater than zero.");

        // Get recipe
        let mut recipe = self.get_recipe(recipe_id);

        // Process transaction to recipe creator.
        Promise::new(recipe.creator.to_string()).transfer(amount);

        // Update recipe totalTips
        recipe.total_tips += amount as f64;

        // Get user that is tipping.
        let mut user_tipping = self.get_user(Some(env::signer_account_id())).unwrap();

        // Get user being tipped.
        let mut user_being_tipped = self.get_user(Some(recipe.creator.clone())).unwrap();

        // Increment Creator of recipe tips recived.
        user_being_tipped.tips_received += amount as f64;

        // Updated total tipped by user.
        user_tipping.total_tipped += amount as f64;

        // Update users in persistent collection.
        self.users.insert(&env::signer_account_id(), &user_tipping);
        self.users.insert(&recipe.creator, &user_being_tipped);

        // Update Recipe
        self.recipes.insert(&recipe_id, &recipe);
    }

    pub fn delete_recipe(&mut self, id: i128) {
        // Check that recipe ID is valid and recipe exists.
        assert!(self.recipe_id >= id, "Recipe does not exist.");

        // Get recipe
        let recipe = self.get_recipe(id);

        // Check if creator is the one trying to delete else throw error
        assert!(
            recipe.creator == env::signer_account_id(),
            "Only creators can delete their recipe."
        );

        // Return deposit for recipe creation to creator.
        // Promise::new(recipe.creator.to_string()).transfer(U128::from(u128::from(0.00000001)));

        // Get user
        let mut user = self.get_user(Some(env::signer_account_id())).unwrap();

        // Delete id of recipe from user recipes created.
        user.recipes_created = user
            .recipes_created
            .iter()
            .filter(|x| x != &&id)
            .map(|x| x)
            .cloned()
            .collect();

        // Delete recipe reviews -> to be continued.

        // Get recipe book.
        let mut recipe_book = self.get_recipe_book(recipe.recipe_book_id.clone()).unwrap();

        // Delete recipe id from recipe book recipes created ids.
        recipe_book.recipes = recipe_book
            .recipes
            .iter()
            .filter(|x| x != &&id)
            .map(|x| x)
            .cloned()
            .collect();

        // Update recipe book
        self.recipe_books.insert(&recipe_book.id, &recipe_book);

        // Update user
        self.users.insert(&env::signer_account_id(), &user);

        // Delete recipe from collection.
        self.recipes.remove(&id);
    }

    pub fn create_review(&mut self, text: String, rating: i32, recipe_id: i128) {
        // Check that recipe ID is valid and recipe exists.
        assert!(self.recipe_id >= recipe_id, "Recipe does not exist.");
        // Check that rating is greater or equal to 1 and equal or lesser than 10.
        assert!(
            rating > 0 && rating < 11,
            "Rating must range beetwen 1 through 10."
        );

        // Get recipe
        let mut recipe = self.get_recipe(recipe_id);

        // Create review key which is the creator of review and recipe_id.
        let review_key = env::signer_account_id() + &recipe_id.to_string();

        //Check if the user has already reviewed the current recipe.
        assert!(
            !recipe.reviews.contains(&review_key),
            "Users can only review a recipe once.",
        );

        //Create new review
        let review = Review {
            id: review_key.clone(),
            creator: env::signer_account_id(),
            text,
            rating: (rating as f64 * 2.0) as f64,
            recipe_id,
            created_at: "03/23/2022".to_string(),
        };

        //Add review to the current recipe.
        recipe.reviews.push(review_key.clone());
        //Add rating to the current recipe.
        recipe.ratings.push((rating as f64 * 2.0) as f64);
        // Update recipe average rating.
        recipe.update_average_rating();

        // Update recipe and set new review.
        self.reviews.insert(&review_key, &review);
        self.recipes.insert(&recipe_id, &recipe);
    }

    pub fn get_review(&mut self, id: String) -> Review {
        self.reviews.get(&id).unwrap()
    }

    pub fn update_review(&mut self, id: String, text: String, rating: i32) {
        let mut review = self.get_review(id.clone());
        let mut recipe = self.get_recipe(review.recipe_id.clone());

        // Check if creator is the one updating.
        assert!(
            review.creator == env::signer_account_id(),
            "Review can only be updated by creator."
        );

        // Delete old rating from recipe.
        recipe.delete_rating((review.rating.clone() as f64 * 2.0) as f64);

        // Update review
        review.text = text;
        review.rating = (rating as f64 * 2.0) as f64;

        // Update new rating from review
        recipe.ratings.push((rating as f64 * 2.0) as f64);
        recipe.update_average_rating();

        // Update contract.
        self.reviews.insert(
            &(env::signer_account_id() + &recipe.id.to_string()),
            &review,
        );
        self.recipes.insert(&recipe.id, &recipe);
    }

    pub fn get_recipe_reviews(&mut self, id: i128) -> Vec<Review> {
        // get recipe from the id.
        let recipe = self.get_recipe(id);

        recipe
            .reviews
            .iter()
            .map(|review_id| self.get_review(review_id.to_string()))
            .collect()
    }

    pub fn delete_review(&mut self, id: String) {
        let review = self.get_review(id);

        //Check if the user who wants to delete the review is the author of it
        assert!(
            review.creator == env::signer_account_id(),
            "Review can only be deleted by creator."
        );

        // Set the reviewKey
        let review_key = env::signer_account_id() + &review.recipe_id.to_string();

        // Get recipe by ID
        let mut recipe = self.get_recipe(review.recipe_id.clone());

        // Deletes Review from recipe.
        recipe.delete_review_id(review_key.clone());

        // Deletes Rating from recipe.
        recipe.delete_rating(review.rating.clone());

        //Updates the Average Rating of the recipe.
        recipe.update_average_rating();

        // Update recipe
        self.recipes.insert(&review.recipe_id, &recipe);

        // Deletes the review
        self.reviews.remove(&review_key);
    }

    pub fn add_favorite_recipe(&mut self, recipe_id: i128) {
        // Gets user
        let mut user = self.get_user(Some(env::signer_account_id())).unwrap();

        // Inserts recipe id, into favorite recipes.
        user.favorite_recipes.insert(recipe_id);

        // Sets user updating changes.
        self.users.insert(&env::signer_account_id(), &user);
    }

    pub fn remove_favorite_recipe(&mut self, recipe_id: i128) {
        // Gets user
        let mut user = self.get_user(Some(env::signer_account_id())).unwrap();

        // Removes recipe id, into favorite recipes.
        user.favorite_recipes.remove(&recipe_id);

        // Sets user updating changes.
        self.users.insert(&env::signer_account_id(), &user);
    }

    pub fn get_user_recipes(&mut self) -> Vec<Recipe> {
        // Get user object.
        let user = self
            .get_user(Some(env::signer_account_id().to_string()))
            .unwrap();

        // Return collection of recipes from recipes created ids of user.
        user.recipes_created
            .iter()
            .map(|recipe_id| self.get_recipe(*recipe_id))
            .collect::<Vec<Recipe>>()
    }

    pub fn get_recipes(&mut self) -> Vec<Recipe> {
        self.recipes.values().into_iter().collect()
    }

    pub fn get_most_tiped_recipes(&mut self) {
        self.get_recipes()
            .sort_by(|a, b| b.total_tips.partial_cmp(&a.total_tips).unwrap())
    }
}
