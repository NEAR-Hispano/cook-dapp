#!/bin/bash
set -e

echo
echo "Loading data examples to contract:"
echo
echo

# echo
# echo "Loading recipe books."
# echo

# jq -c '.[]' ./contracts/data/recipe_books_examples.json | while read recipeBook; do
#     title=$(jq -r '.title' <<<${recipeBook})
#     echo "{\"title\": \"$title\"}"
#     near call dev-1642744190654-63833165458970 createRecipeBook "{\"title\": \"$title\"}" --account-id jgmercedes.testnet
# done

# echo
# echo "Loading recipes into recipe book."
# echo

# jq -c '.[]' ./contracts/data/recipes_examples.json | while read recipe; do
#     recipeBookID="8911642744259564740891"
#     image=$(jq -r '.image' <<<${recipe})
#     category=$(jq -r '.category' <<<${recipe})
#     title=$(jq -r '.title' <<<${recipe})
#     description=$(jq -r '.description' <<<${recipe})
#     chefNote=$(jq -r '.chefNote' <<<${recipe})
#     ingredients=$(jq -r '.ingredients' <<<${recipe})
#     instructions=$(jq -r '.instructions' <<<${recipe})
#     image=$(jq -r '.image' <<<${recipe})
#     near call dev-1642744190654-63833165458970 createRecipe "{ \"title\": \"$title\", \"description\": \"$description\", \"ingridientsList\": $ingredients, \"instructions\": $instructions, \"recipeBookID\": \"$recipeBookID\", \"category\": \"$category\", \"chefNote\": \"$chefNote\", \"image\": $image }" --account-id jgmercedes.testnet
# done

# echo
# echo "Loading cook dapp recipe book."
# echo

# near call dev-1642744190654-63833165458970 createRecipeBook '{"title": "Cook DApp Selected"}' --account-id cook_dapp_recipes.testnet

# echo
# echo "Loading cook dapp recipes"
# echo

# jq -c '.[]' ./contracts/data/cook_dapp_recipes_examples.json | while read recipe; do
#     recipeBookID="8151642752258688404815"
#     image=$(jq -r '.image' <<<${recipe})
#     category=$(jq -r '.category' <<<${recipe})
#     title=$(jq -r '.title' <<<${recipe})
#     description=$(jq -r '.description' <<<${recipe})
#     chefNote=$(jq -r '.chefNote' <<<${recipe})
#     ingredients=$(jq -r '.ingredients' <<<${recipe})
#     instructions=$(jq -r '.instructions' <<<${recipe})
#     image=$(jq -r '.image' <<<${recipe})
#     near call dev-1642744190654-63833165458970 createRecipe "{ \"title\": \"$title\", \"description\": \"$description\", \"ingridientsList\": $ingredients, \"instructions\": $instructions, \"recipeBookID\": \"$recipeBookID\", \"category\": \"$category\", \"chefNote\": \"$chefNote\", \"image\": $image }" --account-id cook_dapp_recipes.testnet
# done
