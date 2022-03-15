# :fork_and_knife: CookDApp

CookDApp’s purpose is to allow the creation, sharing, and schedule of meals through recipes.

CookDApp name represents the implementation of food, recipes, and cooks in this DApp, it will allow users to create recipe books in which they will be able to store recipes, these recipes can be edited and deleted by the creator, the individual recipes and recipe books can be rated by others, this rating will be used to keep tracking of the most rated recipes, this will allow a ranking system for the most popular and delicious meals which can be selected and added to anyone’s schedule so they may try the recipe themselves.


# :gear: Installation

For the locally installation of this project:

## Pre-requisites

- Before you compile this code, you will need to install  [Node.js](https://nodejs.org/en/download/package-manager/)  ≥ 12

- (optional) near-shell

```
npm i -g near-shell
```

-  yarn

```
npm i -g yarn
```

- Install dependencies: 
```
yarn install.
```
# :page_facing_up:	 Cloning the repo

```html
    git clone https://github.com/NEAR-Hispano/cook-dapp.git
```

```html
    cd cook-dapp
```

# :hammer_and_wrench: Project scripts for build and deploy

Install npm dependencies


```html
    npm install
```


### Run contract scripts


Script for building the contract
```html
    sh scripts/build-contract.sh
```
Script for deploying the contract
```html
    sh scripts/dev-deploy-contract.sh
```
Script for cleaning the current local build of the contract
```html
    sh scripts/clean.sh
```
Script for testing contract
```html
    sh scripts/test-contract.sh
```
# :memo: Try it yourself
# Assembly Contract Methods
## getUser Method

```html
    near call <your deployed contract> getUser "{}" --account-id <your test account>
```


## createRecipeBook Method
```html
    near call <your deployed contract> createRecipeBook "{"title":string}" --account-id <your test account>
```

## getRecipeBook Method

```html
    near call <your deployed contract> getRecipeBook "{"id": string}" --account-id <your test account>
```

## updateRecipeBook Method

```html
    near call <your deployed contract> updateRecipeBook "{"id": string, "title": string}" --account-id <your test account>
```
## deleteRecipeBook Method

```html
    near call <your deployed contract> deleteRecipeBook "{"id": string}" --account-id <your test account>
```
## createRecipe Method

```html
    near call <your deployed contract> createRecipe "{"title": string, "description":string, "ingridientsList": Array["label":string, "amount":i32, "unit":string, "details":strring], "instructions":Array[string], "recipeBookID":strrig, "category":string, "chefNote":string}" --account-id <your test account>
```

## getRecipe Method

```html
    near call <your deployed contract> getRecipe"{"id": string}" --account-id <your test account>
```
## updateRecipe Method

```html
    near call <your deployed contract> updateRecipe "{"id": string, "title": string, "description":string, "ingridientsList": Array["label":string, "amount":i32, "unit":string, "details":strring], "instructions":Array[string], "recipeBookID":strrig, "category":string, "chefNote":string}" --account-id <your test account>
```
## deleteRecipe Method

```html
    near call <your deployed contract> updateRecipeBook "{"id": string}" --account-id <your test account>
```
## tipRecipe Method

```html
    near call <your deployed contract> tipRecipe "{"id": string}" --account-id <your test account>
```
## getRecipes Method

```html
    near call <your deployed contract> getRecipes "{}" --account-id <your test account>
```
## getTrendingRecipes Method

```html
    near call <your deployed contract> getTrendingRecipes "{}" --account-id <your test account>
```
## getMostTipedRecipes Method

```html
    near call <your deployed contract> getMostTipedRecipes "{}" --account-id <your test account>
```

## createReview Method

```html
    near call <your deployed contract> createReview "{"text": string, "rating":i32, "recipeID":string}" --account-id <your test account>
```
## getReview Method

```html
    near call <your deployed contract> getReview "{"id": string}" --account-id <your test account>
```
## updateReview Method

```html
    near call <your deployed contract> updateReview "{"id": string, "text": string, "rating": i32}" --account-id <your test account>
```
## getRecipeReviews Method

```html
    near call <your deployed contract> getRecipeReviews "{"id": string}" --account-id <your test account>
```
## deleteReview Method

```html
    near call <your deployed contract> deleteReview "{"id": string}" --account-id <your test account>
```
## addGroceryListRecipe Method

```html
    near call <your deployed contract> addGroceryListRecipe "{"recipeID": string}" --account-id <your test account>
```
## updateGroceryList Method

```html
    near call <your deployed contract> updateRecipeBook "{"lists": Array["label": string, "ingridients": Array["label":string, "amount":i32, "unit":string, "details":string], "recipeID": string]}" --account-id <your test account>
```
## addFavoriteRecipe Method

```html
    near call <your deployed contract> addFavoriteRecipe "{"recipeID": string}" --account-id <your test account>
```
# To Explore

-   `assembly/` contract developed in AssemblyScript
-   `assembly/assembly/index.ts`  for the AssemblyScript contract code
-   `src/index.html`  for the front-end HTML
-   `src/index.js`  for the JavaScript front-end code and how to integrate contracts
-   `src/App.js`  for the main React component
-    `scripts/` runable scripts for building/testing/deploying the contract

# Front-End Current Mockups

Here you can give a check to our Front-End design -  [Figma Mockup](www.figma.com/file/919MgqK51D7Yf8j161Wwbx/CookdApp)


