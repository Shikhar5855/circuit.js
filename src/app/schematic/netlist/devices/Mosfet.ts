import { ModelDependancy } from './Dependancy';
export class Mosfet {
  value: any;
  name: any;
  w: any;
  l: any;
  m: any;
  type: any;
  constructor(val: any, name: any, type: any, w: any, l: any, m: any) {
    this.w = w;
    this.l = l;
    this.m = m;
    this.name = name;
    this.type = type;
  }
  getGateDetail() {
    if (this.type == 'NMOS') {
      ModelDependancy.NMOS = true;
      return ModelDependancy.NMOS_MODEL_NAME;
    } else if (this.type == 'PMOS') {
      ModelDependancy.PMOS = true;
      return ModelDependancy.PMOS_MODEL_NAME;
    }
    return null;
  }
  getNetlistValue(points: any, name: any) {
    const [p1, p2, p3, p4] = points;
    let D = p1,
      S = p2,
      G = p3,
      B = p4;
    if (ModelDependancy.PMOS) {
      D = p2;
      S = p1;
    }
    //const [D,S,G,B]=points;
    //const [S,D,G,B]=points;
    ModelDependancy.VSS = true;
    ModelDependancy.VDD = true;
    const modelProperty = [];
    if (this.w) {
      modelProperty.push('w=' + this.w);
    }
    if (this.l) {
      modelProperty.push('l=' + this.l);
    }
    if (this.m) {
      modelProperty.push('m=' + this.m);
    }
    if (points.length == 4) {
      return `m${name} ${D} ${G} ${S} ${S}  ${this.getGateDetail()} ${modelProperty.join(' ')}`;
    } else return `m${name} ${D} ${G} ${S} ${S} ${this.getGateDetail()} ${modelProperty.join(' ')}`;
    //return `a${name} ${inpStr} ${outP} ${gateType}${name}\n.model ${gateType}${name} d_${gateType} (rise_delay = 0.5e-9 fall_delay = 0.3e-9 input_load = 0.5e-12)`
  }
}
