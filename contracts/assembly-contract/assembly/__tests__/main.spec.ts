import * as Contract from "../index"

const invalidID = "notAnID"
const invalidTitle = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
const invalidShortText = "This short"

describe('Get User  ', () => {
  it('should get a user.', () => {
    expect(() => {
      Contract.getUser();
    }).not.toThrow();
  })
})

describe('Create a recipe book  ', () => {
  it('Requires title lenght longer than 5.', () => {
    expect(() => {
      Contract.createRecipeBook(invalidTitle);
    }).not.toThrow("Recipe book title to short.");
  })
})

describe('Get a recipe book ', () => {
  it('Requires an ID of a Recipe Book.', () => {
    expect(() => {
      Contract.getRecipeBook("");
    }).toThrow("Recipe Book not found.");
  })
})

describe('Update a recipe Book  ', () => {
  it('Requires title lenght longer than 5.', () => {
    expect(() => {
      Contract.updateRecipeBook("E.G.","");
    }).toThrow("Recipe book title to short.");
  })
})

describe('Delete a recipe book  ', () => {
  it('Requires an ID of a Recipe Book.', () => {
    expect(() => {
      Contract.deleteRecipeBook(invalidID);
    }).toThrow("Recipe Book not found.");
  })
})

describe('Create a recipe  ', () => {
  it('Requires an ID of a Recipe Book.', () => {
    expect(() => {
      Contract.createRecipe(invalidID, "Chicken breast", [], [], "", "" , "");
    }).toThrow("Recipe Book not found.");
  })
})

describe('Get a recipe  ', () => {
  it('Requires an ID of a Recipe.', () => {
    expect(() => {
      Contract.getRecipe(invalidID);
    }).toThrow("Recipe not found.");
  })
})

describe('Deletes a recipe  ', () => {
  it('Requires an ID of a Recipe Book.', () => {
    expect(() => {
      Contract.deleteRecipe(invalidID);
    }).toThrow("Recipe not found.");
  })
})

describe('Update a Recipe  ', () => {
  it('Requires an ID of a Recipe and the components you are trying to update.', () => {
    expect(() => {
      Contract.updateRecipe("1639544172647018008-75053426", "comida china");
    }).toThrow("The caegory you are trying to choose do not exists");
  })
})

describe('Create a review  ', () => {
  it('Requieres the text review, a rating and the recipeID you are trying to review', () => {
    expect(() => {
      Contract.createReview("It looks very tasty", 3, invalidID);
    }).toThrow("The recipe you want to rate, is not found");
  })
})

describe('Deletes a review  ', () => {
  it('Requires an ID of the Review you are trying to delete.', () => {
    expect(() => {
      Contract.deleteReview("melenoidd.testnet-1639544172647018008-75053426");
    }).toThrow("The review you are trying to delete is not from your own");
  })
})

describe('Update a review  ', () => {
  it('Requires an ID and the components you are trying to update.', () => {
    expect(() => {
      Contract.updateReview("melenoidd.testnet-1639544172647018008-75053426", invalidShortText, 3);
    }).toThrow("Description too short, please add a longer review");
  })
})

describe('Tip a recipe ', () => {
  it('Requires and ID of a recipe', () => {
    expect(() => {
      Contract.tipRecipe(invalidID);
    }).toThrow("There is not recipe with such ID");
  })
})

describe('Add a recipe to your favorites list  ', () => {
  it('Requires an ID of a Recipe', () => {
    expect(() => {
      Contract.addFavoriteRecipe(invalidID);
    }).not.toThrow("There is not recipe with such ID");
  })
})

describe('Add a list of ingredients to the user ShoppingList  ', () => {
  it('Requires an ID of a Recipe', () => {
    expect(() => {
      Contract.addRecipeList(invalidID);
    }).toThrow("There is not recipe with such ID");
  })
})

