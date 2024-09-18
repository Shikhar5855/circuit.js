import { ModelDependancy, SubCurcuitDependancy } from './Dependancy';
export class Gate {
  value;
  name;
  wp;
  wn;
  l;
  m;
  type;
  constructor(val: any, name: any, type: any, wn: any = null, wp: any = null, l: any = null, m: any = null) {
    this.value = parseFloat(val);
    this.wn = wn;
    this.wp = wp;
    this.l = l;
    this.m = m;
    this.name = name;
    this.type = type;
  }
  getGateDetail() {
    // return this.name
    if (this.type == 'GA') {
      return 'and';
    } else if (this.type == 'GOR') {
      return 'or';
    } else if (this.type == 'GND') {
      return 'nand';
    } else if (this.type == 'GNR') {
      return 'nor';
    } else if (this.type == 'GXR') {
      return 'xor';
    } else if (this.type == 'N') {
      return 'not';
    }
    return null;
  }
  getNetlistValue(points: any, name: any) {
    ModelDependancy.VSS = true;
    ModelDependancy.VDD = true;
    const plength = points.length;
    const inp: any = [];
    let outP = '';
    points.forEach((p: any, i: any) => {
      if (i < plength - 1) {
        inp.push(p);
      } else {
        outP = p;
      }
    });
    const inpStr = `${inp.join(' ')}`;
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
    const subcir_name = `${this.getGateDetail()}${inp.length}`;
    SubCurcuitDependancy.setGate(subcir_name, true);
    ModelDependancy.PMOS = true;
    ModelDependancy.NMOS = true;
    return `X${this.name} ${outP} ${inpStr} ${ModelDependancy.VDD_NODE} ${ModelDependancy.VSS_NODE} ${subcir_name} ${modelProperty.join(' ')}`;
    //return `a${name} ${inpStr} ${outP} ${gateType}${name}\n.model ${gateType}${name} d_${gateType} (rise_delay = 0.5e-9 fall_delay = 0.3e-9 input_load = 0.5e-12)`
  }
}
