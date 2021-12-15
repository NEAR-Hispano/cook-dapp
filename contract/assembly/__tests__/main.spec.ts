import { ContractPromise } from "near-sdk-as";
import * as Contract from "../index"

const invalidID = "notAnID"
const invalidTitle = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "

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

