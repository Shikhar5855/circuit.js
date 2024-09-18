import { DEVICE_TYPE } from './CircuitConst';
import { ModelDependancy, SubCurcuitDependancy, and2, and3, or2, or3, nand2, nand3, nor2, nor3, not1 } from './devices';
import { xor2, xor3 } from './devices/subcir_def/gates';
export function circuitConnection(arr: any) {
  const list: any = [];
  arr.forEach((d: any, i: any) => {
    if (d.type == DEVICE_TYPE.VOLTAGE) {
      const [p1, p2] = d.points;
      list.push({ p1, p2, type: d.type, index: i, direction: 'S' });
    } else if (d.type == DEVICE_TYPE.CAPACITOR) {
      const [p1, p2] = d.points;
      list.push({ p1, p2, type: d.type, index: i, direction: 'bi' });
    } else if (d.type == DEVICE_TYPE.RESITOR) {
      const [p1, p2] = d.points;
      list.push({ p1, p2, type: d.type, index: i, direction: 'bi' });
    } else if (d.type == DEVICE_TYPE.INDUCTOR) {
      const [p1, p2] = d.points;
      list.push({ p1, p2, type: d.type, index: i, direction: 'bi' });
    } else if (d.type == DEVICE_TYPE.WIRE) {
      const [p1, p2] = d.points;
      list.push({ p1, p2, type: d.type, index: i, direction: 'bi' });
    } else if (d.type == DEVICE_TYPE.SWITCH) {
      const [p1, p2] = d.points;
      list.push({ p1, p2, type: d.type, index: i, direction: 'bi' });
    }
  });
  return list;
}

export class CircuitMapConnection {
  data;
  source;
  portNameObj;
  count = 1;

  setPointValue(point: any, val: any) {
    this.portNameObj[point.getPort()] = val;
  }
  setPortValue(port: any, val: any) {
    this.portNameObj[port] = val;
  }
  visitOnlyWire(p: any) {
    for (const key in this.data[p.getPort()]) {
      const { device, point } = this.data[p.getPort()][key];
      if (device.type == DEVICE_TYPE.WIRE) {
        const checkval = this.portNameObj[point.getPort()];
        if (checkval == -1) {
          const val = this.portNameObj[p.getPort()];
          this.setPointValue(point, val);
          this.visitOnlyWire(point);
        }
      }
    }
  }

  visitWireNode(p1: any, p2: any) {
    this.visitOnlyWire(p1);
    this.visitOnlyWire(p2);
  }
  visitNode(p: any) {
    for (const key in this.data[p.getPort()]) {
      const { device, point } = this.data[p.getPort()][key];
      if (device.type == DEVICE_TYPE.WIRE) {
        const checkval = this.portNameObj[point.getPort()];
        if (checkval == -1) {
          const val = this.portNameObj[p.getPort()];
          this.setPointValue(point, val);
          this.visitOnlyWire(point);
        }
      } else {
        const checkval = this.portNameObj[point.getPort()];
        const val = this.portNameObj[p.getPort()];
        if (checkval == -1) {
          this.setPointValue(point, this.count++);
          this.visitNode(point);
        }
      }
    }
  }
  constructor(data: any, portNameObj: any, source: any) {
    this.data = data;
    this.portNameObj = portNameObj;
    this.source = source;
    const { type, points } = source;
    const [p1, p2] = points;
    const val1 = this.portNameObj[p1.getPort()];
    const val2 = this.portNameObj[p2.getPort()];
    if (val2 != 0) {
      this.setPointValue(p2, 0);
      this.visitOnlyWire(p2);
    }
    if (val1 == -1) {
      this.setPointValue(p1, this.count++);
      this.visitOnlyWire(p1);
    }

    if (val1 == -1) {
      this.visitNode(p1);
      //this.visitNode(p2);
    }
  }
  getPortDetails() {
    return this.portNameObj;
  }
}

export function getNetlistCode(arr: any, pointObjData: any) {
  const deviceNameMap: any = {};
  let str = '';
  // console.log("arr==>",portMap,pointObjData);

  arr.forEach((d: any) => {
    if (d.deviceData) {
      if (!deviceNameMap[d.type]) {
        deviceNameMap[d.type] = 0;
      }
      deviceNameMap[d.type] = deviceNameMap[d.type] + 1;
      const ps = d.points.map((p: any) => {
        let port = '';
        if (pointObjData[p.getPort()].name == '0') {
          port = '0';
        } else if (pointObjData[p.getPort()].name) {
          port = pointObjData[p.getPort()].name;
        } else {
          port = 'NA';
        }
        return port;
      });
      str = str + d.deviceData.getNetlistValue(ps, d.id || deviceNameMap[d.type]) + '\n';
      // console.log(str)
      //str=str+d.deviceData.ge
    }
  });
  return str;
}
export function getSubCirData() {
  let str = '';
  if (SubCurcuitDependancy.and2) {
    str += '\n' + and2();
  }
  if (SubCurcuitDependancy.and3) {
    str += '\n' + and3();
  }
  if (SubCurcuitDependancy.or2) {
    str += '\n' + or2();
  }
  if (SubCurcuitDependancy.or3) {
    str += '\n' + or3();
  }
  if (SubCurcuitDependancy.nand2) {
    str += '\n' + nand2();
  }
  if (SubCurcuitDependancy.nand3) {
    str += '\n' + nand3();
  }
  if (SubCurcuitDependancy.nor2) {
    str += '\n' + nor2();
  }
  if (SubCurcuitDependancy.nor3) {
    str += '\n' + nor3();
  }
  if (SubCurcuitDependancy.notG) {
    str += '\n' + not1();
  }
  if (SubCurcuitDependancy.xor2) {
    str += '\n' + xor2();
  }
  if (SubCurcuitDependancy.xor3) {
    str += '\n' + xor3();
  }
  return str;
}

export function getModelData() {
  let str = '';
  if (ModelDependancy.NMOS) {
    str += '\n.model ' + ModelDependancy.NMOS_MODEL_NAME + ' NMOS LEVEL=6 ';
  }
  if (ModelDependancy.PMOS) {
    str += '\n.model ' + ModelDependancy.PMOS_MODEL_NAME + ' PMOS LEVEL=6 ';
  }
  if (ModelDependancy.NPN) {
    str += '\n.model ' + ModelDependancy.NPN_MODEL_NAME + ' NPN LEVEL=6 ';
  }
  if (ModelDependancy.PNP) {
    str += '\n.model ' + ModelDependancy.PNP_MODEL_NAME + ' PNP LEVEL=6 ';
  }
  if (ModelDependancy.Daiod) {
    str += '\n.model ' + ModelDependancy.DAIOD_MODEL_NAME + ' D ( bv =50 is =1 e -13 n =1.05)';
  }

  return str;
}
// module.exports={
//     circuitConnection,
//     CircuitMapConnection,
//     getNetlistCode,
//     getSubCirData,
//     getModelData
// }
