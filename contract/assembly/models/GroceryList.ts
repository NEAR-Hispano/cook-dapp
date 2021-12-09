import Ingridient from "./Ingridient";

@nearBindgen
class GroceryList {
  items: Array<Ingridient>;  

  constructor() {
    this.items = new Array();
  }

  private getItemIndex(itemID: string): i32 {
    let index = this.items.map((item) => item.id).indexOf(itemID);
    assert(index, "Item not found.");
    return index;
  }

  addItem(label: string, amount: string, unit: string, details: string): void {
    this.items.push(new Ingridient(label, amount, unit, details));
  }

  editItem(itemID: string, item: Ingridient): void {
    let index = this.getItemIndex(itemID);
    this.items[index] = item;
  }

  removeItem(itemID: string): void {
    let index = this.getItemIndex(itemID);
    this.items.splice(index, 1);
  }
}

export default GroceryList;
