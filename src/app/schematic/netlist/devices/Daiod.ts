import { ModelDependancy } from './Dependancy';

export class Daiod {
  value;
  constructor(val: any) {
    this.value = parseFloat(val);
  }
  getNetlistValue([p1, p2]: any, name: any) {
    ModelDependancy.Daiod = true;
    //. model DIODE1 D ( bv =50 is =1 e -13 n =1.05)
    return `d${name} ${p1} ${p2} ${ModelDependancy.DAIOD_MODEL_NAME}`;
  }
}
