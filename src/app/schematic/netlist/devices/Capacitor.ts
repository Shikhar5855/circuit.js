export class Capcitor {
  value;
  constructor(val: any) {
    this.value = parseFloat(val);
  }
  getNetlistValue([p1, p2]: any, name: any) {
    return `c${name} ${p1} ${p2} ${this.value}`;
  }
}
