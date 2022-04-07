echo
echo "Loading cook dapp recipes"
echo

jq -c '.[]' ./contracts/data/cook_dapp_recipes_examples.json | while read recipe; do
    recipeBookID="5651644624814757336565"
    image=$(jq -r '.image' <<<${recipe})
    category=$(jq -r '.category' <<<${recipe})
    title=$(jq -r '.title' <<<${recipe})
    description=$(jq -r '.description' <<<${recipe})
    chefNote=$(jq -r '.chefNote' <<<${recipe})
    ingredients=$(jq -r '.ingredients' <<<${recipe})
    instructions=$(jq -r '.instructions' <<<${recipe})
    image=$(jq -r '.image' <<<${recipe})
    near call dev-1644570273048-97159348263161 createRecipe "{ \"title\": \"$title\", \"description\": \"$description\", \"ingridientsList\": $ingredients, \"instructions\": $instructions, \"recipeBookID\": \"$recipeBookID\", \"category\": \"$category\", \"chefNote\": \"$chefNote\", \"image\": $image }" --account-id cook_dapp_recipes.testnet
done
