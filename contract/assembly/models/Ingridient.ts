import { getID } from "../utils";

@nearBindgen
class Ingridient {
  id: string;
  label: string;
  amount: i32;
  unit: string;
  details: string;

  constructor(label: string, amount: i32, unit: string, details: string) {
    this.id = getID();
    this.label = label;
    this.amount = amount;
    this.unit = unit;
    this.details = details;
  }

  setLabel(label: string): void {
    this.label = label;
  }
  setAmount(amount: u64): void {
    this.amount = amount;
  }
  setDetails(details: string): void {
    this.details = details;
  }
}

export default Ingridient;
