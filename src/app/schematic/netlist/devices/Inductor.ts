export class Inductor {
  value;
  constructor(val: any) {
    this.value = parseFloat(val);
  }
  getNetlistValue([p1, p2]: any, name: any) {
    return `l${name} ${p1} ${p2} ${this.value}`;
  }
}
