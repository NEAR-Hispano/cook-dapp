import * as Contract from "../index"

const invalidID = "notAnID"

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
      Contract.createRecipeBook("");
    }).toThrow("Recipe book title to short.");
  })
})

describe('Create a recipe  ', () => {
  it('Requires an ID of a Recipe Book.', () => {
    expect(() => {
      Contract.createRecipe(invalidID, "Chicken breast", [], []);
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

