@nearBindgen
class Ingridient {
  label: string;
  amount: i32;
  unit: string;
  details: string;

  constructor(label: string, amount: i32, unit: string, details: string) {
    this.label = label;
    this.amount = amount;
    this.unit = unit;
    this.details = details;
  }
}

export default Ingridient;
