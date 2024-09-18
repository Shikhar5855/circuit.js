import { ModelDependancy } from './Dependancy';

export class Transistor {
  value: any;
  name;
  wp;
  wn;
  l;
  m;
  type;
  constructor(val: any, name: any, type: any, wn: any, wp: any, l: any, m: any) {
    this.wn = wn;
    this.wp = wp;
    this.l = l;
    this.m = m;
    this.name = name;
    this.type = type;
  }
  getGateDetail() {
    if (this.type == 'NPN') {
      ModelDependancy.NPN = true;
      return ModelDependancy.NPN_MODEL_NAME;
    } else if (this.type == 'PNP') {
      ModelDependancy.PNP = true;
      return ModelDependancy.PNP_MODEL_NAME;
    }
    return null;
  }
  getNetlistValue(points: any, name: any) {
    const [pb, pc, pe] = points;
    //.model QMOD3 NPN level=4

    const modelProperty = [];
    if (this.wp) {
      modelProperty.push('wp=' + this.wp);
    }
    if (this.wn) {
      modelProperty.push('wn=' + this.wn);
    }
    if (this.l) {
      modelProperty.push('l=' + this.l);
    }
    if (this.m) {
      modelProperty.push('m=' + this.m);
    }

    return `q${this.name} ${pc} ${pb} ${pe} ${this.getGateDetail()}`;
    //return `a${name} ${inpStr} ${outP} ${gateType}${name}\n.model ${gateType}${name} d_${gateType} (rise_delay = 0.5e-9 fall_delay = 0.3e-9 input_load = 0.5e-12)`
  }
}
